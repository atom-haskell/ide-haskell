'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
class EditorControl {
    constructor(editor) {
        let bufferPt;
        this.updateResults = this.updateResults.bind(this);
        this.editor = editor;
        let SubAtom = require('sub-atom');
        this.disposables = new SubAtom();
        this.disposables.add(this.emitter = new atom_1.Emitter());
        let editorElement = atom.views.getView(this.editor);
        let { bufferPositionFromMouseEvent } = require('./utils');
        if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
            this.gutter = this.editor.gutterWithName('ide-haskell-check-results');
            if (this.gutter == null) {
                this.gutter = this.editor.addGutter({
                    name: 'ide-haskell-check-results',
                    priority: 10
                });
            }
            let gutterElement = atom.views.getView(this.gutter);
            this.disposables.add(gutterElement, 'mouseenter', '.decoration', e => {
                bufferPt = bufferPositionFromMouseEvent(this.editor, e);
                if (bufferPt != null) {
                    this.lastMouseBufferPt = bufferPt;
                    return this.showCheckResult(bufferPt, true);
                }
            });
            this.disposables.add(gutterElement, 'mouseleave', '.decoration', e => {
                return this.hideTooltip();
            });
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
        this.disposables.add(editorElement.rootElement, 'mousemove', '.scroll-view', e => {
            bufferPt = bufferPositionFromMouseEvent(this.editor, e);
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
            this.exprTypeTimeout = setTimeout(() => this.shouldShowTooltip(bufferPt), atom.config.get('ide-haskell.expressionTypeInterval'));
        });
        this.disposables.add(editorElement.rootElement, 'mouseout', '.scroll-view', e => {
            if (this.exprTypeTimeout != null) {
                return clearTimeout(this.exprTypeTimeout);
            }
        });
        this.disposables.add(this.editor.onDidChangeSelectionRange(({ newBufferRange }) => {
            let slcl = editorElement.pixelRectForScreenRange(this.editor.screenRangeForBufferRange(newBufferRange));
            let eecl = editorElement.querySelector('.scroll-view').getBoundingClientRect();
            let ttcl = __guardMethod__(document.querySelector('ide-haskell-tooltip'), 'getBoundingClientRect', o => o.getBoundingClientRect());
            if (ttcl != null) {
                let ttcld = document.querySelector('ide-haskell-tooltip div').getBoundingClientRect();
                let ttbox = {
                    left: ttcl.left - eecl.left,
                    top: ttcld.top - eecl.top,
                    width: ttcl.width,
                    height: ttcld.height
                };
                let xmax = Math.round(Math.max(ttbox.left, slcl.left));
                let xmin = Math.round(Math.min(ttbox.left + ttbox.width, slcl.left +
                    slcl.width));
                let ymax = Math.round(Math.max(ttbox.top, slcl.top));
                let ymin = Math.round(Math.min(ttbox.top + ttbox.height, slcl.top +
                    slcl.height));
                if ((ymax <= ymin) && (xmax <= xmin)) {
                    document.querySelector('ide-haskell-tooltip').style.setProperty('opacity', '0.3');
                }
                else {
                    document.querySelector('ide-haskell-tooltip').style.removeProperty('opacity');
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
        this.disposables = null;
        this.editor = null;
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
        if ((uri == null) || (uri !== this.editor.getURI())) {
            return;
        }
        let range = new atom_1.Range(position, {
            row: position.row,
            column: position.column + 1
        });
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
        disp.add(marker.onDidChange(function ({ isValid }) {
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
        let isFirstIteration = !((this.lastMouseBufferPtTest != null) && (this.lastMouseBufferRangeTest !=
            null));
        let rangesAreEmpty = () => this.lastMouseBufferRangeTest.isEmpty() &&
            newrange.isEmpty();
        let isSameRow = () => this.lastMouseBufferPtTest.row === pos.row;
        let isSameToken = () => {
            if (!rangesAreEmpty() || !isSameRow()) {
                return false;
            }
            let tl = this.editor.tokenizedBuffer.tokenizedLineForRow(this.lastMouseBufferPtTest
                .row);
            let oldtokid = tl.tokenIndexAtBufferColumn(this.lastMouseBufferPtTest
                .column);
            let newtokid = tl.tokenIndexAtBufferColumn(pos.column);
            return oldtokid === newtokid;
        };
        let result = isFirstIteration || !(this.lastMouseBufferRangeTest.isEqual(newrange) ||
            isSameToken());
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
        if (range.isEqual(this.tooltipHighlightRange)) {
            return;
        }
        this.hideTooltip();
        if (detail.eventType === 'mouse') {
            if (!range.containsPoint(this.lastMouseBufferPt)) {
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
        detail.type = 'tooltip';
        let highlightMarker = this.editor.markBufferRange(range);
        highlightMarker.setProperties(detail);
        let { TooltipMessage } = require('./views/tooltip-view');
        this.editor.decorateMarker(highlightMarker, {
            type: 'overlay',
            position: 'tail',
            item: new TooltipMessage(text)
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
                crange = selRange != null ? selRange : atom_1.Range.fromPointWithDelta(pos, 0, 0);
                break;
            case 'keyboard':
            case 'selection':
                crange = this.editor.getLastSelection().getBufferRange();
                pos = crange.start;
                break;
            default:
                throw new Error(`unknown event type ${eventType}`);
        }
        return {
            crange, pos, eventType
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
                        containsRange: atom_1.Range.fromPointWithDelta(pos, 0, 1)
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
        template.type = 'tooltip';
        return !!this.editor.findMarkers(template).length;
    }
}
exports.EditorControl = EditorControl;
function __guardMethod__(obj, methodName, transform) {
    if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] ===
        'function') {
        return transform(obj, methodName);
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZWRpdG9yLWNvbnRyb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOztBQUVYLCtCQUVhO0FBRWI7SUFDRSxZQUFhLE1BQU07UUFDakIsSUFBSSxRQUFRLENBQUE7UUFDWixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3BCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDLENBQUE7UUFFbEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRW5ELElBQUksRUFDRiw0QkFBNEIsRUFDN0IsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtZQUNyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ2xDLElBQUksRUFBRSwyQkFB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QUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELFdBQVcsQ0FBRSxRQUFRO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDZixDQUFDO1FBQ0QsUUFBUSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUE7UUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUE7SUFDbkQsQ0FBQztDQUNGO0FBdmRELHNDQXVkQztBQUVELHlCQUEwQixHQUFHLEVBQUUsVUFBVSxFQUFFLFNBQVM7SUFDbEQsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ3RFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsU0FBUyxDQUFBO0lBQ2xCLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuaW1wb3J0IHtcbiAgUmFuZ2UsIEVtaXR0ZXJcbn0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGNsYXNzIEVkaXRvckNvbnRyb2wge1xuICBjb25zdHJ1Y3RvciAoZWRpdG9yKSB7XG4gICAgbGV0IGJ1ZmZlclB0XG4gICAgdGhpcy51cGRhdGVSZXN1bHRzID0gdGhpcy51cGRhdGVSZXN1bHRzLmJpbmQodGhpcylcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIGxldCBTdWJBdG9tID0gcmVxdWlyZSgnc3ViLWF0b20nKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgU3ViQXRvbSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKSlcblxuICAgIGxldCBlZGl0b3JFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KHRoaXMuZWRpdG9yKVxuXG4gICAgbGV0IHtcbiAgICAgIGJ1ZmZlclBvc2l0aW9uRnJvbU1vdXNlRXZlbnRcbiAgICB9ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5tZXNzYWdlRGlzcGxheUZyb250ZW5kJykgPT09ICdidWlsdGluJykge1xuICAgICAgdGhpcy5ndXR0ZXIgPSB0aGlzLmVkaXRvci5ndXR0ZXJXaXRoTmFtZSgnaWRlLWhhc2tlbGwtY2hlY2stcmVzdWx0cycpXG4gICAgICBpZiAodGhpcy5ndXR0ZXIgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmd1dHRlciA9IHRoaXMuZWRpdG9yLmFkZEd1dHRlcih7XG4gICAgICAgICAgbmFtZTogJ2lkZS1oYXNrZWxsLWNoZWNrLXJlc3VsdHMnLFxuICAgICAgICAgIHByaW9yaXR5OiAxMFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBsZXQgZ3V0dGVyRWxlbWVudCA9IGF0b20udmlld3MuZ2V0Vmlldyh0aGlzLmd1dHRlcilcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGd1dHRlckVsZW1lbnQsICdtb3VzZWVudGVyJywgJy5kZWNvcmF0aW9uJywgZSA9PiB7XG4gICAgICAgIGJ1ZmZlclB0ID0gYnVmZmVyUG9zaXRpb25Gcm9tTW91c2VFdmVudCh0aGlzLmVkaXRvciwgZSlcbiAgICAgICAgaWYgKGJ1ZmZlclB0ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ID0gYnVmZmVyUHRcbiAgICAgICAgICByZXR1cm4gdGhpcy5zaG93Q2hlY2tSZXN1bHQoYnVmZmVyUHQsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChndXR0ZXJFbGVtZW50LCAnbW91c2VsZWF2ZScsICcuZGVjb3JhdGlvbicsIGUgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIGJ1ZmZlciBldmVudHMgZm9yIGF1dG9tYXRpYyBjaGVja1xuICAgIGxldCBidWZmZXIgPSB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGJ1ZmZlci5vbldpbGxTYXZlKCgpID0+IHtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCd3aWxsLXNhdmUtYnVmZmVyJywgYnVmZmVyKVxuICAgICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknKSkge1xuICAgICAgICByZXR1cm4gYXRvbS5jb21tYW5kcy5kaXNwYXRjaChlZGl0b3JFbGVtZW50LFxuICAgICAgICAgICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJylcbiAgICAgIH1cbiAgICB9KSlcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGJ1ZmZlci5vbkRpZFNhdmUoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtc2F2ZS1idWZmZXInLCBidWZmZXIpXG4gICAgfSkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVkaXRvci5vbkRpZFN0b3BDaGFuZ2luZygoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1zdG9wLWNoYW5naW5nJywgdGhpcy5lZGl0b3IpXG4gICAgfSkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChlZGl0b3JFbGVtZW50Lm9uRGlkQ2hhbmdlU2Nyb2xsTGVmdCgoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgIGV2ZW50VHlwZTogJ21vdXNlJ1xuICAgICAgfSlcbiAgICB9KSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChlZGl0b3JFbGVtZW50Lm9uRGlkQ2hhbmdlU2Nyb2xsVG9wKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhpZGVUb29sdGlwKHtcbiAgICAgICAgZXZlbnRUeXBlOiAnbW91c2UnXG4gICAgICB9KVxuICAgIH0pKVxuXG4gICAgLy8gc2hvdyBleHByZXNzaW9uIHR5cGUgaWYgbW91c2Ugc3RvcHBlZCBzb21ld2hlcmVcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChlZGl0b3JFbGVtZW50LnJvb3RFbGVtZW50LCAnbW91c2Vtb3ZlJyxcbiAgICAgICcuc2Nyb2xsLXZpZXcnLCBlID0+IHtcbiAgICAgICAgYnVmZmVyUHQgPSBidWZmZXJQb3NpdGlvbkZyb21Nb3VzZUV2ZW50KHRoaXMuZWRpdG9yLCBlKVxuXG4gICAgICAgIGlmIChidWZmZXJQdCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXN0TW91c2VCdWZmZXJQdCAhPSBudWxsID8gdGhpcy5sYXN0TW91c2VCdWZmZXJQdC5pc0VxdWFsKFxuICAgICAgICAgICAgYnVmZmVyUHQpIDogdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0TW91c2VCdWZmZXJQdCA9IGJ1ZmZlclB0XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leHByVHlwZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2hvdWxkU2hvd1Rvb2x0aXAoXG4gICAgICAgICAgICBidWZmZXJQdCksXG4gICAgICAgICAgYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5leHByZXNzaW9uVHlwZUludGVydmFsJykpXG4gICAgICB9XG4gICAgKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGVkaXRvckVsZW1lbnQucm9vdEVsZW1lbnQsICdtb3VzZW91dCcsXG4gICAgICAnLnNjcm9sbC12aWV3JywgZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmV4cHJUeXBlVGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZWRpdG9yLm9uRGlkQ2hhbmdlU2VsZWN0aW9uUmFuZ2UoKHtcbiAgICAgIG5ld0J1ZmZlclJhbmdlXG4gICAgfSkgPT4ge1xuICAgICAgbGV0IHNsY2wgPSBlZGl0b3JFbGVtZW50LnBpeGVsUmVjdEZvclNjcmVlblJhbmdlKHRoaXMuZWRpdG9yLnNjcmVlblJhbmdlRm9yQnVmZmVyUmFuZ2UoXG4gICAgICAgIG5ld0J1ZmZlclJhbmdlKSlcbiAgICAgIGxldCBlZWNsID0gZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLXZpZXcnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgbGV0IHR0Y2wgPSBfX2d1YXJkTWV0aG9kX18oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJ2lkZS1oYXNrZWxsLXRvb2x0aXAnKSwgJ2dldEJvdW5kaW5nQ2xpZW50UmVjdCcsIG8gPT4gby5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSlcbiAgICAgIGlmICh0dGNsICE9IG51bGwpIHtcbiAgICAgICAgbGV0IHR0Y2xkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaWRlLWhhc2tlbGwtdG9vbHRpcCBkaXYnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgdHRib3ggPSB7XG4gICAgICAgICAgbGVmdDogdHRjbC5sZWZ0IC0gZWVjbC5sZWZ0LFxuICAgICAgICAgIHRvcDogdHRjbGQudG9wIC0gZWVjbC50b3AsXG4gICAgICAgICAgd2lkdGg6IHR0Y2wud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB0dGNsZC5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICBsZXQgeG1heCA9IE1hdGgucm91bmQoTWF0aC5tYXgodHRib3gubGVmdCwgc2xjbC5sZWZ0KSlcbiAgICAgICAgbGV0IHhtaW4gPSBNYXRoLnJvdW5kKE1hdGgubWluKHR0Ym94LmxlZnQgKyB0dGJveC53aWR0aCwgc2xjbC5sZWZ0ICtcbiAgICAgICAgICBzbGNsLndpZHRoKSlcbiAgICAgICAgbGV0IHltYXggPSBNYXRoLnJvdW5kKE1hdGgubWF4KHR0Ym94LnRvcCwgc2xjbC50b3ApKVxuICAgICAgICBsZXQgeW1pbiA9IE1hdGgucm91bmQoTWF0aC5taW4odHRib3gudG9wICsgdHRib3guaGVpZ2h0LCBzbGNsLnRvcCArXG4gICAgICAgICAgc2xjbC5oZWlnaHQpKVxuICAgICAgICBpZiAoKHltYXggPD0geW1pbikgJiYgKHhtYXggPD0geG1pbikpIHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZGUtaGFza2VsbC10b29sdGlwJykuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAnb3BhY2l0eScsICcwLjMnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lkZS1oYXNrZWxsLXRvb2x0aXAnKS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcbiAgICAgICAgICAgICdvcGFjaXR5JylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zZWxUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VsVGltZW91dClcbiAgICAgIH1cbiAgICAgIGlmIChuZXdCdWZmZXJSYW5nZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgICAgZXZlbnRUeXBlOiAnc2VsZWN0aW9uJ1xuICAgICAgICB9KVxuICAgICAgICBzd2l0Y2ggKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25DdXJzb3JNb3ZlJykpIHtcbiAgICAgICAgICBjYXNlICdTaG93IFRvb2x0aXAnOlxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwclR5cGVUaW1lb3V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dDaGVja1Jlc3VsdChuZXdCdWZmZXJSYW5nZS5zdGFydCwgZmFsc2UsXG4gICAgICAgICAgICAgICAgJ2tleWJvYXJkJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICAgICAgICAgIHBlcnNpc3RPbkN1cnNvck1vdmU6IGZhbHNlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ0hpZGUgVG9vbHRpcCc6XG4gICAgICAgICAgICBpZiAodGhpcy5leHByVHlwZVRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgICAgICAgIHBlcnNpc3RPbkN1cnNvck1vdmU6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2hvdWxkU2hvd1Rvb2x0aXAoXG4gICAgICAgICAgICBuZXdCdWZmZXJSYW5nZS5zdGFydCwgJ3NlbGVjdGlvbicpLFxuICAgICAgICAgIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuZXhwcmVzc2lvblR5cGVJbnRlcnZhbCcpKVxuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsVGltZW91dCAhPSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5zZWxUaW1lb3V0KVxuICAgIH1cbiAgICB0aGlzLmhpZGVUb29sdGlwKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBudWxsXG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gICAgdGhpcy5sYXN0TW91c2VCdWZmZXJQdCA9IG51bGxcbiAgfVxuXG4gIHVwZGF0ZVJlc3VsdHMgKHJlcywgdHlwZXMpIHtcbiAgICBsZXQgbVxuICAgIGlmICh0eXBlcyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCB0IG9mIEFycmF5LmZyb20odHlwZXMpKSB7XG4gICAgICAgIGZvciAobSBvZiBBcnJheS5mcm9tKHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgICBzZXZlcml0eTogdCxcbiAgICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkXG4gICAgICAgIH0pKSkge1xuICAgICAgICAgIG0uZGVzdHJveSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChtIG9mIEFycmF5LmZyb20odGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZFxuICAgICAgfSkpKSB7XG4gICAgICAgIG0uZGVzdHJveSgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHJlcykubWFwKChyKSA9PiB0aGlzLm1hcmtlckZyb21DaGVja1Jlc3VsdChyKSlcbiAgfVxuXG4gIG1hcmtlckZyb21DaGVja1Jlc3VsdCAocmVzSXRlbSkge1xuICAgIGxldCB7XG4gICAgICB1cmksIHNldmVyaXR5LCBtZXNzYWdlLCBwb3NpdGlvblxuICAgIH0gPSByZXNJdGVtXG4gICAgaWYgKCh1cmkgPT0gbnVsbCkgfHwgKHVyaSAhPT0gdGhpcy5lZGl0b3IuZ2V0VVJJKCkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSBuZXcgbWFya2VyXG4gICAgbGV0IHJhbmdlID0gbmV3IFJhbmdlKHBvc2l0aW9uLCB7XG4gICAgICByb3c6IHBvc2l0aW9uLnJvdyxcbiAgICAgIGNvbHVtbjogcG9zaXRpb24uY29sdW1uICsgMVxuICAgIH0pXG4gICAgbGV0IG1hcmtlciA9IHRoaXMuZWRpdG9yLm1hcmtCdWZmZXJSYW5nZShyYW5nZSwge1xuICAgICAgaW52YWxpZGF0ZTogJ3RvdWNoJ1xuICAgIH0pXG4gICAgbWFya2VyLnNldFByb3BlcnRpZXMoe1xuICAgICAgdHlwZTogJ2NoZWNrLXJlc3VsdCcsXG4gICAgICBzZXZlcml0eSxcbiAgICAgIGRlc2M6IG1lc3NhZ2UsXG4gICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkXG4gICAgfSlcbiAgICBsZXQge1xuICAgICAgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIH0gPSByZXF1aXJlKCdhdG9tJylcbiAgICBsZXQgZGlzcCA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICBkaXNwLmFkZChtYXJrZXIub25EaWRDaGFuZ2UoZnVuY3Rpb24gKHtcbiAgICAgIGlzVmFsaWRcbiAgICB9KSB7XG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgcmVzSXRlbS5kZXN0cm95KClcbiAgICAgICAgcmV0dXJuIG1hcmtlci5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KSlcbiAgICBkaXNwLmFkZChtYXJrZXIub25EaWREZXN0cm95KCgpID0+IGRpc3AuZGlzcG9zZSgpKSlcblxuICAgIHJldHVybiB0aGlzLmRlY29yYXRlTWFya2VyKG1hcmtlcilcbiAgfVxuXG4gIGRlY29yYXRlTWFya2VyIChtKSB7XG4gICAgaWYgKHRoaXMuZ3V0dGVyID09IG51bGwpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgY2xzID0gYGlkZS1oYXNrZWxsLSR7bS5nZXRQcm9wZXJ0aWVzKCkuc2V2ZXJpdHl9YFxuICAgIHRoaXMuZ3V0dGVyLmRlY29yYXRlTWFya2VyKG0sIHtcbiAgICAgIHR5cGU6ICdsaW5lLW51bWJlcicsXG4gICAgICBjbGFzczogY2xzXG4gICAgfSlcbiAgICB0aGlzLmVkaXRvci5kZWNvcmF0ZU1hcmtlcihtLCB7XG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNsYXNzOiBjbHNcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmVkaXRvci5kZWNvcmF0ZU1hcmtlcihtLCB7XG4gICAgICB0eXBlOiAnbGluZScsXG4gICAgICBjbGFzczogY2xzXG4gICAgfSlcbiAgfVxuXG4gIG9uU2hvdWxkU2hvd1Rvb2x0aXAgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignc2hvdWxkLXNob3ctdG9vbHRpcCcsIGNhbGxiYWNrKVxuICB9XG5cbiAgb25XaWxsU2F2ZUJ1ZmZlciAoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCd3aWxsLXNhdmUtYnVmZmVyJywgY2FsbGJhY2spXG4gIH1cblxuICBvbkRpZFNhdmVCdWZmZXIgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXNhdmUtYnVmZmVyJywgY2FsbGJhY2spXG4gIH1cblxuICBvbkRpZFN0b3BDaGFuZ2luZyAoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtc3RvcC1jaGFuZ2luZycsIGNhbGxiYWNrKVxuICB9XG5cbiAgc2hvdWxkU2hvd1Rvb2x0aXAgKHBvcywgZXZlbnRUeXBlKSB7XG4gICAgaWYgKGV2ZW50VHlwZSA9PSBudWxsKSB7XG4gICAgICBldmVudFR5cGUgPSAnbW91c2UnXG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dDaGVja1Jlc3VsdChwb3MsIGZhbHNlLCBldmVudFR5cGUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoKHBvcy5yb3cgPCAwKSB8fFxuICAgICAgKHBvcy5yb3cgPj0gdGhpcy5lZGl0b3IuZ2V0TGluZUNvdW50KCkpIHx8XG4gICAgICBwb3MuaXNFcXVhbCh0aGlzLmVkaXRvci5idWZmZXJSYW5nZUZvckJ1ZmZlclJvdyhwb3Mucm93KS5lbmQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7XG4gICAgICAgIGV2ZW50VHlwZVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMucmFuZ2VIYXNDaGFuZ2VkKHBvcywgZXZlbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlci5lbWl0KCdzaG91bGQtc2hvdy10b29sdGlwJywge1xuICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLFxuICAgICAgICBwb3MsXG4gICAgICAgIGV2ZW50VHlwZVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByYW5nZUhhc0NoYW5nZWQgKHBvcywgZXZlbnRUeXBlKSB7XG4gICAgbGV0IG5ld3JhbmdlID0gdGhpcy5nZXRFdmVudFJhbmdlKHBvcywgZXZlbnRUeXBlKS5jcmFuZ2VcbiAgICBsZXQgaXNGaXJzdEl0ZXJhdGlvbiA9ICEoKHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0ICE9IG51bGwpICYmICh0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdCAhPVxuICAgICAgbnVsbCkpXG4gICAgbGV0IHJhbmdlc0FyZUVtcHR5ID0gKCkgPT4gdGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QuaXNFbXB0eSgpICYmXG4gICAgICBuZXdyYW5nZS5pc0VtcHR5KClcbiAgICBsZXQgaXNTYW1lUm93ID0gKCkgPT4gdGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3Qucm93ID09PSBwb3Mucm93XG4gICAgbGV0IGlzU2FtZVRva2VuID0gKCkgPT4ge1xuICAgICAgaWYgKCFyYW5nZXNBcmVFbXB0eSgpIHx8ICFpc1NhbWVSb3coKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGxldCB0bCA9IHRoaXMuZWRpdG9yLnRva2VuaXplZEJ1ZmZlci50b2tlbml6ZWRMaW5lRm9yUm93KHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0XG4gICAgICAgIC5yb3cpXG4gICAgICBsZXQgb2xkdG9raWQgPSB0bC50b2tlbkluZGV4QXRCdWZmZXJDb2x1bW4odGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3RcbiAgICAgICAgLmNvbHVtbilcbiAgICAgIGxldCBuZXd0b2tpZCA9IHRsLnRva2VuSW5kZXhBdEJ1ZmZlckNvbHVtbihwb3MuY29sdW1uKVxuICAgICAgcmV0dXJuIG9sZHRva2lkID09PSBuZXd0b2tpZFxuICAgIH1cbiAgICBsZXQgcmVzdWx0ID1cbiAgICAgIGlzRmlyc3RJdGVyYXRpb24gfHwgISh0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdC5pc0VxdWFsKG5ld3JhbmdlKSB8fFxuICAgICAgICBpc1NhbWVUb2tlbigpKVxuICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0ID0gcG9zXG4gICAgdGhpcy5sYXN0TW91c2VCdWZmZXJSYW5nZVRlc3QgPSBuZXdyYW5nZVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHNob3dUb29sdGlwIChwb3MsIHJhbmdlLCB0ZXh0LCBkZXRhaWwpIHtcbiAgICBpZiAodGhpcy5lZGl0b3IgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCFkZXRhaWwuZXZlbnRUeXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2ZW50VHlwZSBub3Qgc2V0JylcbiAgICB9XG4gICAgaWYgKGRldGFpbC5wZXJzaXN0T25DdXJzb3JNb3ZlID09IG51bGwpIHtcbiAgICAgIGRldGFpbC5wZXJzaXN0T25DdXJzb3JNb3ZlID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAocmFuZ2UuaXNFcXVhbCh0aGlzLnRvb2x0aXBIaWdobGlnaHRSYW5nZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmhpZGVUb29sdGlwKClcbiAgICAgIC8vIGV4aXQgaWYgbW91c2UgbW92ZWQgYXdheVxuICAgIGlmIChkZXRhaWwuZXZlbnRUeXBlID09PSAnbW91c2UnKSB7XG4gICAgICBpZiAoIXJhbmdlLmNvbnRhaW5zUG9pbnQodGhpcy5sYXN0TW91c2VCdWZmZXJQdCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkZXRhaWwuZXZlbnRUeXBlID09PSAnc2VsZWN0aW9uJykge1xuICAgICAgbGV0IGxhc3RTZWwgPSB0aGlzLmVkaXRvci5nZXRMYXN0U2VsZWN0aW9uKClcbiAgICAgIGlmICghcmFuZ2UuY29udGFpbnNSYW5nZShsYXN0U2VsLmdldEJ1ZmZlclJhbmdlKCkpIHx8ICEhbGFzdFNlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlID0gcmFuZ2VcbiAgICBkZXRhaWwudHlwZSA9ICd0b29sdGlwJ1xuICAgIGxldCBoaWdobGlnaHRNYXJrZXIgPSB0aGlzLmVkaXRvci5tYXJrQnVmZmVyUmFuZ2UocmFuZ2UpXG4gICAgaGlnaGxpZ2h0TWFya2VyLnNldFByb3BlcnRpZXMoZGV0YWlsKVxuICAgIGxldCB7XG4gICAgICBUb29sdGlwTWVzc2FnZVxuICAgIH0gPSByZXF1aXJlKCcuL3ZpZXdzL3Rvb2x0aXAtdmlldycpXG4gICAgdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIoaGlnaGxpZ2h0TWFya2VyLCB7XG4gICAgICB0eXBlOiAnb3ZlcmxheScsXG4gICAgICBwb3NpdGlvbjogJ3RhaWwnLFxuICAgICAgaXRlbTogbmV3IFRvb2x0aXBNZXNzYWdlKHRleHQpXG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIoaGlnaGxpZ2h0TWFya2VyLCB7XG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNsYXNzOiAnaWRlLWhhc2tlbGwtdHlwZSdcbiAgICB9KVxuICB9XG5cbiAgaGlkZVRvb2x0aXAgKHRlbXBsYXRlKSB7XG4gICAgaWYgKHRlbXBsYXRlID09IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlID0ge31cbiAgICB9XG4gICAgdGhpcy50b29sdGlwSGlnaGxpZ2h0UmFuZ2UgPSBudWxsXG4gICAgdGVtcGxhdGUudHlwZSA9ICd0b29sdGlwJ1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHRlbXBsYXRlKSkubWFwKChtKSA9PiBtLmRlc3Ryb3koKSlcbiAgfVxuXG4gIGdldEV2ZW50UmFuZ2UgKHBvcywgZXZlbnRUeXBlKSB7XG4gICAgbGV0IGNyYW5nZVxuICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICBjYXNlICdtb3VzZSc6XG4gICAgICBjYXNlICdjb250ZXh0JzpcbiAgICAgICAgaWYgKHBvcyA9PSBudWxsKSB7XG4gICAgICAgICAgcG9zID0gdGhpcy5sYXN0TW91c2VCdWZmZXJQdFxuICAgICAgICB9XG4gICAgICAgIGxldCBbc2VsUmFuZ2VdID0gQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5nZXRTZWxlY3Rpb25zKClcbiAgICAgICAgICAubWFwKHNlbCA9PiBzZWwuZ2V0QnVmZmVyUmFuZ2UoKSkuZmlsdGVyKHNlbCA9PiBzZWwuY29udGFpbnNQb2ludChcbiAgICAgICAgICAgIHBvcykpKVxuICAgICAgICBjcmFuZ2UgPSBzZWxSYW5nZSAhPSBudWxsID8gc2VsUmFuZ2UgOiBSYW5nZS5mcm9tUG9pbnRXaXRoRGVsdGEocG9zLFxuICAgICAgICAgIDAsIDApXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdrZXlib2FyZCc6XG4gICAgICBjYXNlICdzZWxlY3Rpb24nOlxuICAgICAgICBjcmFuZ2UgPSB0aGlzLmVkaXRvci5nZXRMYXN0U2VsZWN0aW9uKCkuZ2V0QnVmZmVyUmFuZ2UoKVxuICAgICAgICBwb3MgPSBjcmFuZ2Uuc3RhcnRcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBldmVudCB0eXBlICR7ZXZlbnRUeXBlfWApXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNyYW5nZSwgcG9zLCBldmVudFR5cGVcbiAgICB9XG4gIH1cblxuICBmaW5kQ2hlY2tSZXN1bHRNYXJrZXJzIChwb3MsIGd1dHRlciwgZXZlbnRUeXBlKSB7XG4gICAgaWYgKGd1dHRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgdHlwZTogJ2NoZWNrLXJlc3VsdCcsXG4gICAgICAgIHN0YXJ0QnVmZmVyUm93OiBwb3Mucm93LFxuICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yLmlkXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50VHlwZSkge1xuICAgICAgICBjYXNlICdrZXlib2FyZCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvci5pZCxcbiAgICAgICAgICAgIGNvbnRhaW5zUmFuZ2U6IFJhbmdlLmZyb21Qb2ludFdpdGhEZWx0YShwb3MsIDAsIDEpXG4gICAgICAgICAgfSlcbiAgICAgICAgY2FzZSAnbW91c2UnOlxuICAgICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5maW5kTWFya2Vycyh7XG4gICAgICAgICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3IuaWQsXG4gICAgICAgICAgICBjb250YWluc1BvaW50OiBwb3NcbiAgICAgICAgICB9KVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNob3cgY2hlY2sgcmVzdWx0IHdoZW4gbW91c2Ugb3ZlciBndXR0ZXIgaWNvblxuICBzaG93Q2hlY2tSZXN1bHQgKHBvcywgZ3V0dGVyLCBldmVudFR5cGUpIHtcbiAgICBpZiAoZXZlbnRUeXBlID09IG51bGwpIHtcbiAgICAgIGV2ZW50VHlwZSA9ICdtb3VzZSdcbiAgICB9XG4gICAgbGV0IG1hcmtlcnMgPSB0aGlzLmZpbmRDaGVja1Jlc3VsdE1hcmtlcnMocG9zLCBndXR0ZXIsIGV2ZW50VHlwZSlcbiAgICBsZXQgW21hcmtlcl0gPSBBcnJheS5mcm9tKG1hcmtlcnMpXG5cbiAgICBpZiAobWFya2VyID09IG51bGwpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGxldCB0ZXh0ID1cbiAgICAgIG1hcmtlcnMubWFwKG1hcmtlciA9PiBtYXJrZXIuZ2V0UHJvcGVydGllcygpLmRlc2MpXG5cbiAgICBpZiAoZ3V0dGVyKSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbmV3IFJhbmdlKHBvcywgcG9zKSwgdGV4dCwge1xuICAgICAgICBldmVudFR5cGUsIHN1YnR5cGU6ICdjaGVjay1yZXN1bHQnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbWFya2VyLmdldEJ1ZmZlclJhbmdlKCksIHRleHQsIHtcbiAgICAgICAgZXZlbnRUeXBlLCBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaGFzVG9vbHRpcHMgKHRlbXBsYXRlKSB7XG4gICAgaWYgKHRlbXBsYXRlID09IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlID0ge31cbiAgICB9XG4gICAgdGVtcGxhdGUudHlwZSA9ICd0b29sdGlwJ1xuICAgIHJldHVybiAhIXRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHRlbXBsYXRlKS5sZW5ndGhcbiAgfVxufVxuXG5mdW5jdGlvbiBfX2d1YXJkTWV0aG9kX18gKG9iaiwgbWV0aG9kTmFtZSwgdHJhbnNmb3JtKSB7XG4gIGlmICh0eXBlb2Ygb2JqICE9PSAndW5kZWZpbmVkJyAmJiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9ialttZXRob2ROYW1lXSA9PT1cbiAgICAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybShvYmosIG1ldGhvZE5hbWUpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59XG4iXX0=