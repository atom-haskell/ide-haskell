"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const utils_1 = require("../utils");
const tooltip_view_1 = require("./tooltip-view");
const element_listener_1 = require("./element-listener");
class EditorControl {
    constructor(editor) {
        this.editor = editor;
        let bufferPt;
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
                bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
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
        this.disposables.add(element_listener_1.listen(editorElement.rootElement.querySelector('.scroll-view'), 'mousemove', e => {
            bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
            if (bufferPt == null) {
                return;
            }
            if (this.lastMouseBufferPt != null ? this.lastMouseBufferPt.isEqual(bufferPt) : undefined) {
                return;
            }
            this.lastMouseBufferPt = bufferPt;
            if (this.exprTypeTimeout != null) {
                clearTimeout(this.exprTypeTimeout);
            }
            this.exprTypeTimeout = setTimeout(() => bufferPt && this.shouldShowTooltip(bufferPt), atom.config.get('ide-haskell.expressionTypeInterval'));
        }));
        this.disposables.add(element_listener_1.listen(editorElement.rootElement.querySelector('.scroll-view'), 'mouseout', e => {
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
            return this.hideTooltip({
                eventType
            });
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
        highlightMarker.setProperties(detail);
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
        if (template == null) {
            template = {};
        }
        this.tooltipHighlightRange = null;
        template.type = 'tooltip';
        return Array.from(this.editor.findMarkers(template)).map((m) => m.destroy());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWRpdG9yLWNvbnRyb2wvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFFYTtBQUViLG9DQUVpQjtBQU9qQixpREFBNkM7QUFFN0MseURBQXlDO0FBS3pDO0lBVUUsWUFBcUIsTUFBbUI7UUFBbkIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUN0QyxJQUFJLFFBQXNCLENBQUE7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUMsQ0FBQTtRQUVsRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtZQUNyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ2xDLElBQUksRUFBRSwyQkFBMkI7b0JBQ2pDLFFBQVEsRUFBRSxFQUFFO2lCQUNiLENBQUMsQ0FBQTtZQUNKLENBQUM7WUFFRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FB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QUFFLElBQUksWUFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUU7Z0JBQy9DLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYzthQUNuQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFO2dCQUNuRCxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWM7YUFDbkMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsV0FBVyxDQUFFLFFBQWlCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDZixDQUFDO1FBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQTtRQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUNuRCxDQUFDO0NBQ0Y7QUExZEQsc0NBMGRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUmFuZ2UsIEVtaXR0ZXIsIFRleHRFZGl0b3IsIFBvaW50LCBDb21wb3NpdGVEaXNwb3NhYmxlLCBHdXR0ZXIsIERpc3BsYXlNYXJrZXIsIFRleHRCdWZmZXJcbn0gZnJvbSAnYXRvbSdcblxuaW1wb3J0IHtcbiAgYnVmZmVyUG9zaXRpb25Gcm9tTW91c2VFdmVudFxufSBmcm9tICcuLi91dGlscydcblxuaW50ZXJmYWNlIElUZXh0RWRpdG9yIGV4dGVuZHMgVGV4dEVkaXRvciB7XG4gIGlkPzogbnVtYmVyXG59XG5cbmltcG9ydCB7UmVzdWx0SXRlbSwgVFVwZGF0ZUNhbGxiYWNrLCBUU2V2ZXJpdHl9IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQge1Rvb2x0aXBNZXNzYWdlfSBmcm9tICcuL3Rvb2x0aXAtdmlldydcbmltcG9ydCB7VE1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtsaXN0ZW59IGZyb20gJy4vZWxlbWVudC1saXN0ZW5lcidcblxuZXhwb3J0IHR5cGUgVEV2ZW50UmFuZ2VUeXBlID0gJ2tleWJvYXJkJyB8ICdjb250ZXh0JyB8ICdtb3VzZScgfCAnc2VsZWN0aW9uJ1xuZXhwb3J0IHR5cGUgVFRleHRCdWZmZXJDYWxsYmFjayA9IChidWZmZXI6IFRleHRCdWZmZXIpID0+IHZvaWRcblxuZXhwb3J0IGNsYXNzIEVkaXRvckNvbnRyb2wge1xuICBwdWJsaWMgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGUgLy8gVE9ETyBzaG91bGQgYmUgcHJpdmF0ZS4uLlxuICBwcml2YXRlIGVtaXR0ZXI6IEVtaXR0ZXJcbiAgcHJpdmF0ZSBndXR0ZXI6IEd1dHRlclxuICBwcml2YXRlIGxhc3RNb3VzZUJ1ZmZlclB0OiBQb2ludCB8IG51bGxcbiAgcHJpdmF0ZSBleHByVHlwZVRpbWVvdXQ6IG51bWJlciB8IG51bGxcbiAgcHJpdmF0ZSBzZWxUaW1lb3V0OiBudW1iZXIgfCBudWxsXG4gIHByaXZhdGUgbGFzdE1vdXNlQnVmZmVyUHRUZXN0OiBQb2ludCB8IG51bGxcbiAgcHJpdmF0ZSBsYXN0TW91c2VCdWZmZXJSYW5nZVRlc3Q6IFJhbmdlIHwgbnVsbFxuICBwcml2YXRlIHRvb2x0aXBIaWdobGlnaHRSYW5nZTogUmFuZ2UgfCBudWxsXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIGVkaXRvcjogSVRleHRFZGl0b3IpIHtcbiAgICBsZXQgYnVmZmVyUHQ6IFBvaW50IHwgbnVsbFxuICAgIHRoaXMudXBkYXRlUmVzdWx0cyA9IHRoaXMudXBkYXRlUmVzdWx0cy5iaW5kKHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpKVxuXG4gICAgbGV0IGVkaXRvckVsZW1lbnQgPSBhdG9tLnZpZXdzLmdldFZpZXcodGhpcy5lZGl0b3IpXG5cbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5tZXNzYWdlRGlzcGxheUZyb250ZW5kJykgPT09ICdidWlsdGluJykge1xuICAgICAgdGhpcy5ndXR0ZXIgPSB0aGlzLmVkaXRvci5ndXR0ZXJXaXRoTmFtZSgnaWRlLWhhc2tlbGwtY2hlY2stcmVzdWx0cycpXG4gICAgICBpZiAodGhpcy5ndXR0ZXIgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmd1dHRlciA9IHRoaXMuZWRpdG9yLmFkZEd1dHRlcih7XG4gICAgICAgICAgbmFtZTogJ2lkZS1oYXNrZWxsLWNoZWNrLXJlc3VsdHMnLFxuICAgICAgICAgIHByaW9yaXR5OiAxMFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBsZXQgZ3V0dGVyRWxlbWVudCA9IGF0b20udmlld3MuZ2V0Vmlldyh0aGlzLmd1dHRlcilcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgICAgZ3V0dGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVjb3JhdGlvbicpLCAnbW91c2VlbnRlcicsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgYnVmZmVyUHQgPSBidWZmZXJQb3NpdGlvbkZyb21Nb3VzZUV2ZW50KHRoaXMuZWRpdG9yLCBlIGFzIE1vdXNlRXZlbnQpXG4gICAgICAgICAgaWYgKGJ1ZmZlclB0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUHQgPSBidWZmZXJQdFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0NoZWNrUmVzdWx0KGJ1ZmZlclB0LCB0cnVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKSlcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgICAgZ3V0dGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVjb3JhdGlvbicpLCAnbW91c2VsZWF2ZScsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVUb29sdGlwKClcbiAgICAgICAgfVxuICAgICAgKSlcbiAgICB9XG5cbiAgICAvLyBidWZmZXIgZXZlbnRzIGZvciBhdXRvbWF0aWMgY2hlY2tcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChidWZmZXIub25XaWxsU2F2ZSgoKSA9PiB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnd2lsbC1zYXZlLWJ1ZmZlcicsIGJ1ZmZlcilcbiAgICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5JykpIHtcbiAgICAgICAgcmV0dXJuIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goZWRpdG9yRWxlbWVudCxcbiAgICAgICAgICAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZScpXG4gICAgICB9XG4gICAgfSkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChidWZmZXIub25EaWRTYXZlKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXNhdmUtYnVmZmVyJywgYnVmZmVyKVxuICAgIH0pKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lZGl0b3Iub25EaWRTdG9wQ2hhbmdpbmcoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtc3RvcC1jaGFuZ2luZycsIHRoaXMuZWRpdG9yKVxuICAgIH0pKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoZWRpdG9yRWxlbWVudC5vbkRpZENoYW5nZVNjcm9sbExlZnQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICBldmVudFR5cGU6ICdtb3VzZSdcbiAgICAgIH0pXG4gICAgfSkpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoZWRpdG9yRWxlbWVudC5vbkRpZENoYW5nZVNjcm9sbFRvcCgoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgIGV2ZW50VHlwZTogJ21vdXNlJ1xuICAgICAgfSlcbiAgICB9KSlcblxuICAgIC8vIHNob3cgZXhwcmVzc2lvbiB0eXBlIGlmIG1vdXNlIHN0b3BwZWQgc29tZXdoZXJlXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQobGlzdGVuKFxuICAgICAgZWRpdG9yRWxlbWVudC5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLXZpZXcnKSwgJ21vdXNlbW92ZScsXG4gICAgICBlID0+IHtcbiAgICAgICAgYnVmZmVyUHQgPSBidWZmZXJQb3NpdGlvbkZyb21Nb3VzZUV2ZW50KHRoaXMuZWRpdG9yLCBlIGFzIE1vdXNlRXZlbnQpXG5cbiAgICAgICAgaWYgKGJ1ZmZlclB0ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ICE9IG51bGwgPyB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0LmlzRXF1YWwoXG4gICAgICAgICAgICBidWZmZXJQdCkgOiB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ID0gYnVmZmVyUHRcblxuICAgICAgICBpZiAodGhpcy5leHByVHlwZVRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV4cHJUeXBlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gYnVmZmVyUHQgJiYgdGhpcy5zaG91bGRTaG93VG9vbHRpcChidWZmZXJQdCksXG4gICAgICAgICAgYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5leHByZXNzaW9uVHlwZUludGVydmFsJykpXG4gICAgICB9XG4gICAgKSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChsaXN0ZW4oXG4gICAgICBlZGl0b3JFbGVtZW50LnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtdmlldycpLCAnbW91c2VvdXQnLFxuICAgICAgZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmV4cHJUeXBlVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVkaXRvci5vbkRpZENoYW5nZVNlbGVjdGlvblJhbmdlKCh7bmV3QnVmZmVyUmFuZ2V9OiB7bmV3QnVmZmVyUmFuZ2U6IFJhbmdlfSkgPT4ge1xuICAgICAgY29uc3QgdG9vbHRpcEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZGUtaGFza2VsbC10b29sdGlwJylcbiAgICAgIGlmICh0b29sdGlwRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzbGNsID0gZWRpdG9yRWxlbWVudC5waXhlbFJlY3RGb3JTY3JlZW5SYW5nZSh0aGlzLmVkaXRvci5zY3JlZW5SYW5nZUZvckJ1ZmZlclJhbmdlKG5ld0J1ZmZlclJhbmdlKSlcbiAgICAgICAgY29uc3QgZWVjbCA9IGVkaXRvckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC12aWV3JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgdHRjbCA9IHRvb2x0aXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHR0Y2xkID0gdG9vbHRpcEVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JykhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHR0Ym94ID0ge1xuICAgICAgICAgIGxlZnQ6IHR0Y2wubGVmdCAtIGVlY2wubGVmdCxcbiAgICAgICAgICB0b3A6IHR0Y2xkLnRvcCAtIGVlY2wudG9wLFxuICAgICAgICAgIHdpZHRoOiB0dGNsLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdHRjbGQuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeG1heCA9IE1hdGgucm91bmQoTWF0aC5tYXgodHRib3gubGVmdCwgc2xjbC5sZWZ0KSlcbiAgICAgICAgY29uc3QgeG1pbiA9IE1hdGgucm91bmQoTWF0aC5taW4odHRib3gubGVmdCArIHR0Ym94LndpZHRoLCBzbGNsLmxlZnQgK1xuICAgICAgICAgIHNsY2wud2lkdGgpKVxuICAgICAgICBjb25zdCB5bWF4ID0gTWF0aC5yb3VuZChNYXRoLm1heCh0dGJveC50b3AsIHNsY2wudG9wKSlcbiAgICAgICAgY29uc3QgeW1pbiA9IE1hdGgucm91bmQoTWF0aC5taW4odHRib3gudG9wICsgdHRib3guaGVpZ2h0LCBzbGNsLnRvcCArXG4gICAgICAgICAgc2xjbC5oZWlnaHQpKVxuICAgICAgICBjb25zdCB0dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lkZS1oYXNrZWxsLXRvb2x0aXAnKSBhcyBIVE1MRWxlbWVudFxuICAgICAgICBpZiAodHQpIHtcbiAgICAgICAgICBpZiAoKHltYXggPD0geW1pbikgJiYgKHhtYXggPD0geG1pbikpIHtcbiAgICAgICAgICAgIHR0LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAnb3BhY2l0eScsICcwLjMnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0dC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ29wYWNpdHknKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zZWxUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VsVGltZW91dClcbiAgICAgIH1cbiAgICAgIGlmIChuZXdCdWZmZXJSYW5nZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgICAgZXZlbnRUeXBlOiAnc2VsZWN0aW9uJ1xuICAgICAgICB9KVxuICAgICAgICBzd2l0Y2ggKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25DdXJzb3JNb3ZlJykpIHtcbiAgICAgICAgICBjYXNlICdTaG93IFRvb2x0aXAnOlxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwclR5cGVUaW1lb3V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dDaGVja1Jlc3VsdChuZXdCdWZmZXJSYW5nZS5zdGFydCwgZmFsc2UsXG4gICAgICAgICAgICAgICAgJ2tleWJvYXJkJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICAgICAgICAgIHBlcnNpc3RPbkN1cnNvck1vdmU6IGZhbHNlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ0hpZGUgVG9vbHRpcCc6XG4gICAgICAgICAgICBpZiAodGhpcy5leHByVHlwZVRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgICAgICAgIHBlcnNpc3RPbkN1cnNvck1vdmU6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2hvdWxkU2hvd1Rvb2x0aXAoXG4gICAgICAgICAgICBuZXdCdWZmZXJSYW5nZS5zdGFydCwgJ3NlbGVjdGlvbicpLFxuICAgICAgICAgIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuZXhwcmVzc2lvblR5cGVJbnRlcnZhbCcpKVxuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsVGltZW91dCAhPSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5zZWxUaW1lb3V0KVxuICAgIH1cbiAgICB0aGlzLmhpZGVUb29sdGlwKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUHQgPSBudWxsXG4gIH1cblxuICB1cGRhdGVSZXN1bHRzIChyZXM6IFJlc3VsdEl0ZW1bXSwgdHlwZXM/OiBUU2V2ZXJpdHlbXSkge1xuICAgIGxldCBtXG4gICAgaWYgKHR5cGVzICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IHQgb2YgQXJyYXkuZnJvbSh0eXBlcykpIHtcbiAgICAgICAgZm9yIChtIG9mIEFycmF5LmZyb20odGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICAgIHNldmVyaXR5OiB0LFxuICAgICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IuaWRcbiAgICAgICAgfSkpKSB7XG4gICAgICAgICAgbS5kZXN0cm95KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKG0gb2YgQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5maW5kTWFya2Vycyh7XG4gICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkXG4gICAgICB9KSkpIHtcbiAgICAgICAgbS5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocmVzKS5tYXAoKHIpID0+IHRoaXMubWFya2VyRnJvbUNoZWNrUmVzdWx0KHIpKVxuICB9XG5cbiAgbWFya2VyRnJvbUNoZWNrUmVzdWx0IChyZXNJdGVtOiBSZXN1bHRJdGVtKSB7XG4gICAgbGV0IHtcbiAgICAgIHVyaSwgc2V2ZXJpdHksIG1lc3NhZ2UsIHBvc2l0aW9uXG4gICAgfSA9IHJlc0l0ZW1cbiAgICBpZiAoKHVyaSA9PSBudWxsKSB8fCAodXJpICE9PSB0aGlzLmVkaXRvci5nZXRQYXRoKCkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFwb3NpdGlvbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgbmV3IG1hcmtlclxuICAgIGxldCByYW5nZSA9IG5ldyBSYW5nZShwb3NpdGlvbiwgUG9pbnQuZnJvbU9iamVjdCh7XG4gICAgICByb3c6IHBvc2l0aW9uLnJvdyxcbiAgICAgIGNvbHVtbjogcG9zaXRpb24uY29sdW1uICsgMVxuICAgIH0pKVxuICAgIGxldCBtYXJrZXIgPSB0aGlzLmVkaXRvci5tYXJrQnVmZmVyUmFuZ2UocmFuZ2UsIHtcbiAgICAgIGludmFsaWRhdGU6ICd0b3VjaCdcbiAgICB9KVxuICAgIG1hcmtlci5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgc2V2ZXJpdHksXG4gICAgICBkZXNjOiBtZXNzYWdlLFxuICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZFxuICAgIH0pXG4gICAgbGV0IHtcbiAgICAgIENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgICB9ID0gcmVxdWlyZSgnYXRvbScpXG4gICAgbGV0IGRpc3AgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgZGlzcC5hZGQobWFya2VyLm9uRGlkQ2hhbmdlKCh7aXNWYWxpZH06IERpc3BsYXlNYXJrZXIpID0+IHtcbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICByZXNJdGVtLmRlc3Ryb3koKVxuICAgICAgICByZXR1cm4gbWFya2VyLmRlc3Ryb3koKVxuICAgICAgfVxuICAgIH0pKVxuICAgIGRpc3AuYWRkKG1hcmtlci5vbkRpZERlc3Ryb3koKCkgPT4gZGlzcC5kaXNwb3NlKCkpKVxuXG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhdGVNYXJrZXIobWFya2VyKVxuICB9XG5cbiAgZGVjb3JhdGVNYXJrZXIgKG06IERpc3BsYXlNYXJrZXIpIHtcbiAgICBpZiAodGhpcy5ndXR0ZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBjbHMgPSBgaWRlLWhhc2tlbGwtJHsobS5nZXRQcm9wZXJ0aWVzKCkgYXMgYW55KS5zZXZlcml0eX1gXG4gICAgdGhpcy5ndXR0ZXIuZGVjb3JhdGVNYXJrZXIobSwge1xuICAgICAgdHlwZTogJ2xpbmUtbnVtYmVyJyxcbiAgICAgIGNsYXNzOiBjbHNcbiAgICB9KVxuICAgIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKG0sIHtcbiAgICAgIHR5cGU6ICdoaWdobGlnaHQnLFxuICAgICAgY2xhc3M6IGNsc1xuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKG0sIHtcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIGNsYXNzOiBjbHNcbiAgICB9KVxuICB9XG5cbiAgb25TaG91bGRTaG93VG9vbHRpcCAoY2FsbGJhY2s6IChhcmdzOiB7ZWRpdG9yOiBUZXh0RWRpdG9yLCBwb3M6IFBvaW50LCBldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZX0pID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdzaG91bGQtc2hvdy10b29sdGlwJywgY2FsbGJhY2spXG4gIH1cblxuICBvbldpbGxTYXZlQnVmZmVyIChjYWxsYmFjazogVFRleHRCdWZmZXJDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ3dpbGwtc2F2ZS1idWZmZXInLCBjYWxsYmFjaylcbiAgfVxuXG4gIG9uRGlkU2F2ZUJ1ZmZlciAoY2FsbGJhY2s6IFRUZXh0QnVmZmVyQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtc2F2ZS1idWZmZXInLCBjYWxsYmFjaylcbiAgfVxuXG4gIG9uRGlkU3RvcENoYW5naW5nIChjYWxsYmFjazogKGVkaXRvcjogVGV4dEVkaXRvcikgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1zdG9wLWNoYW5naW5nJywgY2FsbGJhY2spXG4gIH1cblxuICBzaG91bGRTaG93VG9vbHRpcCAocG9zOiBQb2ludCwgZXZlbnRUeXBlPzogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgaWYgKGV2ZW50VHlwZSA9PSBudWxsKSB7XG4gICAgICBldmVudFR5cGUgPSAnbW91c2UnXG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dDaGVja1Jlc3VsdChwb3MsIGZhbHNlLCBldmVudFR5cGUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoKHBvcy5yb3cgPCAwKSB8fFxuICAgICAgKHBvcy5yb3cgPj0gdGhpcy5lZGl0b3IuZ2V0TGluZUNvdW50KCkpIHx8XG4gICAgICBwb3MuaXNFcXVhbCh0aGlzLmVkaXRvci5idWZmZXJSYW5nZUZvckJ1ZmZlclJvdyhwb3Mucm93KS5lbmQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgIGV2ZW50VHlwZVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMucmFuZ2VIYXNDaGFuZ2VkKHBvcywgZXZlbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlci5lbWl0KCdzaG91bGQtc2hvdy10b29sdGlwJywge1xuICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLFxuICAgICAgICBwb3MsXG4gICAgICAgIGV2ZW50VHlwZVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByYW5nZUhhc0NoYW5nZWQgKHBvczogUG9pbnQsIGV2ZW50VHlwZTogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgbGV0IG5ld3JhbmdlID0gdGhpcy5nZXRFdmVudFJhbmdlKHBvcywgZXZlbnRUeXBlKS5jcmFuZ2VcbiAgICBsZXQgaXNGaXJzdEl0ZXJhdGlvbiA9ICEodGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QgJiYgdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3QpXG4gICAgbGV0IGlzU2FtZVRva2VuID0gKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QgJiYgdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3QpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICBsZXQgcmFuZ2VzQXJlRW1wdHkgPSB0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdC5pc0VtcHR5KCkgJiYgbmV3cmFuZ2UuaXNFbXB0eSgpXG4gICAgICBsZXQgaXNTYW1lUm93ID0gdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3Qucm93ID09PSBwb3Mucm93XG4gICAgICBpZiAoIXJhbmdlc0FyZUVtcHR5IHx8ICFpc1NhbWVSb3cpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBsZXQgdGwgPSAodGhpcy5lZGl0b3IgYXMgYW55KS50b2tlbml6ZWRCdWZmZXIudG9rZW5pemVkTGluZUZvclJvdyh0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0VGVzdC5yb3cpXG4gICAgICBsZXQgb2xkdG9raWQgPSB0bC50b2tlbkluZGV4QXRCdWZmZXJDb2x1bW4odGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3RcbiAgICAgICAgLmNvbHVtbilcbiAgICAgIGxldCBuZXd0b2tpZCA9IHRsLnRva2VuSW5kZXhBdEJ1ZmZlckNvbHVtbihwb3MuY29sdW1uKVxuICAgICAgcmV0dXJuIG9sZHRva2lkID09PSBuZXd0b2tpZFxuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBpc0ZpcnN0SXRlcmF0aW9uIHx8ICEodGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QhLmlzRXF1YWwobmV3cmFuZ2UpIHx8IGlzU2FtZVRva2VuKCkpXG4gICAgdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3QgPSBwb3NcbiAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdCA9IG5ld3JhbmdlXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgc2hvd1Rvb2x0aXAgKHBvczogUG9pbnQsIHJhbmdlOiBSYW5nZSwgdGV4dDogVE1lc3NhZ2UgfCBUTWVzc2FnZVtdLCBkZXRhaWw6IHtldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZSwgcGVyc2lzdE9uQ3Vyc29yTW92ZT86IGJvb2xlYW4sIHN1YnR5cGU6IHN0cmluZ30pIHtcbiAgICBpZiAodGhpcy5lZGl0b3IgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCFkZXRhaWwuZXZlbnRUeXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2ZW50VHlwZSBub3Qgc2V0JylcbiAgICB9XG4gICAgaWYgKGRldGFpbC5wZXJzaXN0T25DdXJzb3JNb3ZlID09IG51bGwpIHtcbiAgICAgIGRldGFpbC5wZXJzaXN0T25DdXJzb3JNb3ZlID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy50b29sdGlwSGlnaGxpZ2h0UmFuZ2UgJiYgcmFuZ2UuaXNFcXVhbCh0aGlzLnRvb2x0aXBIaWdobGlnaHRSYW5nZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmhpZGVUb29sdGlwKClcbiAgICAgIC8vIGV4aXQgaWYgbW91c2UgbW92ZWQgYXdheVxuICAgIGlmIChkZXRhaWwuZXZlbnRUeXBlID09PSAnbW91c2UnKSB7XG4gICAgICBpZiAodGhpcy5sYXN0TW91c2VCdWZmZXJQdCAmJiAhcmFuZ2UuY29udGFpbnNQb2ludCh0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0KSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRldGFpbC5ldmVudFR5cGUgPT09ICdzZWxlY3Rpb24nKSB7XG4gICAgICBsZXQgbGFzdFNlbCA9IHRoaXMuZWRpdG9yLmdldExhc3RTZWxlY3Rpb24oKVxuICAgICAgaWYgKCFyYW5nZS5jb250YWluc1JhbmdlKGxhc3RTZWwuZ2V0QnVmZmVyUmFuZ2UoKSkgfHwgISFsYXN0U2VsLmlzRW1wdHkoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50b29sdGlwSGlnaGxpZ2h0UmFuZ2UgPSByYW5nZVxuICAgIGNvbnN0IHByb3BzID0gey4uLmRldGFpbCwgdHlwZTogJ3Rvb2x0aXAnfVxuICAgIGxldCBoaWdobGlnaHRNYXJrZXIgPSB0aGlzLmVkaXRvci5tYXJrQnVmZmVyUmFuZ2UocmFuZ2UpXG4gICAgaGlnaGxpZ2h0TWFya2VyLnNldFByb3BlcnRpZXMoZGV0YWlsKVxuICAgIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKGhpZ2hsaWdodE1hcmtlciwge1xuICAgICAgdHlwZTogJ292ZXJsYXknLFxuICAgICAgcG9zaXRpb246ICd0YWlsJyxcbiAgICAgIGl0ZW06IG5ldyBUb29sdGlwTWVzc2FnZSh0ZXh0KVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKGhpZ2hsaWdodE1hcmtlciwge1xuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjbGFzczogJ2lkZS1oYXNrZWxsLXR5cGUnXG4gICAgfSlcbiAgfVxuXG4gIGhpZGVUb29sdGlwICh0ZW1wbGF0ZT86IGFueSkge1xuICAgIGlmICh0ZW1wbGF0ZSA9PSBudWxsKSB7XG4gICAgICB0ZW1wbGF0ZSA9IHt9XG4gICAgfVxuICAgIHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlID0gbnVsbFxuICAgIHRlbXBsYXRlLnR5cGUgPSAndG9vbHRpcCdcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5maW5kTWFya2Vycyh0ZW1wbGF0ZSkpLm1hcCgobSkgPT4gbS5kZXN0cm95KCkpXG4gIH1cblxuICBnZXRFdmVudFJhbmdlIChwb3M6IFBvaW50IHwgbnVsbCwgZXZlbnRUeXBlOiBURXZlbnRSYW5nZVR5cGUpIHtcbiAgICBsZXQgY3JhbmdlOiBSYW5nZVxuICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICBjYXNlICdtb3VzZSc6XG4gICAgICBjYXNlICdjb250ZXh0JzpcbiAgICAgICAgaWYgKHBvcyA9PSBudWxsKSB7XG4gICAgICAgICAgcG9zID0gdGhpcy5sYXN0TW91c2VCdWZmZXJQdFxuICAgICAgICB9XG4gICAgICAgIGxldCBbc2VsUmFuZ2VdID0gQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5nZXRTZWxlY3Rpb25zKClcbiAgICAgICAgICAubWFwKHNlbCA9PiBzZWwuZ2V0QnVmZmVyUmFuZ2UoKSkuZmlsdGVyKHNlbCA9PiBzZWwuY29udGFpbnNQb2ludChcbiAgICAgICAgICAgIHBvcykpKVxuICAgICAgICBjcmFuZ2UgPSBzZWxSYW5nZSAhPSBudWxsID8gc2VsUmFuZ2UgOiBuZXcgUmFuZ2UocG9zISwgcG9zISlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2tleWJvYXJkJzpcbiAgICAgIGNhc2UgJ3NlbGVjdGlvbic6XG4gICAgICAgIGNyYW5nZSA9IHRoaXMuZWRpdG9yLmdldExhc3RTZWxlY3Rpb24oKS5nZXRCdWZmZXJSYW5nZSgpXG4gICAgICAgIHBvcyA9IGNyYW5nZS5zdGFydFxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGV2ZW50IHR5cGUgJHtldmVudFR5cGV9YClcbiAgICB9XG5cbiAgICBjb25zdCBwcG9zID0gcG9zIVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNyYW5nZSwgcG9zOiBwcG9zLCBldmVudFR5cGVcbiAgICB9XG4gIH1cblxuICBmaW5kQ2hlY2tSZXN1bHRNYXJrZXJzIChwb3M6IFBvaW50LCBndXR0ZXI6IGJvb2xlYW4sIGV2ZW50VHlwZTogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgaWYgKGd1dHRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgdHlwZTogJ2NoZWNrLXJlc3VsdCcsXG4gICAgICAgIHN0YXJ0QnVmZmVyUm93OiBwb3Mucm93LFxuICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50VHlwZSkge1xuICAgICAgICBjYXNlICdrZXlib2FyZCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZCxcbiAgICAgICAgICAgIGNvbnRhaW5zUmFuZ2U6IG5ldyBSYW5nZShwb3MsIHBvcy50cmFuc2xhdGUoWzAsIDFdKSlcbiAgICAgICAgICB9KVxuICAgICAgICBjYXNlICdtb3VzZSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZCxcbiAgICAgICAgICAgIGNvbnRhaW5zUG9pbnQ6IHBvc1xuICAgICAgICAgIH0pXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gc2hvdyBjaGVjayByZXN1bHQgd2hlbiBtb3VzZSBvdmVyIGd1dHRlciBpY29uXG4gIHNob3dDaGVja1Jlc3VsdCAocG9zOiBQb2ludCwgZ3V0dGVyOiBib29sZWFuLCBldmVudFR5cGU/OiBURXZlbnRSYW5nZVR5cGUpIHtcbiAgICBpZiAoZXZlbnRUeXBlID09IG51bGwpIHtcbiAgICAgIGV2ZW50VHlwZSA9ICdtb3VzZSdcbiAgICB9XG4gICAgbGV0IG1hcmtlcnMgPSB0aGlzLmZpbmRDaGVja1Jlc3VsdE1hcmtlcnMocG9zLCBndXR0ZXIsIGV2ZW50VHlwZSlcbiAgICBsZXQgW21hcmtlcl0gPSBBcnJheS5mcm9tKG1hcmtlcnMpXG5cbiAgICBpZiAobWFya2VyID09IG51bGwpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGxldCB0ZXh0ID1cbiAgICAgIG1hcmtlcnMubWFwKG1hcmtlciA9PiBtYXJrZXIuZ2V0UHJvcGVydGllcygpLmRlc2MpXG5cbiAgICBpZiAoZ3V0dGVyKSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbmV3IFJhbmdlKHBvcywgcG9zKSwgdGV4dCwge1xuICAgICAgICBldmVudFR5cGUsIHN1YnR5cGU6ICdjaGVjay1yZXN1bHQnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbWFya2VyLmdldEJ1ZmZlclJhbmdlKCksIHRleHQsIHtcbiAgICAgICAgZXZlbnRUeXBlLCBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaGFzVG9vbHRpcHMgKHRlbXBsYXRlPzogT2JqZWN0KSB7XG4gICAgaWYgKHRlbXBsYXRlID09IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlID0ge31cbiAgICB9XG4gICAgdGVtcGxhdGVbJ3R5cGUnXSA9ICd0b29sdGlwJ1xuICAgIHJldHVybiAhIXRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHRlbXBsYXRlKS5sZW5ndGhcbiAgfVxufVxuIl19