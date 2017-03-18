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
        let editorElement = atom.views.getView(this.editor);
        if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
            this.gutter = this.editor.gutterWithName('ide-haskell-check-results');
            if (this.gutter == null) {
                this.gutter = this.editor.addGutter({
                    name: 'ide-haskell-check-results',
                    priority: 10
                });
            }
            let gutterElement = atom.views.getView(this.gutter);
            this.disposables.add(element_listener_1.listen(gutterElement.querySelector('.decoration'), 'mouseenter', (e) => {
                const bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
                if (bufferPt != null) {
                    this.lastMouseBufferPt = bufferPt;
                    return this.showCheckResult(bufferPt, true);
                }
            }));
            this.disposables.add(element_listener_1.listen(gutterElement.querySelector('.decoration'), 'mouseleave', e => {
                return this.hideTooltip();
            }));
        }
        let buffer = this.editor.getBuffer();
        this.disposables.add(buffer.onWillSave(() => {
            this.emitter.emit('will-save-buffer', buffer);
            if (atom.config.get('ide-haskell.onSavePrettify')) {
                return atom.commands.dispatch(editorElement, 'ide-haskell:prettify-file');
            }
        }));
        this.disposables.add(buffer.onDidSave(() => {
            return this.emitter.emit('did-save-buffer', buffer);
        }));
        this.disposables.add(this.editor.onDidStopChanging(() => {
            return this.emitter.emit('did-stop-changing', this.editor);
        }));
        this.disposables.add(editorElement.onDidChangeScrollLeft(() => {
            return this.hideTooltip({
                eventType: 'mouse'
            });
        }));
        this.disposables.add(editorElement.onDidChangeScrollTop(() => {
            return this.hideTooltip({
                eventType: 'mouse'
            });
        }));
        this.disposables.add(element_listener_1.listen(editorElement.querySelector('.scroll-view'), 'mousemove', (e) => {
            const bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
            if (bufferPt == null) {
                return;
            }
            if (this.lastMouseBufferPt && this.lastMouseBufferPt.isEqual(bufferPt)) {
                return;
            }
            this.lastMouseBufferPt = bufferPt;
            if (this.exprTypeTimeout != null) {
                clearTimeout(this.exprTypeTimeout);
            }
            this.exprTypeTimeout = setTimeout(() => bufferPt && this.shouldShowTooltip(bufferPt), atom.config.get('ide-haskell.expressionTypeInterval'));
        }));
        this.disposables.add(element_listener_1.listen(editorElement.querySelector('.scroll-view'), 'mouseout', (e) => {
            if (this.exprTypeTimeout != null) {
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
            if (this.selTimeout != null) {
                clearTimeout(this.selTimeout);
            }
            if (newBufferRange.isEmpty()) {
                this.hideTooltip({
                    eventType: 'selection'
                });
                switch (atom.config.get('ide-haskell.onCursorMove')) {
                    case 'Show Tooltip':
                        if (this.exprTypeTimeout != null) {
                            clearTimeout(this.exprTypeTimeout);
                        }
                        if (!this.showCheckResult(newBufferRange.start, false, 'keyboard')) {
                            return this.hideTooltip({
                                persistOnCursorMove: false
                            });
                        }
                        break;
                    case 'Hide Tooltip':
                        if (this.exprTypeTimeout != null) {
                            clearTimeout(this.exprTypeTimeout);
                        }
                        return this.hideTooltip({
                            persistOnCursorMove: false
                        });
                }
            }
            else {
                this.selTimeout = setTimeout(() => this.shouldShowTooltip(newBufferRange.start, 'selection'), atom.config.get('ide-haskell.expressionTypeInterval'));
            }
        }));
    }
    deactivate() {
        if (this.exprTypeTimeout != null) {
            clearTimeout(this.exprTypeTimeout);
        }
        if (this.selTimeout != null) {
            clearTimeout(this.selTimeout);
        }
        this.hideTooltip();
        this.disposables.dispose();
        this.lastMouseBufferPt = null;
    }
    updateResults(res, types) {
        let m;
        if (types != null) {
            for (let t of Array.from(types)) {
                for (m of Array.from(this.editor.findMarkers({
                    type: 'check-result',
                    severity: t,
                    editor: this.editor.id
                }))) {
                    m.destroy();
                }
            }
        }
        else {
            for (m of Array.from(this.editor.findMarkers({
                type: 'check-result',
                editor: this.editor.id
            }))) {
                m.destroy();
            }
        }
        return Array.from(res).map((r) => this.markerFromCheckResult(r));
    }
    markerFromCheckResult(resItem) {
        let { uri, severity, message, position } = resItem;
        if ((uri == null) || (uri !== this.editor.getPath())) {
            return;
        }
        if (!position) {
            return;
        }
        let range = new atom_1.Range(position, atom_1.Point.fromObject({
            row: position.row,
            column: position.column + 1
        }));
        let marker = this.editor.markBufferRange(range, {
            invalidate: 'touch'
        });
        marker.setProperties({
            type: 'check-result',
            severity,
            desc: message,
            editor: this.editor.id
        });
        let { CompositeDisposable } = require('atom');
        let disp = new CompositeDisposable();
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
        if (this.gutter == null) {
            return;
        }
        let cls = `ide-haskell-${m.getProperties().severity}`;
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
        if (eventType == null) {
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
        let newrange = this.getEventRange(pos, eventType).crange;
        let isFirstIteration = !(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest);
        let isSameToken = () => {
            if (!(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest)) {
                return false;
            }
            let rangesAreEmpty = this.lastMouseBufferRangeTest.isEmpty() && newrange.isEmpty();
            let isSameRow = this.lastMouseBufferPtTest.row === pos.row;
            if (!rangesAreEmpty || !isSameRow) {
                return false;
            }
            let tl = this.editor.tokenizedBuffer.tokenizedLineForRow(this.lastMouseBufferPtTest.row);
            let oldtokid = tl.tokenIndexAtBufferColumn(this.lastMouseBufferPtTest
                .column);
            let newtokid = tl.tokenIndexAtBufferColumn(pos.column);
            return oldtokid === newtokid;
        };
        const result = isFirstIteration || !(this.lastMouseBufferRangeTest.isEqual(newrange) || isSameToken());
        this.lastMouseBufferPtTest = pos;
        this.lastMouseBufferRangeTest = newrange;
        return result;
    }
    showTooltip(pos, range, text, detail) {
        if (this.editor == null) {
            return;
        }
        if (!detail.eventType) {
            throw new Error('eventType not set');
        }
        if (detail.persistOnCursorMove == null) {
            detail.persistOnCursorMove = false;
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
            let lastSel = this.editor.getLastSelection();
            if (!range.containsRange(lastSel.getBufferRange()) || !!lastSel.isEmpty()) {
                return;
            }
        }
        this.tooltipHighlightRange = range;
        const props = Object.assign({}, detail, { type: 'tooltip' });
        let highlightMarker = this.editor.markBufferRange(range);
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
        this.tooltipHighlightRange = null;
        template.type = 'tooltip';
        this.editor.findMarkers(template).forEach((m) => m.destroy());
    }
    getEventRange(pos, eventType) {
        let crange;
        switch (eventType) {
            case 'mouse':
            case 'context':
                if (pos == null) {
                    pos = this.lastMouseBufferPt;
                }
                let [selRange] = Array.from(this.editor.getSelections()
                    .map(sel => sel.getBufferRange()).filter(sel => sel.containsPoint(pos)));
                crange = selRange != null ? selRange : new atom_1.Range(pos, pos);
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
        if (eventType == null) {
            eventType = 'mouse';
        }
        let markers = this.findCheckResultMarkers(pos, gutter, eventType);
        let [marker] = Array.from(markers);
        if (marker == null) {
            this.hideTooltip({
                subtype: 'check-result'
            });
            return false;
        }
        let text = markers.map(marker => marker.getProperties().desc);
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
        if (template == null) {
            template = {};
        }
        template['type'] = 'tooltip';
        return !!this.editor.findMarkers(template).length;
    }
}
exports.EditorControl = EditorControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWRpdG9yLWNvbnRyb2wvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFFYTtBQUViLG9DQUVpQjtBQU9qQixpREFBNkM7QUFFN0MseURBQXlDO0FBS3pDO0lBVUUsWUFBcUIsTUFBbUI7UUFBbkIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQyxDQUFBO1FBRWxELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ3JFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDbEMsSUFBSSxFQUFFLDJCQUEyQjtvQkFDakMsUUFBUSxFQUFFLEVBQUU7aUJBQ2IsQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUVELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUks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O2FBQ25DLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUU7Z0JBQ25ELFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYzthQUNuQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRCxXQUFXLENBQUUsUUFBaUI7UUFDNUIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNmLENBQUM7UUFDRCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFBO0lBQ25ELENBQUM7Q0FDRjtBQXRkRCxzQ0FzZEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSYW5nZSwgRW1pdHRlciwgVGV4dEVkaXRvciwgUG9pbnQsIENvbXBvc2l0ZURpc3Bvc2FibGUsIEd1dHRlciwgRGlzcGxheU1hcmtlciwgVGV4dEJ1ZmZlclxufSBmcm9tICdhdG9tJ1xuXG5pbXBvcnQge1xuICBidWZmZXJQb3NpdGlvbkZyb21Nb3VzZUV2ZW50XG59IGZyb20gJy4uL3V0aWxzJ1xuXG5pbnRlcmZhY2UgSVRleHRFZGl0b3IgZXh0ZW5kcyBUZXh0RWRpdG9yIHtcbiAgaWQ/OiBudW1iZXJcbn1cblxuaW1wb3J0IHtSZXN1bHRJdGVtLCBUVXBkYXRlQ2FsbGJhY2ssIFRTZXZlcml0eX0gZnJvbSAnLi4vcmVzdWx0cy1kYidcbmltcG9ydCB7VG9vbHRpcE1lc3NhZ2V9IGZyb20gJy4vdG9vbHRpcC12aWV3J1xuaW1wb3J0IHtUTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQge2xpc3Rlbn0gZnJvbSAnLi9lbGVtZW50LWxpc3RlbmVyJ1xuXG5leHBvcnQgdHlwZSBURXZlbnRSYW5nZVR5cGUgPSAna2V5Ym9hcmQnIHwgJ2NvbnRleHQnIHwgJ21vdXNlJyB8ICdzZWxlY3Rpb24nXG5leHBvcnQgdHlwZSBUVGV4dEJ1ZmZlckNhbGxiYWNrID0gKGJ1ZmZlcjogVGV4dEJ1ZmZlcikgPT4gdm9pZFxuXG5leHBvcnQgY2xhc3MgRWRpdG9yQ29udHJvbCB7XG4gIHB1YmxpYyBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSAvLyBUT0RPIHNob3VsZCBiZSBwcml2YXRlLi4uXG4gIHByaXZhdGUgZW1pdHRlcjogRW1pdHRlclxuICBwcml2YXRlIGd1dHRlcjogR3V0dGVyXG4gIHByaXZhdGUgbGFzdE1vdXNlQnVmZmVyUHQ6IFBvaW50IHwgbnVsbFxuICBwcml2YXRlIGV4cHJUeXBlVGltZW91dDogbnVtYmVyIHwgbnVsbFxuICBwcml2YXRlIHNlbFRpbWVvdXQ6IG51bWJlciB8IG51bGxcbiAgcHJpdmF0ZSBsYXN0TW91c2VCdWZmZXJQdFRlc3Q6IFBvaW50IHwgbnVsbFxuICBwcml2YXRlIGxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdDogUmFuZ2UgfCBudWxsXG4gIHByaXZhdGUgdG9vbHRpcEhpZ2hsaWdodFJhbmdlOiBSYW5nZSB8IG51bGxcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgZWRpdG9yOiBJVGV4dEVkaXRvcikge1xuICAgIHRoaXMudXBkYXRlUmVzdWx0cyA9IHRoaXMudXBkYXRlUmVzdWx0cy5iaW5kKHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpKVxuXG4gICAgbGV0IGVkaXRvckVsZW1lbnQgPSBhdG9tLnZpZXdzLmdldFZpZXcodGhpcy5lZGl0b3IpXG5cbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5tZXNzYWdlRGlzcGxheUZyb250ZW5kJykgPT09ICdidWlsdGluJykge1xuICAgICAgdGhpcy5ndXR0ZXIgPSB0aGlzLmVkaXRvci5ndXR0ZXJXaXRoTmFtZSgnaWRlLWhhc2tlbGwtY2hlY2stcmVzdWx0cycpXG4gICAgICBpZiAodGhpcy5ndXR0ZXIgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmd1dHRlciA9IHRoaXMuZWRpdG9yLmFkZEd1dHRlcih7XG4gICAgICAgICAgbmFtZTogJ2lkZS1oYXNrZWxsLWNoZWNrLXJlc3VsdHMnLFxuICAgICAgICAgIHByaW9yaXR5OiAxMFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBsZXQgZ3V0dGVyRWxlbWVudCA9IGF0b20udmlld3MuZ2V0Vmlldyh0aGlzLmd1dHRlcilcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgICAgZ3V0dGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVjb3JhdGlvbicpLCAnbW91c2VlbnRlcicsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmZmVyUHQgPSBidWZmZXJQb3NpdGlvbkZyb21Nb3VzZUV2ZW50KHRoaXMuZWRpdG9yLCBlIGFzIE1vdXNlRXZlbnQpXG4gICAgICAgICAgaWYgKGJ1ZmZlclB0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUHQgPSBidWZmZXJQdFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0NoZWNrUmVzdWx0KGJ1ZmZlclB0LCB0cnVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKSlcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgICAgZ3V0dGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVjb3JhdGlvbicpLCAnbW91c2VsZWF2ZScsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVUb29sdGlwKClcbiAgICAgICAgfVxuICAgICAgKSlcbiAgICB9XG5cbiAgICAvLyBidWZmZXIgZXZlbnRzIGZvciBhdXRvbWF0aWMgY2hlY2tcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChidWZmZXIub25XaWxsU2F2ZSgoKSA9PiB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnd2lsbC1zYXZlLWJ1ZmZlcicsIGJ1ZmZlcilcbiAgICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5JykpIHtcbiAgICAgICAgcmV0dXJuIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goZWRpdG9yRWxlbWVudCxcbiAgICAgICAgICAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZScpXG4gICAgICB9XG4gICAgfSkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChidWZmZXIub25EaWRTYXZlKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXNhdmUtYnVmZmVyJywgYnVmZmVyKVxuICAgIH0pKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lZGl0b3Iub25EaWRTdG9wQ2hhbmdpbmcoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtc3RvcC1jaGFuZ2luZycsIHRoaXMuZWRpdG9yKVxuICAgIH0pKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoZWRpdG9yRWxlbWVudC5vbkRpZENoYW5nZVNjcm9sbExlZnQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICBldmVudFR5cGU6ICdtb3VzZSdcbiAgICAgIH0pXG4gICAgfSkpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoZWRpdG9yRWxlbWVudC5vbkRpZENoYW5nZVNjcm9sbFRvcCgoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgIGV2ZW50VHlwZTogJ21vdXNlJ1xuICAgICAgfSlcbiAgICB9KSlcblxuICAgIC8vIHNob3cgZXhwcmVzc2lvbiB0eXBlIGlmIG1vdXNlIHN0b3BwZWQgc29tZXdoZXJlXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQobGlzdGVuKFxuICAgICAgZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLXZpZXcnKSwgJ21vdXNlbW92ZScsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICBjb25zdCBidWZmZXJQdCA9IGJ1ZmZlclBvc2l0aW9uRnJvbU1vdXNlRXZlbnQodGhpcy5lZGl0b3IsIGUgYXMgTW91c2VFdmVudClcblxuICAgICAgICBpZiAoYnVmZmVyUHQgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGFzdE1vdXNlQnVmZmVyUHQgJiYgdGhpcy5sYXN0TW91c2VCdWZmZXJQdC5pc0VxdWFsKGJ1ZmZlclB0KSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUHQgPSBidWZmZXJQdFxuXG4gICAgICAgIGlmICh0aGlzLmV4cHJUeXBlVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwclR5cGVUaW1lb3V0KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXhwclR5cGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBidWZmZXJQdCAmJiB0aGlzLnNob3VsZFNob3dUb29sdGlwKGJ1ZmZlclB0KSxcbiAgICAgICAgICBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLmV4cHJlc3Npb25UeXBlSW50ZXJ2YWwnKSlcbiAgICAgIH1cbiAgICApKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgIGVkaXRvckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC12aWV3JyksICdtb3VzZW91dCcsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5leHByVHlwZVRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lZGl0b3Iub25EaWRDaGFuZ2VTZWxlY3Rpb25SYW5nZSgoe25ld0J1ZmZlclJhbmdlfToge25ld0J1ZmZlclJhbmdlOiBSYW5nZX0pID0+IHtcbiAgICAgIGNvbnN0IHRvb2x0aXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaWRlLWhhc2tlbGwtdG9vbHRpcCcpXG4gICAgICBpZiAodG9vbHRpcEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2xjbCA9IGVkaXRvckVsZW1lbnQucGl4ZWxSZWN0Rm9yU2NyZWVuUmFuZ2UodGhpcy5lZGl0b3Iuc2NyZWVuUmFuZ2VGb3JCdWZmZXJSYW5nZShuZXdCdWZmZXJSYW5nZSkpXG4gICAgICAgIGNvbnN0IGVlY2wgPSBlZGl0b3JFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtdmlldycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHR0Y2wgPSB0b29sdGlwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCB0dGNsZCA9IHRvb2x0aXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpIS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCB0dGJveCA9IHtcbiAgICAgICAgICBsZWZ0OiB0dGNsLmxlZnQgLSBlZWNsLmxlZnQsXG4gICAgICAgICAgdG9wOiB0dGNsZC50b3AgLSBlZWNsLnRvcCxcbiAgICAgICAgICB3aWR0aDogdHRjbC53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHR0Y2xkLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHhtYXggPSBNYXRoLnJvdW5kKE1hdGgubWF4KHR0Ym94LmxlZnQsIHNsY2wubGVmdCkpXG4gICAgICAgIGNvbnN0IHhtaW4gPSBNYXRoLnJvdW5kKE1hdGgubWluKHR0Ym94LmxlZnQgKyB0dGJveC53aWR0aCwgc2xjbC5sZWZ0ICtcbiAgICAgICAgICBzbGNsLndpZHRoKSlcbiAgICAgICAgY29uc3QgeW1heCA9IE1hdGgucm91bmQoTWF0aC5tYXgodHRib3gudG9wLCBzbGNsLnRvcCkpXG4gICAgICAgIGNvbnN0IHltaW4gPSBNYXRoLnJvdW5kKE1hdGgubWluKHR0Ym94LnRvcCArIHR0Ym94LmhlaWdodCwgc2xjbC50b3AgK1xuICAgICAgICAgIHNsY2wuaGVpZ2h0KSlcbiAgICAgICAgY29uc3QgdHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZGUtaGFza2VsbC10b29sdGlwJykgYXMgSFRNTEVsZW1lbnRcbiAgICAgICAgaWYgKHR0KSB7XG4gICAgICAgICAgaWYgKCh5bWF4IDw9IHltaW4pICYmICh4bWF4IDw9IHhtaW4pKSB7XG4gICAgICAgICAgICB0dC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ29wYWNpdHknLCAnMC4zJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXG4gICAgICAgICAgICAgICdvcGFjaXR5JylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2VsVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlbFRpbWVvdXQpXG4gICAgICB9XG4gICAgICBpZiAobmV3QnVmZmVyUmFuZ2UuaXNFbXB0eSgpKSB7XG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICAgIGV2ZW50VHlwZTogJ3NlbGVjdGlvbidcbiAgICAgICAgfSlcbiAgICAgICAgc3dpdGNoIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uQ3Vyc29yTW92ZScpKSB7XG4gICAgICAgICAgY2FzZSAnU2hvdyBUb29sdGlwJzpcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cHJUeXBlVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93Q2hlY2tSZXN1bHQobmV3QnVmZmVyUmFuZ2Uuc3RhcnQsIGZhbHNlLFxuICAgICAgICAgICAgICAgICdrZXlib2FyZCcpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVUb29sdGlwKHtcbiAgICAgICAgICAgICAgICBwZXJzaXN0T25DdXJzb3JNb3ZlOiBmYWxzZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdIaWRlIFRvb2x0aXAnOlxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwclR5cGVUaW1lb3V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICAgICAgICBwZXJzaXN0T25DdXJzb3JNb3ZlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNob3VsZFNob3dUb29sdGlwKFxuICAgICAgICAgICAgbmV3QnVmZmVyUmFuZ2Uuc3RhcnQsICdzZWxlY3Rpb24nKSxcbiAgICAgICAgICBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLmV4cHJlc3Npb25UeXBlSW50ZXJ2YWwnKSlcbiAgICAgIH1cbiAgICB9KSlcbiAgfVxuXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIGlmICh0aGlzLmV4cHJUeXBlVGltZW91dCAhPSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgfVxuICAgIGlmICh0aGlzLnNlbFRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VsVGltZW91dClcbiAgICB9XG4gICAgdGhpcy5oaWRlVG9vbHRpcCgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ID0gbnVsbFxuICB9XG5cbiAgdXBkYXRlUmVzdWx0cyAocmVzOiBSZXN1bHRJdGVtW10sIHR5cGVzPzogVFNldmVyaXR5W10pIHtcbiAgICBsZXQgbVxuICAgIGlmICh0eXBlcyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCB0IG9mIEFycmF5LmZyb20odHlwZXMpKSB7XG4gICAgICAgIGZvciAobSBvZiBBcnJheS5mcm9tKHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgICBzZXZlcml0eTogdCxcbiAgICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkXG4gICAgICAgIH0pKSkge1xuICAgICAgICAgIG0uZGVzdHJveSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChtIG9mIEFycmF5LmZyb20odGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZFxuICAgICAgfSkpKSB7XG4gICAgICAgIG0uZGVzdHJveSgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHJlcykubWFwKChyKSA9PiB0aGlzLm1hcmtlckZyb21DaGVja1Jlc3VsdChyKSlcbiAgfVxuXG4gIG1hcmtlckZyb21DaGVja1Jlc3VsdCAocmVzSXRlbTogUmVzdWx0SXRlbSkge1xuICAgIGxldCB7XG4gICAgICB1cmksIHNldmVyaXR5LCBtZXNzYWdlLCBwb3NpdGlvblxuICAgIH0gPSByZXNJdGVtXG4gICAgaWYgKCh1cmkgPT0gbnVsbCkgfHwgKHVyaSAhPT0gdGhpcy5lZGl0b3IuZ2V0UGF0aCgpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghcG9zaXRpb24pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBtYXJrZXJcbiAgICBsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UocG9zaXRpb24sIFBvaW50LmZyb21PYmplY3Qoe1xuICAgICAgcm93OiBwb3NpdGlvbi5yb3csXG4gICAgICBjb2x1bW46IHBvc2l0aW9uLmNvbHVtbiArIDFcbiAgICB9KSlcbiAgICBsZXQgbWFya2VyID0gdGhpcy5lZGl0b3IubWFya0J1ZmZlclJhbmdlKHJhbmdlLCB7XG4gICAgICBpbnZhbGlkYXRlOiAndG91Y2gnXG4gICAgfSlcbiAgICBtYXJrZXIuc2V0UHJvcGVydGllcyh7XG4gICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgIHNldmVyaXR5LFxuICAgICAgZGVzYzogbWVzc2FnZSxcbiAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IuaWRcbiAgICB9KVxuICAgIGxldCB7XG4gICAgICBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgfSA9IHJlcXVpcmUoJ2F0b20nKVxuICAgIGxldCBkaXNwID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIGRpc3AuYWRkKG1hcmtlci5vbkRpZENoYW5nZSgoe2lzVmFsaWR9OiBEaXNwbGF5TWFya2VyKSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgcmVzSXRlbS5kZXN0cm95KClcbiAgICAgICAgcmV0dXJuIG1hcmtlci5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KSlcbiAgICBkaXNwLmFkZChtYXJrZXIub25EaWREZXN0cm95KCgpID0+IGRpc3AuZGlzcG9zZSgpKSlcblxuICAgIHJldHVybiB0aGlzLmRlY29yYXRlTWFya2VyKG1hcmtlcilcbiAgfVxuXG4gIGRlY29yYXRlTWFya2VyIChtOiBEaXNwbGF5TWFya2VyKSB7XG4gICAgaWYgKHRoaXMuZ3V0dGVyID09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgY2xzID0gYGlkZS1oYXNrZWxsLSR7KG0uZ2V0UHJvcGVydGllcygpIGFzIGFueSkuc2V2ZXJpdHl9YFxuICAgIHRoaXMuZ3V0dGVyLmRlY29yYXRlTWFya2VyKG0sIHtcbiAgICAgIHR5cGU6ICdsaW5lLW51bWJlcicsXG4gICAgICBjbGFzczogY2xzXG4gICAgfSlcbiAgICB0aGlzLmVkaXRvci5kZWNvcmF0ZU1hcmtlcihtLCB7XG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNsYXNzOiBjbHNcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmVkaXRvci5kZWNvcmF0ZU1hcmtlcihtLCB7XG4gICAgICB0eXBlOiAnbGluZScsXG4gICAgICBjbGFzczogY2xzXG4gICAgfSlcbiAgfVxuXG4gIG9uU2hvdWxkU2hvd1Rvb2x0aXAgKGNhbGxiYWNrOiAoYXJnczoge2VkaXRvcjogVGV4dEVkaXRvciwgcG9zOiBQb2ludCwgZXZlbnRUeXBlOiBURXZlbnRSYW5nZVR5cGV9KSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignc2hvdWxkLXNob3ctdG9vbHRpcCcsIGNhbGxiYWNrKVxuICB9XG5cbiAgb25XaWxsU2F2ZUJ1ZmZlciAoY2FsbGJhY2s6IFRUZXh0QnVmZmVyQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCd3aWxsLXNhdmUtYnVmZmVyJywgY2FsbGJhY2spXG4gIH1cblxuICBvbkRpZFNhdmVCdWZmZXIgKGNhbGxiYWNrOiBUVGV4dEJ1ZmZlckNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXNhdmUtYnVmZmVyJywgY2FsbGJhY2spXG4gIH1cblxuICBvbkRpZFN0b3BDaGFuZ2luZyAoY2FsbGJhY2s6IChlZGl0b3I6IFRleHRFZGl0b3IpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtc3RvcC1jaGFuZ2luZycsIGNhbGxiYWNrKVxuICB9XG5cbiAgc2hvdWxkU2hvd1Rvb2x0aXAgKHBvczogUG9pbnQsIGV2ZW50VHlwZT86IFRFdmVudFJhbmdlVHlwZSkge1xuICAgIGlmIChldmVudFR5cGUgPT0gbnVsbCkge1xuICAgICAgZXZlbnRUeXBlID0gJ21vdXNlJ1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93Q2hlY2tSZXN1bHQocG9zLCBmYWxzZSwgZXZlbnRUeXBlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKChwb3Mucm93IDwgMCkgfHxcbiAgICAgIChwb3Mucm93ID49IHRoaXMuZWRpdG9yLmdldExpbmVDb3VudCgpKSB8fFxuICAgICAgcG9zLmlzRXF1YWwodGhpcy5lZGl0b3IuYnVmZmVyUmFuZ2VGb3JCdWZmZXJSb3cocG9zLnJvdykuZW5kKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe2V2ZW50VHlwZX0pXG4gICAgfSBlbHNlIGlmICh0aGlzLnJhbmdlSGFzQ2hhbmdlZChwb3MsIGV2ZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtaXR0ZXIuZW1pdCgnc2hvdWxkLXNob3ctdG9vbHRpcCcsIHtcbiAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvcixcbiAgICAgICAgcG9zLFxuICAgICAgICBldmVudFR5cGVcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmFuZ2VIYXNDaGFuZ2VkIChwb3M6IFBvaW50LCBldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZSkge1xuICAgIGxldCBuZXdyYW5nZSA9IHRoaXMuZ2V0RXZlbnRSYW5nZShwb3MsIGV2ZW50VHlwZSkuY3JhbmdlXG4gICAgbGV0IGlzRmlyc3RJdGVyYXRpb24gPSAhKHRoaXMubGFzdE1vdXNlQnVmZmVyUmFuZ2VUZXN0ICYmIHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0KVxuICAgIGxldCBpc1NhbWVUb2tlbiA9ICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMubGFzdE1vdXNlQnVmZmVyUmFuZ2VUZXN0ICYmIHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0KSkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgbGV0IHJhbmdlc0FyZUVtcHR5ID0gdGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QuaXNFbXB0eSgpICYmIG5ld3JhbmdlLmlzRW1wdHkoKVxuICAgICAgbGV0IGlzU2FtZVJvdyA9IHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0LnJvdyA9PT0gcG9zLnJvd1xuICAgICAgaWYgKCFyYW5nZXNBcmVFbXB0eSB8fCAhaXNTYW1lUm93KSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgbGV0IHRsID0gKHRoaXMuZWRpdG9yIGFzIGFueSkudG9rZW5pemVkQnVmZmVyLnRva2VuaXplZExpbmVGb3JSb3codGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3Qucm93KVxuICAgICAgbGV0IG9sZHRva2lkID0gdGwudG9rZW5JbmRleEF0QnVmZmVyQ29sdW1uKHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0XG4gICAgICAgIC5jb2x1bW4pXG4gICAgICBsZXQgbmV3dG9raWQgPSB0bC50b2tlbkluZGV4QXRCdWZmZXJDb2x1bW4ocG9zLmNvbHVtbilcbiAgICAgIHJldHVybiBvbGR0b2tpZCA9PT0gbmV3dG9raWRcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gaXNGaXJzdEl0ZXJhdGlvbiB8fCAhKHRoaXMubGFzdE1vdXNlQnVmZmVyUmFuZ2VUZXN0IS5pc0VxdWFsKG5ld3JhbmdlKSB8fCBpc1NhbWVUb2tlbigpKVxuICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0ID0gcG9zXG4gICAgdGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QgPSBuZXdyYW5nZVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHNob3dUb29sdGlwIChwb3M6IFBvaW50LCByYW5nZTogUmFuZ2UsIHRleHQ6IFRNZXNzYWdlIHwgVE1lc3NhZ2VbXSwgZGV0YWlsOiB7ZXZlbnRUeXBlOiBURXZlbnRSYW5nZVR5cGUsIHBlcnNpc3RPbkN1cnNvck1vdmU/OiBib29sZWFuLCBzdWJ0eXBlOiBzdHJpbmd9KSB7XG4gICAgaWYgKHRoaXMuZWRpdG9yID09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghZGV0YWlsLmV2ZW50VHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdldmVudFR5cGUgbm90IHNldCcpXG4gICAgfVxuICAgIGlmIChkZXRhaWwucGVyc2lzdE9uQ3Vyc29yTW92ZSA9PSBudWxsKSB7XG4gICAgICBkZXRhaWwucGVyc2lzdE9uQ3Vyc29yTW92ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlICYmIHJhbmdlLmlzRXF1YWwodGhpcy50b29sdGlwSGlnaGxpZ2h0UmFuZ2UpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5oaWRlVG9vbHRpcCgpXG4gICAgICAvLyBleGl0IGlmIG1vdXNlIG1vdmVkIGF3YXlcbiAgICBpZiAoZGV0YWlsLmV2ZW50VHlwZSA9PT0gJ21vdXNlJykge1xuICAgICAgaWYgKHRoaXMubGFzdE1vdXNlQnVmZmVyUHQgJiYgIXJhbmdlLmNvbnRhaW5zUG9pbnQodGhpcy5sYXN0TW91c2VCdWZmZXJQdCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkZXRhaWwuZXZlbnRUeXBlID09PSAnc2VsZWN0aW9uJykge1xuICAgICAgbGV0IGxhc3RTZWwgPSB0aGlzLmVkaXRvci5nZXRMYXN0U2VsZWN0aW9uKClcbiAgICAgIGlmICghcmFuZ2UuY29udGFpbnNSYW5nZShsYXN0U2VsLmdldEJ1ZmZlclJhbmdlKCkpIHx8ICEhbGFzdFNlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlID0gcmFuZ2VcbiAgICBjb25zdCBwcm9wcyA9IHsuLi5kZXRhaWwsIHR5cGU6ICd0b29sdGlwJ31cbiAgICBsZXQgaGlnaGxpZ2h0TWFya2VyID0gdGhpcy5lZGl0b3IubWFya0J1ZmZlclJhbmdlKHJhbmdlKVxuICAgIGhpZ2hsaWdodE1hcmtlci5zZXRQcm9wZXJ0aWVzKHByb3BzKVxuICAgIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKGhpZ2hsaWdodE1hcmtlciwge1xuICAgICAgdHlwZTogJ292ZXJsYXknLFxuICAgICAgcG9zaXRpb246ICd0YWlsJyxcbiAgICAgIGl0ZW06IG5ldyBUb29sdGlwTWVzc2FnZSh0ZXh0KVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKGhpZ2hsaWdodE1hcmtlciwge1xuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjbGFzczogJ2lkZS1oYXNrZWxsLXR5cGUnXG4gICAgfSlcbiAgfVxuXG4gIGhpZGVUb29sdGlwICh0ZW1wbGF0ZT86IGFueSkge1xuICAgIGlmICghdGVtcGxhdGUpIHtcbiAgICAgIHRlbXBsYXRlID0ge31cbiAgICB9XG4gICAgdGhpcy50b29sdGlwSGlnaGxpZ2h0UmFuZ2UgPSBudWxsXG4gICAgdGVtcGxhdGUudHlwZSA9ICd0b29sdGlwJ1xuICAgIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHRlbXBsYXRlKS5mb3JFYWNoKChtKSA9PiBtLmRlc3Ryb3koKSlcbiAgfVxuXG4gIGdldEV2ZW50UmFuZ2UgKHBvczogUG9pbnQgfCBudWxsLCBldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZSkge1xuICAgIGxldCBjcmFuZ2U6IFJhbmdlXG4gICAgc3dpdGNoIChldmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ21vdXNlJzpcbiAgICAgIGNhc2UgJ2NvbnRleHQnOlxuICAgICAgICBpZiAocG9zID09IG51bGwpIHtcbiAgICAgICAgICBwb3MgPSB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0XG4gICAgICAgIH1cbiAgICAgICAgbGV0IFtzZWxSYW5nZV0gPSBBcnJheS5mcm9tKHRoaXMuZWRpdG9yLmdldFNlbGVjdGlvbnMoKVxuICAgICAgICAgIC5tYXAoc2VsID0+IHNlbC5nZXRCdWZmZXJSYW5nZSgpKS5maWx0ZXIoc2VsID0+IHNlbC5jb250YWluc1BvaW50KFxuICAgICAgICAgICAgcG9zKSkpXG4gICAgICAgIGNyYW5nZSA9IHNlbFJhbmdlICE9IG51bGwgPyBzZWxSYW5nZSA6IG5ldyBSYW5nZShwb3MhLCBwb3MhKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAna2V5Ym9hcmQnOlxuICAgICAgY2FzZSAnc2VsZWN0aW9uJzpcbiAgICAgICAgY3JhbmdlID0gdGhpcy5lZGl0b3IuZ2V0TGFzdFNlbGVjdGlvbigpLmdldEJ1ZmZlclJhbmdlKClcbiAgICAgICAgcG9zID0gY3JhbmdlLnN0YXJ0XG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZXZlbnQgdHlwZSAke2V2ZW50VHlwZX1gKVxuICAgIH1cblxuICAgIGNvbnN0IHBwb3MgPSBwb3MhXG5cbiAgICByZXR1cm4ge1xuICAgICAgY3JhbmdlLCBwb3M6IHBwb3MsIGV2ZW50VHlwZVxuICAgIH1cbiAgfVxuXG4gIGZpbmRDaGVja1Jlc3VsdE1hcmtlcnMgKHBvczogUG9pbnQsIGd1dHRlcjogYm9vbGVhbiwgZXZlbnRUeXBlOiBURXZlbnRSYW5nZVR5cGUpIHtcbiAgICBpZiAoZ3V0dGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgc3RhcnRCdWZmZXJSb3c6IHBvcy5yb3csXG4gICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IuaWRcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2tleWJvYXJkJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICAgICAgdHlwZTogJ2NoZWNrLXJlc3VsdCcsXG4gICAgICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkLFxuICAgICAgICAgICAgY29udGFpbnNSYW5nZTogbmV3IFJhbmdlKHBvcywgcG9zLnRyYW5zbGF0ZShbMCwgMV0pKVxuICAgICAgICAgIH0pXG4gICAgICAgIGNhc2UgJ21vdXNlJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICAgICAgdHlwZTogJ2NoZWNrLXJlc3VsdCcsXG4gICAgICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkLFxuICAgICAgICAgICAgY29udGFpbnNQb2ludDogcG9zXG4gICAgICAgICAgfSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBzaG93IGNoZWNrIHJlc3VsdCB3aGVuIG1vdXNlIG92ZXIgZ3V0dGVyIGljb25cbiAgc2hvd0NoZWNrUmVzdWx0IChwb3M6IFBvaW50LCBndXR0ZXI6IGJvb2xlYW4sIGV2ZW50VHlwZT86IFRFdmVudFJhbmdlVHlwZSkge1xuICAgIGlmIChldmVudFR5cGUgPT0gbnVsbCkge1xuICAgICAgZXZlbnRUeXBlID0gJ21vdXNlJ1xuICAgIH1cbiAgICBsZXQgbWFya2VycyA9IHRoaXMuZmluZENoZWNrUmVzdWx0TWFya2Vycyhwb3MsIGd1dHRlciwgZXZlbnRUeXBlKVxuICAgIGxldCBbbWFya2VyXSA9IEFycmF5LmZyb20obWFya2VycylcblxuICAgIGlmIChtYXJrZXIgPT0gbnVsbCkge1xuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgIHN1YnR5cGU6ICdjaGVjay1yZXN1bHQnXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IHRleHQgPVxuICAgICAgbWFya2Vycy5tYXAobWFya2VyID0+IG1hcmtlci5nZXRQcm9wZXJ0aWVzKCkuZGVzYylcblxuICAgIGlmIChndXR0ZXIpIHtcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXAocG9zLCBuZXcgUmFuZ2UocG9zLCBwb3MpLCB0ZXh0LCB7XG4gICAgICAgIGV2ZW50VHlwZSwgc3VidHlwZTogJ2NoZWNrLXJlc3VsdCdcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXAocG9zLCBtYXJrZXIuZ2V0QnVmZmVyUmFuZ2UoKSwgdGV4dCwge1xuICAgICAgICBldmVudFR5cGUsIHN1YnR5cGU6ICdjaGVjay1yZXN1bHQnXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBoYXNUb29sdGlwcyAodGVtcGxhdGU/OiBPYmplY3QpIHtcbiAgICBpZiAodGVtcGxhdGUgPT0gbnVsbCkge1xuICAgICAgdGVtcGxhdGUgPSB7fVxuICAgIH1cbiAgICB0ZW1wbGF0ZVsndHlwZSddID0gJ3Rvb2x0aXAnXG4gICAgcmV0dXJuICEhdGhpcy5lZGl0b3IuZmluZE1hcmtlcnModGVtcGxhdGUpLmxlbmd0aFxuICB9XG59XG4iXX0=