"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const utils_1 = require("../utils");
const tooltip_view_1 = require("./tooltip-view");
const element_listener_1 = require("./element-listener");
class EditorControl {
    constructor(editor) {
        this.editor = editor;
        this.updateResults = this.updateResults.bind(this);
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(this.emitter = new atom_1.Emitter());
        const editorElement = atom.views.getView(this.editor);
        if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
            this.gutter = this.editor.gutterWithName('ide-haskell-check-results');
            if (!this.gutter) {
                this.gutter = this.editor.addGutter({
                    name: 'ide-haskell-check-results',
                    priority: 10
                });
            }
            const gutterElement = atom.views.getView(this.gutter);
            this.disposables.add(element_listener_1.listen(gutterElement.querySelector('.decoration'), 'mouseenter', (e) => {
                const bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
                if (bufferPt) {
                    this.lastMouseBufferPt = bufferPt;
                    return this.showCheckResult(bufferPt, true);
                }
            }));
            this.disposables.add(element_listener_1.listen(gutterElement.querySelector('.decoration'), 'mouseleave', (e) => this.hideTooltip()));
        }
        const buffer = this.editor.getBuffer();
        this.disposables.add(buffer.onWillSave(() => {
            this.emitter.emit('will-save-buffer', buffer);
            if (atom.config.get('ide-haskell.onSavePrettify')) {
                return atom.commands.dispatch(editorElement, 'ide-haskell:prettify-file');
            }
        }));
        this.disposables.add(buffer.onDidSave(() => this.emitter.emit('did-save-buffer', buffer)));
        this.disposables.add(this.editor.onDidStopChanging(() => this.emitter.emit('did-stop-changing', this.editor)));
        this.disposables.add(editorElement.onDidChangeScrollLeft(() => this.hideTooltip({ eventType: 'mouse' })));
        this.disposables.add(editorElement.onDidChangeScrollTop(() => this.hideTooltip({ eventType: 'mouse' })));
        this.disposables.add(element_listener_1.listen(editorElement.querySelector('.scroll-view'), 'mousemove', (e) => {
            const bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
            if (!bufferPt) {
                return;
            }
            if (this.lastMouseBufferPt && this.lastMouseBufferPt.isEqual(bufferPt)) {
                return;
            }
            this.lastMouseBufferPt = bufferPt;
            if (this.exprTypeTimeout) {
                clearTimeout(this.exprTypeTimeout);
            }
            this.exprTypeTimeout = setTimeout(() => bufferPt && this.shouldShowTooltip(bufferPt), atom.config.get('ide-haskell.expressionTypeInterval'));
        }));
        this.disposables.add(element_listener_1.listen(editorElement.querySelector('.scroll-view'), 'mouseout', (e) => {
            if (this.exprTypeTimeout) {
                return clearTimeout(this.exprTypeTimeout);
            }
        }));
        this.disposables.add(this.editor.onDidChangeSelectionRange(({ newBufferRange }) => {
            const tooltipElement = document.querySelector('ide-haskell-tooltip');
            if (tooltipElement) {
                const slcl = editorElement.pixelRectForScreenRange(this.editor.screenRangeForBufferRange(newBufferRange));
                const eecl = editorElement.querySelector('.scroll-view').getBoundingClientRect();
                const ttcl = tooltipElement.getBoundingClientRect();
                const ttcld = tooltipElement.querySelector('div').getBoundingClientRect();
                const ttbox = {
                    left: ttcl.left - eecl.left,
                    top: ttcld.top - eecl.top,
                    width: ttcl.width,
                    height: ttcld.height
                };
                const xmax = Math.round(Math.max(ttbox.left, slcl.left));
                const xmin = Math.round(Math.min(ttbox.left + ttbox.width, slcl.left +
                    slcl.width));
                const ymax = Math.round(Math.max(ttbox.top, slcl.top));
                const ymin = Math.round(Math.min(ttbox.top + ttbox.height, slcl.top +
                    slcl.height));
                const tt = document.querySelector('ide-haskell-tooltip');
                if (tt) {
                    if ((ymax <= ymin) && (xmax <= xmin)) {
                        tt.style.setProperty('opacity', '0.3');
                    }
                    else {
                        tt.style.removeProperty('opacity');
                    }
                }
            }
            if (this.selTimeout) {
                clearTimeout(this.selTimeout);
            }
            if (newBufferRange.isEmpty()) {
                this.hideTooltip({
                    eventType: 'selection'
                });
                switch (atom.config.get('ide-haskell.onCursorMove')) {
                    case 'Show Tooltip':
                        if (this.exprTypeTimeout) {
                            clearTimeout(this.exprTypeTimeout);
                        }
                        if (!this.showCheckResult(newBufferRange.start, false, 'keyboard')) {
                            return this.hideTooltip({
                                persistOnCursorMove: false
                            });
                        }
                        break;
                    case 'Hide Tooltip':
                        if (this.exprTypeTimeout) {
                            clearTimeout(this.exprTypeTimeout);
                        }
                        return this.hideTooltip({
                            persistOnCursorMove: false
                        });
                    default:
                }
            }
            else {
                this.selTimeout = setTimeout(() => this.shouldShowTooltip(newBufferRange.start, 'selection'), atom.config.get('ide-haskell.expressionTypeInterval'));
            }
        }));
    }
    deactivate() {
        if (this.exprTypeTimeout) {
            clearTimeout(this.exprTypeTimeout);
        }
        if (this.selTimeout) {
            clearTimeout(this.selTimeout);
        }
        this.hideTooltip();
        this.disposables.dispose();
        this.lastMouseBufferPt = undefined;
    }
    updateResults(res, types) {
        if (types) {
            for (const t of Array.from(types)) {
                for (const m of Array.from(this.editor.findMarkers({
                    type: 'check-result',
                    severity: t,
                    editor: this.editor.id
                }))) {
                    m.destroy();
                }
            }
        }
        else {
            for (const m of Array.from(this.editor.findMarkers({
                type: 'check-result',
                editor: this.editor.id
            }))) {
                m.destroy();
            }
        }
        return Array.from(res).map((r) => this.markerFromCheckResult(r));
    }
    markerFromCheckResult(resItem) {
        const { uri, severity, message, position } = resItem;
        if ((!uri) || (uri !== this.editor.getPath())) {
            return;
        }
        if (!position) {
            return;
        }
        const range = new atom_1.Range(position, atom_1.Point.fromObject({
            row: position.row,
            column: position.column + 1
        }));
        const marker = this.editor.markBufferRange(range, {
            invalidate: 'touch'
        });
        marker.setProperties({
            type: 'check-result',
            severity,
            desc: message,
            editor: this.editor.id
        });
        const disp = new atom_1.CompositeDisposable();
        disp.add(marker.onDidChange(({ isValid }) => {
            if (!isValid) {
                resItem.destroy();
                return marker.destroy();
            }
        }));
        disp.add(marker.onDidDestroy(() => disp.dispose()));
        return this.decorateMarker(marker);
    }
    decorateMarker(m) {
        if (!this.gutter) {
            return;
        }
        const cls = `ide-haskell-${m.getProperties().severity}`;
        this.gutter.decorateMarker(m, {
            type: 'line-number',
            class: cls
        });
        this.editor.decorateMarker(m, {
            type: 'highlight',
            class: cls
        });
        return this.editor.decorateMarker(m, {
            type: 'line',
            class: cls
        });
    }
    onShouldShowTooltip(callback) {
        return this.emitter.on('should-show-tooltip', callback);
    }
    onWillSaveBuffer(callback) {
        return this.emitter.on('will-save-buffer', callback);
    }
    onDidSaveBuffer(callback) {
        return this.emitter.on('did-save-buffer', callback);
    }
    onDidStopChanging(callback) {
        return this.emitter.on('did-stop-changing', callback);
    }
    shouldShowTooltip(pos, eventType) {
        if (!eventType) {
            eventType = 'mouse';
        }
        if (this.showCheckResult(pos, false, eventType)) {
            return;
        }
        if ((pos.row < 0) ||
            (pos.row >= this.editor.getLineCount()) ||
            pos.isEqual(this.editor.bufferRangeForBufferRow(pos.row).end)) {
            return this.hideTooltip({ eventType });
        }
        else if (this.rangeHasChanged(pos, eventType)) {
            return this.emitter.emit('should-show-tooltip', {
                editor: this.editor,
                pos,
                eventType
            });
        }
    }
    rangeHasChanged(pos, eventType) {
        const newrange = this.getEventRange(pos, eventType).crange;
        const isFirstIteration = !(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest);
        const isSameToken = () => {
            if (!(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest)) {
                return false;
            }
            const rangesAreEmpty = this.lastMouseBufferRangeTest.isEmpty() && newrange.isEmpty();
            const isSameRow = this.lastMouseBufferPtTest.row === pos.row;
            if (!rangesAreEmpty || !isSameRow) {
                return false;
            }
            const tl = this.editor.tokenizedBuffer.tokenizedLineForRow(this.lastMouseBufferPtTest.row);
            const oldtokid = tl.tokenIndexAtBufferColumn(this.lastMouseBufferPtTest
                .column);
            const newtokid = tl.tokenIndexAtBufferColumn(pos.column);
            return oldtokid === newtokid;
        };
        const result = isFirstIteration || !(this.lastMouseBufferRangeTest.isEqual(newrange) || isSameToken());
        this.lastMouseBufferPtTest = pos;
        this.lastMouseBufferRangeTest = newrange;
        return result;
    }
    showTooltip(pos, range, text, detail) {
        if (!this.editor) {
            return;
        }
        if (!detail.eventType) {
            throw new Error('eventType not set');
        }
        if (this.tooltipHighlightRange && range.isEqual(this.tooltipHighlightRange)) {
            return;
        }
        this.hideTooltip();
        if (detail.eventType === 'mouse') {
            if (this.lastMouseBufferPt && !range.containsPoint(this.lastMouseBufferPt)) {
                return;
            }
        }
        if (detail.eventType === 'selection') {
            const lastSel = this.editor.getLastSelection();
            if (!range.containsRange(lastSel.getBufferRange()) || !!lastSel.isEmpty()) {
                return;
            }
        }
        this.tooltipHighlightRange = range;
        const props = Object.assign({}, detail, { type: 'tooltip' });
        const highlightMarker = this.editor.markBufferRange(range);
        highlightMarker.setProperties(props);
        this.editor.decorateMarker(highlightMarker, {
            type: 'overlay',
            position: 'tail',
            item: new tooltip_view_1.TooltipMessage(text)
        });
        return this.editor.decorateMarker(highlightMarker, {
            type: 'highlight',
            class: 'ide-haskell-type'
        });
    }
    hideTooltip(template) {
        if (!template) {
            template = {};
        }
        this.tooltipHighlightRange = undefined;
        template.type = 'tooltip';
        this.editor.findMarkers(template).forEach((m) => m.destroy());
    }
    getEventRange(pos, eventType) {
        let crange;
        switch (eventType) {
            case 'mouse':
            case 'context':
                if (!pos) {
                    pos = this.lastMouseBufferPt;
                }
                const [selRange] = Array.from(this.editor.getSelections()
                    .map((sel) => sel.getBufferRange()).filter((sel) => sel.containsPoint(pos)));
                crange = selRange || new atom_1.Range(pos, pos);
                break;
            case 'keyboard':
            case 'selection':
                crange = this.editor.getLastSelection().getBufferRange();
                pos = crange.start;
                break;
            default:
                throw new Error(`unknown event type ${eventType}`);
        }
        const ppos = pos;
        return {
            crange, pos: ppos, eventType
        };
    }
    findCheckResultMarkers(pos, gutter, eventType) {
        if (gutter) {
            return this.editor.findMarkers({
                type: 'check-result',
                startBufferRow: pos.row,
                editor: this.editor.id
            });
        }
        else {
            switch (eventType) {
                case 'keyboard':
                    return this.editor.findMarkers({
                        type: 'check-result',
                        editor: this.editor.id,
                        containsRange: new atom_1.Range(pos, pos.translate([0, 1]))
                    });
                case 'mouse':
                    return this.editor.findMarkers({
                        type: 'check-result',
                        editor: this.editor.id,
                        containsPoint: pos
                    });
                default:
                    return [];
            }
        }
    }
    showCheckResult(pos, gutter, eventType) {
        if (!eventType) {
            eventType = 'mouse';
        }
        const markers = this.findCheckResultMarkers(pos, gutter, eventType);
        const [marker] = Array.from(markers);
        if (!marker) {
            this.hideTooltip({
                subtype: 'check-result'
            });
            return false;
        }
        const text = markers.map((m) => m.getProperties().desc);
        if (gutter) {
            this.showTooltip(pos, new atom_1.Range(pos, pos), text, {
                eventType, subtype: 'check-result'
            });
        }
        else {
            this.showTooltip(pos, marker.getBufferRange(), text, {
                eventType, subtype: 'check-result'
            });
        }
        return true;
    }
    hasTooltips(template) {
        if (!template) {
            template = {};
        }
        return !!this.editor.findMarkers(Object.assign({ type: 'tooltip' }, template)).length;
    }
}
exports.EditorControl = EditorControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWRpdG9yLWNvbnRyb2wvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFFYTtBQUViLG9DQUVpQjtBQU9qQixpREFBNkM7QUFFN0MseURBQXlDO0FBS3pDO0lBVUUsWUFBcUIsTUFBbUI7UUFBbkIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQyxDQUFBO1FBRWxELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ3JFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ2xDLElBQUksRUFBRSwyQkFBMkI7b0JBQ2pDLFFBQVEsRUFBRSxFQUFFO2lCQUNiLENBQUMsQ0FBQTtZQUNKLENBQUM7WUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMs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dXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJhbmdlLCBFbWl0dGVyLCBUZXh0RWRpdG9yLCBQb2ludCwgQ29tcG9zaXRlRGlzcG9zYWJsZSwgR3V0dGVyLCBEaXNwbGF5TWFya2VyLCBUZXh0QnVmZmVyXG59IGZyb20gJ2F0b20nXG5cbmltcG9ydCB7XG4gIGJ1ZmZlclBvc2l0aW9uRnJvbU1vdXNlRXZlbnRcbn0gZnJvbSAnLi4vdXRpbHMnXG5cbmludGVyZmFjZSBJVGV4dEVkaXRvciBleHRlbmRzIFRleHRFZGl0b3Ige1xuICBpZD86IG51bWJlclxufVxuXG5pbXBvcnQge1Jlc3VsdEl0ZW0sIFRTZXZlcml0eX0gZnJvbSAnLi4vcmVzdWx0cy1kYidcbmltcG9ydCB7VG9vbHRpcE1lc3NhZ2V9IGZyb20gJy4vdG9vbHRpcC12aWV3J1xuaW1wb3J0IHtUTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQge2xpc3Rlbn0gZnJvbSAnLi9lbGVtZW50LWxpc3RlbmVyJ1xuXG5leHBvcnQgdHlwZSBURXZlbnRSYW5nZVR5cGUgPSAna2V5Ym9hcmQnIHwgJ2NvbnRleHQnIHwgJ21vdXNlJyB8ICdzZWxlY3Rpb24nXG5leHBvcnQgdHlwZSBUVGV4dEJ1ZmZlckNhbGxiYWNrID0gKGJ1ZmZlcjogVGV4dEJ1ZmZlcikgPT4gdm9pZFxuXG5leHBvcnQgY2xhc3MgRWRpdG9yQ29udHJvbCB7XG4gIHB1YmxpYyBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSAvLyBUT0RPIHNob3VsZCBiZSBwcml2YXRlLi4uXG4gIHByaXZhdGUgZW1pdHRlcjogRW1pdHRlclxuICBwcml2YXRlIGd1dHRlcjogR3V0dGVyXG4gIHByaXZhdGUgbGFzdE1vdXNlQnVmZmVyUHQ/OiBQb2ludFxuICBwcml2YXRlIGV4cHJUeXBlVGltZW91dD86IG51bWJlclxuICBwcml2YXRlIHNlbFRpbWVvdXQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBsYXN0TW91c2VCdWZmZXJQdFRlc3Q/OiBQb2ludFxuICBwcml2YXRlIGxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdD86IFJhbmdlXG4gIHByaXZhdGUgdG9vbHRpcEhpZ2hsaWdodFJhbmdlPzogUmFuZ2VcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgZWRpdG9yOiBJVGV4dEVkaXRvcikge1xuICAgIHRoaXMudXBkYXRlUmVzdWx0cyA9IHRoaXMudXBkYXRlUmVzdWx0cy5iaW5kKHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpKVxuXG4gICAgY29uc3QgZWRpdG9yRWxlbWVudCA9IGF0b20udmlld3MuZ2V0Vmlldyh0aGlzLmVkaXRvcilcblxuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm1lc3NhZ2VEaXNwbGF5RnJvbnRlbmQnKSA9PT0gJ2J1aWx0aW4nKSB7XG4gICAgICB0aGlzLmd1dHRlciA9IHRoaXMuZWRpdG9yLmd1dHRlcldpdGhOYW1lKCdpZGUtaGFza2VsbC1jaGVjay1yZXN1bHRzJylcbiAgICAgIGlmICghdGhpcy5ndXR0ZXIpIHtcbiAgICAgICAgdGhpcy5ndXR0ZXIgPSB0aGlzLmVkaXRvci5hZGRHdXR0ZXIoe1xuICAgICAgICAgIG5hbWU6ICdpZGUtaGFza2VsbC1jaGVjay1yZXN1bHRzJyxcbiAgICAgICAgICBwcmlvcml0eTogMTBcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ3V0dGVyRWxlbWVudCA9IGF0b20udmlld3MuZ2V0Vmlldyh0aGlzLmd1dHRlcilcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgICAgZ3V0dGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVjb3JhdGlvbicpLCAnbW91c2VlbnRlcicsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmZmVyUHQgPSBidWZmZXJQb3NpdGlvbkZyb21Nb3VzZUV2ZW50KHRoaXMuZWRpdG9yLCBlIGFzIE1vdXNlRXZlbnQpXG4gICAgICAgICAgaWYgKGJ1ZmZlclB0KSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ID0gYnVmZmVyUHRcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dDaGVja1Jlc3VsdChidWZmZXJQdCwgdHJ1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICkpXG4gICAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChsaXN0ZW4oXG4gICAgICAgIGd1dHRlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRlY29yYXRpb24nKSwgJ21vdXNlbGVhdmUnLCAoZSkgPT4gdGhpcy5oaWRlVG9vbHRpcCgpXG4gICAgICApKVxuICAgIH1cblxuICAgIC8vIGJ1ZmZlciBldmVudHMgZm9yIGF1dG9tYXRpYyBjaGVja1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoYnVmZmVyLm9uV2lsbFNhdmUoKCkgPT4ge1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3dpbGwtc2F2ZS1idWZmZXInLCBidWZmZXIpXG4gICAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeScpKSB7XG4gICAgICAgIHJldHVybiBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKGVkaXRvckVsZW1lbnQsICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJylcbiAgICAgIH1cbiAgICB9KSlcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGJ1ZmZlci5vbkRpZFNhdmUoKCkgPT4gdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1zYXZlLWJ1ZmZlcicsIGJ1ZmZlcikpKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lZGl0b3Iub25EaWRTdG9wQ2hhbmdpbmcoKCkgPT4gdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1zdG9wLWNoYW5naW5nJywgdGhpcy5lZGl0b3IpKSlcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGVkaXRvckVsZW1lbnQub25EaWRDaGFuZ2VTY3JvbGxMZWZ0KCgpID0+IHRoaXMuaGlkZVRvb2x0aXAoe2V2ZW50VHlwZTogJ21vdXNlJ30pKSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChlZGl0b3JFbGVtZW50Lm9uRGlkQ2hhbmdlU2Nyb2xsVG9wKCgpID0+IHRoaXMuaGlkZVRvb2x0aXAoe2V2ZW50VHlwZTogJ21vdXNlJ30pKSlcblxuICAgIC8vIHNob3cgZXhwcmVzc2lvbiB0eXBlIGlmIG1vdXNlIHN0b3BwZWQgc29tZXdoZXJlXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQobGlzdGVuKFxuICAgICAgZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLXZpZXcnKSwgJ21vdXNlbW92ZScsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICBjb25zdCBidWZmZXJQdCA9IGJ1ZmZlclBvc2l0aW9uRnJvbU1vdXNlRXZlbnQodGhpcy5lZGl0b3IsIGUgYXMgTW91c2VFdmVudClcblxuICAgICAgICBpZiAoIWJ1ZmZlclB0KSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXN0TW91c2VCdWZmZXJQdCAmJiB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0LmlzRXF1YWwoYnVmZmVyUHQpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0TW91c2VCdWZmZXJQdCA9IGJ1ZmZlclB0XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwclR5cGVUaW1lb3V0KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXhwclR5cGVUaW1lb3V0ID0gc2V0VGltZW91dChcbiAgICAgICAgICAoKSA9PiBidWZmZXJQdCAmJiB0aGlzLnNob3VsZFNob3dUb29sdGlwKGJ1ZmZlclB0KSxcbiAgICAgICAgICBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLmV4cHJlc3Npb25UeXBlSW50ZXJ2YWwnKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChsaXN0ZW4oXG4gICAgICBlZGl0b3JFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtdmlldycpLCAnbW91c2VvdXQnLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0KSB7XG4gICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVkaXRvci5vbkRpZENoYW5nZVNlbGVjdGlvblJhbmdlKCh7bmV3QnVmZmVyUmFuZ2V9OiB7bmV3QnVmZmVyUmFuZ2U6IFJhbmdlfSkgPT4ge1xuICAgICAgY29uc3QgdG9vbHRpcEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZGUtaGFza2VsbC10b29sdGlwJylcbiAgICAgIGlmICh0b29sdGlwRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzbGNsID0gZWRpdG9yRWxlbWVudC5waXhlbFJlY3RGb3JTY3JlZW5SYW5nZSh0aGlzLmVkaXRvci5zY3JlZW5SYW5nZUZvckJ1ZmZlclJhbmdlKG5ld0J1ZmZlclJhbmdlKSlcbiAgICAgICAgY29uc3QgZWVjbCA9IGVkaXRvckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC12aWV3JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgdHRjbCA9IHRvb2x0aXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHR0Y2xkID0gdG9vbHRpcEVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JykhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHR0Ym94ID0ge1xuICAgICAgICAgIGxlZnQ6IHR0Y2wubGVmdCAtIGVlY2wubGVmdCxcbiAgICAgICAgICB0b3A6IHR0Y2xkLnRvcCAtIGVlY2wudG9wLFxuICAgICAgICAgIHdpZHRoOiB0dGNsLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdHRjbGQuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeG1heCA9IE1hdGgucm91bmQoTWF0aC5tYXgodHRib3gubGVmdCwgc2xjbC5sZWZ0KSlcbiAgICAgICAgY29uc3QgeG1pbiA9IE1hdGgucm91bmQoTWF0aC5taW4odHRib3gubGVmdCArIHR0Ym94LndpZHRoLCBzbGNsLmxlZnQgK1xuICAgICAgICAgIHNsY2wud2lkdGgpKVxuICAgICAgICBjb25zdCB5bWF4ID0gTWF0aC5yb3VuZChNYXRoLm1heCh0dGJveC50b3AsIHNsY2wudG9wKSlcbiAgICAgICAgY29uc3QgeW1pbiA9IE1hdGgucm91bmQoTWF0aC5taW4odHRib3gudG9wICsgdHRib3guaGVpZ2h0LCBzbGNsLnRvcCArXG4gICAgICAgICAgc2xjbC5oZWlnaHQpKVxuICAgICAgICBjb25zdCB0dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lkZS1oYXNrZWxsLXRvb2x0aXAnKSBhcyBIVE1MRWxlbWVudFxuICAgICAgICBpZiAodHQpIHtcbiAgICAgICAgICBpZiAoKHltYXggPD0geW1pbikgJiYgKHhtYXggPD0geG1pbikpIHtcbiAgICAgICAgICAgIHR0LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAnb3BhY2l0eScsICcwLjMnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0dC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ29wYWNpdHknKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zZWxUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlbFRpbWVvdXQpXG4gICAgICB9XG4gICAgICBpZiAobmV3QnVmZmVyUmFuZ2UuaXNFbXB0eSgpKSB7XG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICAgIGV2ZW50VHlwZTogJ3NlbGVjdGlvbidcbiAgICAgICAgfSlcbiAgICAgICAgc3dpdGNoIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uQ3Vyc29yTW92ZScpKSB7XG4gICAgICAgICAgY2FzZSAnU2hvdyBUb29sdGlwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cHJUeXBlVGltZW91dCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2hvd0NoZWNrUmVzdWx0KG5ld0J1ZmZlclJhbmdlLnN0YXJ0LCBmYWxzZSwgJ2tleWJvYXJkJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICAgICAgICAgIHBlcnNpc3RPbkN1cnNvck1vdmU6IGZhbHNlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ0hpZGUgVG9vbHRpcCc6XG4gICAgICAgICAgICBpZiAodGhpcy5leHByVHlwZVRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwclR5cGVUaW1lb3V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICAgICAgICBwZXJzaXN0T25DdXJzb3JNb3ZlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBkZWZhdWx0OiAvLyBpbXBvc3NpYmxlLCBidXQgdHNsaW50IGNvbXBsYWluc1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbFRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICgpID0+IHRoaXMuc2hvdWxkU2hvd1Rvb2x0aXAobmV3QnVmZmVyUmFuZ2Uuc3RhcnQsICdzZWxlY3Rpb24nKSxcbiAgICAgICAgICBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLmV4cHJlc3Npb25UeXBlSW50ZXJ2YWwnKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSkpXG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgfVxuICAgIGlmICh0aGlzLnNlbFRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlbFRpbWVvdXQpXG4gICAgfVxuICAgIHRoaXMuaGlkZVRvb2x0aXAoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgdGhpcy5sYXN0TW91c2VCdWZmZXJQdCA9IHVuZGVmaW5lZFxuICB9XG5cbiAgcHVibGljIHVwZGF0ZVJlc3VsdHMgKHJlczogUmVzdWx0SXRlbVtdLCB0eXBlcz86IFRTZXZlcml0eVtdKSB7XG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHQgb2YgQXJyYXkuZnJvbSh0eXBlcykpIHtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIEFycmF5LmZyb20odGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICAgIHNldmVyaXR5OiB0LFxuICAgICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IuaWRcbiAgICAgICAgfSkpKSB7XG4gICAgICAgICAgbS5kZXN0cm95KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IG0gb2YgQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5maW5kTWFya2Vycyh7XG4gICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkXG4gICAgICB9KSkpIHtcbiAgICAgICAgbS5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocmVzKS5tYXAoKHIpID0+IHRoaXMubWFya2VyRnJvbUNoZWNrUmVzdWx0KHIpKVxuICB9XG5cbiAgbWFya2VyRnJvbUNoZWNrUmVzdWx0IChyZXNJdGVtOiBSZXN1bHRJdGVtKSB7XG4gICAgY29uc3Qge3VyaSwgc2V2ZXJpdHksIG1lc3NhZ2UsIHBvc2l0aW9ufSA9IHJlc0l0ZW1cbiAgICBpZiAoKCF1cmkpIHx8ICh1cmkgIT09IHRoaXMuZWRpdG9yLmdldFBhdGgoKSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIXBvc2l0aW9uKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSBuZXcgbWFya2VyXG4gICAgY29uc3QgcmFuZ2UgPSBuZXcgUmFuZ2UocG9zaXRpb24sIFBvaW50LmZyb21PYmplY3Qoe1xuICAgICAgcm93OiBwb3NpdGlvbi5yb3csXG4gICAgICBjb2x1bW46IHBvc2l0aW9uLmNvbHVtbiArIDFcbiAgICB9KSlcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLmVkaXRvci5tYXJrQnVmZmVyUmFuZ2UocmFuZ2UsIHtcbiAgICAgIGludmFsaWRhdGU6ICd0b3VjaCdcbiAgICB9KVxuICAgIG1hcmtlci5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgc2V2ZXJpdHksXG4gICAgICBkZXNjOiBtZXNzYWdlLFxuICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZFxuICAgIH0pXG4gICAgY29uc3QgZGlzcCA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICBkaXNwLmFkZChtYXJrZXIub25EaWRDaGFuZ2UoKHtpc1ZhbGlkfTogRGlzcGxheU1hcmtlcikgPT4ge1xuICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgIHJlc0l0ZW0uZGVzdHJveSgpXG4gICAgICAgIHJldHVybiBtYXJrZXIuZGVzdHJveSgpXG4gICAgICB9XG4gICAgfSkpXG4gICAgZGlzcC5hZGQobWFya2VyLm9uRGlkRGVzdHJveSgoKSA9PiBkaXNwLmRpc3Bvc2UoKSkpXG5cbiAgICByZXR1cm4gdGhpcy5kZWNvcmF0ZU1hcmtlcihtYXJrZXIpXG4gIH1cblxuICBkZWNvcmF0ZU1hcmtlciAobTogRGlzcGxheU1hcmtlcikge1xuICAgIGlmICghdGhpcy5ndXR0ZXIpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBjbHMgPSBgaWRlLWhhc2tlbGwtJHsobS5nZXRQcm9wZXJ0aWVzKCkgYXMgYW55KS5zZXZlcml0eX1gXG4gICAgdGhpcy5ndXR0ZXIuZGVjb3JhdGVNYXJrZXIobSwge1xuICAgICAgdHlwZTogJ2xpbmUtbnVtYmVyJyxcbiAgICAgIGNsYXNzOiBjbHNcbiAgICB9KVxuICAgIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKG0sIHtcbiAgICAgIHR5cGU6ICdoaWdobGlnaHQnLFxuICAgICAgY2xhc3M6IGNsc1xuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKG0sIHtcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIGNsYXNzOiBjbHNcbiAgICB9KVxuICB9XG5cbiAgb25TaG91bGRTaG93VG9vbHRpcCAoY2FsbGJhY2s6IChhcmdzOiB7ZWRpdG9yOiBUZXh0RWRpdG9yLCBwb3M6IFBvaW50LCBldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZX0pID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdzaG91bGQtc2hvdy10b29sdGlwJywgY2FsbGJhY2spXG4gIH1cblxuICBvbldpbGxTYXZlQnVmZmVyIChjYWxsYmFjazogVFRleHRCdWZmZXJDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ3dpbGwtc2F2ZS1idWZmZXInLCBjYWxsYmFjaylcbiAgfVxuXG4gIG9uRGlkU2F2ZUJ1ZmZlciAoY2FsbGJhY2s6IFRUZXh0QnVmZmVyQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtc2F2ZS1idWZmZXInLCBjYWxsYmFjaylcbiAgfVxuXG4gIG9uRGlkU3RvcENoYW5naW5nIChjYWxsYmFjazogKGVkaXRvcjogVGV4dEVkaXRvcikgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1zdG9wLWNoYW5naW5nJywgY2FsbGJhY2spXG4gIH1cblxuICBzaG91bGRTaG93VG9vbHRpcCAocG9zOiBQb2ludCwgZXZlbnRUeXBlPzogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgIGV2ZW50VHlwZSA9ICdtb3VzZSdcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvd0NoZWNrUmVzdWx0KHBvcywgZmFsc2UsIGV2ZW50VHlwZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICgocG9zLnJvdyA8IDApIHx8XG4gICAgICAocG9zLnJvdyA+PSB0aGlzLmVkaXRvci5nZXRMaW5lQ291bnQoKSkgfHxcbiAgICAgIHBvcy5pc0VxdWFsKHRoaXMuZWRpdG9yLmJ1ZmZlclJhbmdlRm9yQnVmZmVyUm93KHBvcy5yb3cpLmVuZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpZGVUb29sdGlwKHtldmVudFR5cGV9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5yYW5nZUhhc0NoYW5nZWQocG9zLCBldmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbWl0dGVyLmVtaXQoJ3Nob3VsZC1zaG93LXRvb2x0aXAnLCB7XG4gICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IsXG4gICAgICAgIHBvcyxcbiAgICAgICAgZXZlbnRUeXBlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJhbmdlSGFzQ2hhbmdlZCAocG9zOiBQb2ludCwgZXZlbnRUeXBlOiBURXZlbnRSYW5nZVR5cGUpIHtcbiAgICBjb25zdCBuZXdyYW5nZSA9IHRoaXMuZ2V0RXZlbnRSYW5nZShwb3MsIGV2ZW50VHlwZSkuY3JhbmdlXG4gICAgY29uc3QgaXNGaXJzdEl0ZXJhdGlvbiA9ICEodGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QgJiYgdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3QpXG4gICAgY29uc3QgaXNTYW1lVG9rZW4gPSAoKSA9PiB7XG4gICAgICBpZiAoISh0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdCAmJiB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0VGVzdCkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgIGNvbnN0IHJhbmdlc0FyZUVtcHR5ID0gdGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QuaXNFbXB0eSgpICYmIG5ld3JhbmdlLmlzRW1wdHkoKVxuICAgICAgY29uc3QgaXNTYW1lUm93ID0gdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3Qucm93ID09PSBwb3Mucm93XG4gICAgICBpZiAoIXJhbmdlc0FyZUVtcHR5IHx8ICFpc1NhbWVSb3cpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBjb25zdCB0bCA9ICh0aGlzLmVkaXRvciBhcyBhbnkpLnRva2VuaXplZEJ1ZmZlci50b2tlbml6ZWRMaW5lRm9yUm93KHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0LnJvdylcbiAgICAgIGNvbnN0IG9sZHRva2lkID0gdGwudG9rZW5JbmRleEF0QnVmZmVyQ29sdW1uKHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0XG4gICAgICAgIC5jb2x1bW4pXG4gICAgICBjb25zdCBuZXd0b2tpZCA9IHRsLnRva2VuSW5kZXhBdEJ1ZmZlckNvbHVtbihwb3MuY29sdW1uKVxuICAgICAgcmV0dXJuIG9sZHRva2lkID09PSBuZXd0b2tpZFxuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBpc0ZpcnN0SXRlcmF0aW9uIHx8ICEodGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QhLmlzRXF1YWwobmV3cmFuZ2UpIHx8IGlzU2FtZVRva2VuKCkpXG4gICAgdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3QgPSBwb3NcbiAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdCA9IG5ld3JhbmdlXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgc2hvd1Rvb2x0aXAgKFxuICAgIHBvczogUG9pbnQsIHJhbmdlOiBSYW5nZSwgdGV4dDogVE1lc3NhZ2UgfCBUTWVzc2FnZVtdLFxuICAgIGRldGFpbDoge2V2ZW50VHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBwZXJzaXN0T25DdXJzb3JNb3ZlPzogYm9vbGVhbiwgc3VidHlwZTogc3RyaW5nfVxuICApIHtcbiAgICBpZiAoIXRoaXMuZWRpdG9yKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIWRldGFpbC5ldmVudFR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZXZlbnRUeXBlIG5vdCBzZXQnKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRvb2x0aXBIaWdobGlnaHRSYW5nZSAmJiByYW5nZS5pc0VxdWFsKHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaGlkZVRvb2x0aXAoKVxuICAgICAgLy8gZXhpdCBpZiBtb3VzZSBtb3ZlZCBhd2F5XG4gICAgaWYgKGRldGFpbC5ldmVudFR5cGUgPT09ICdtb3VzZScpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ICYmICFyYW5nZS5jb250YWluc1BvaW50KHRoaXMubGFzdE1vdXNlQnVmZmVyUHQpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGV0YWlsLmV2ZW50VHlwZSA9PT0gJ3NlbGVjdGlvbicpIHtcbiAgICAgIGNvbnN0IGxhc3RTZWwgPSB0aGlzLmVkaXRvci5nZXRMYXN0U2VsZWN0aW9uKClcbiAgICAgIGlmICghcmFuZ2UuY29udGFpbnNSYW5nZShsYXN0U2VsLmdldEJ1ZmZlclJhbmdlKCkpIHx8ICEhbGFzdFNlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlID0gcmFuZ2VcbiAgICBjb25zdCBwcm9wcyA9IHsuLi5kZXRhaWwsIHR5cGU6ICd0b29sdGlwJ31cbiAgICBjb25zdCBoaWdobGlnaHRNYXJrZXIgPSB0aGlzLmVkaXRvci5tYXJrQnVmZmVyUmFuZ2UocmFuZ2UpXG4gICAgaGlnaGxpZ2h0TWFya2VyLnNldFByb3BlcnRpZXMocHJvcHMpXG4gICAgdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIoaGlnaGxpZ2h0TWFya2VyLCB7XG4gICAgICB0eXBlOiAnb3ZlcmxheScsXG4gICAgICBwb3NpdGlvbjogJ3RhaWwnLFxuICAgICAgaXRlbTogbmV3IFRvb2x0aXBNZXNzYWdlKHRleHQpXG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIoaGlnaGxpZ2h0TWFya2VyLCB7XG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNsYXNzOiAnaWRlLWhhc2tlbGwtdHlwZSdcbiAgICB9KVxuICB9XG5cbiAgaGlkZVRvb2x0aXAgKHRlbXBsYXRlPzogYW55KSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgdGVtcGxhdGUgPSB7fVxuICAgIH1cbiAgICB0aGlzLnRvb2x0aXBIaWdobGlnaHRSYW5nZSA9IHVuZGVmaW5lZFxuICAgIHRlbXBsYXRlLnR5cGUgPSAndG9vbHRpcCdcbiAgICB0aGlzLmVkaXRvci5maW5kTWFya2Vycyh0ZW1wbGF0ZSkuZm9yRWFjaCgobSkgPT4gbS5kZXN0cm95KCkpXG4gIH1cblxuICBnZXRFdmVudFJhbmdlIChwb3M6IFBvaW50IHwgdW5kZWZpbmVkLCBldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZSkge1xuICAgIGxldCBjcmFuZ2U6IFJhbmdlXG4gICAgc3dpdGNoIChldmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ21vdXNlJzpcbiAgICAgIGNhc2UgJ2NvbnRleHQnOlxuICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgIHBvcyA9IHRoaXMubGFzdE1vdXNlQnVmZmVyUHRcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbc2VsUmFuZ2VdID0gQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5nZXRTZWxlY3Rpb25zKClcbiAgICAgICAgICAubWFwKChzZWwpID0+IHNlbC5nZXRCdWZmZXJSYW5nZSgpKS5maWx0ZXIoKHNlbCkgPT4gc2VsLmNvbnRhaW5zUG9pbnQoXG4gICAgICAgICAgICBwb3MpKSlcbiAgICAgICAgY3JhbmdlID0gc2VsUmFuZ2UgfHwgbmV3IFJhbmdlKHBvcyEsIHBvcyEpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdrZXlib2FyZCc6XG4gICAgICBjYXNlICdzZWxlY3Rpb24nOlxuICAgICAgICBjcmFuZ2UgPSB0aGlzLmVkaXRvci5nZXRMYXN0U2VsZWN0aW9uKCkuZ2V0QnVmZmVyUmFuZ2UoKVxuICAgICAgICBwb3MgPSBjcmFuZ2Uuc3RhcnRcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBldmVudCB0eXBlICR7ZXZlbnRUeXBlfWApXG4gICAgfVxuXG4gICAgY29uc3QgcHBvcyA9IHBvcyFcblxuICAgIHJldHVybiB7XG4gICAgICBjcmFuZ2UsIHBvczogcHBvcywgZXZlbnRUeXBlXG4gICAgfVxuICB9XG5cbiAgZmluZENoZWNrUmVzdWx0TWFya2VycyAocG9zOiBQb2ludCwgZ3V0dGVyOiBib29sZWFuLCBldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZSkge1xuICAgIGlmIChndXR0ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVkaXRvci5maW5kTWFya2Vycyh7XG4gICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICBzdGFydEJ1ZmZlclJvdzogcG9zLnJvdyxcbiAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChldmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAna2V5Ym9hcmQnOlxuICAgICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5maW5kTWFya2Vycyh7XG4gICAgICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IuaWQsXG4gICAgICAgICAgICBjb250YWluc1JhbmdlOiBuZXcgUmFuZ2UocG9zLCBwb3MudHJhbnNsYXRlKFswLCAxXSkpXG4gICAgICAgICAgfSlcbiAgICAgICAgY2FzZSAnbW91c2UnOlxuICAgICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5maW5kTWFya2Vycyh7XG4gICAgICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IuaWQsXG4gICAgICAgICAgICBjb250YWluc1BvaW50OiBwb3NcbiAgICAgICAgICB9KVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNob3cgY2hlY2sgcmVzdWx0IHdoZW4gbW91c2Ugb3ZlciBndXR0ZXIgaWNvblxuICBzaG93Q2hlY2tSZXN1bHQgKHBvczogUG9pbnQsIGd1dHRlcjogYm9vbGVhbiwgZXZlbnRUeXBlPzogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgIGV2ZW50VHlwZSA9ICdtb3VzZSdcbiAgICB9XG4gICAgY29uc3QgbWFya2VycyA9IHRoaXMuZmluZENoZWNrUmVzdWx0TWFya2Vycyhwb3MsIGd1dHRlciwgZXZlbnRUeXBlKVxuICAgIGNvbnN0IFttYXJrZXJdID0gQXJyYXkuZnJvbShtYXJrZXJzKVxuXG4gICAgaWYgKCFtYXJrZXIpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPVxuICAgICAgbWFya2Vycy5tYXAoKG0pID0+IG0uZ2V0UHJvcGVydGllcygpLmRlc2MpXG5cbiAgICBpZiAoZ3V0dGVyKSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbmV3IFJhbmdlKHBvcywgcG9zKSwgdGV4dCwge1xuICAgICAgICBldmVudFR5cGUsIHN1YnR5cGU6ICdjaGVjay1yZXN1bHQnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbWFya2VyLmdldEJ1ZmZlclJhbmdlKCksIHRleHQsIHtcbiAgICAgICAgZXZlbnRUeXBlLCBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaGFzVG9vbHRpcHMgKHRlbXBsYXRlPzogT2JqZWN0KSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgdGVtcGxhdGUgPSB7fVxuICAgIH1cbiAgICByZXR1cm4gISF0aGlzLmVkaXRvci5maW5kTWFya2Vycyh7dHlwZTogJ3Rvb2x0aXAnLCAuLi50ZW1wbGF0ZX0pLmxlbmd0aFxuICB9XG59XG4iXX0=