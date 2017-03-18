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
            this.disposables.add(element_listener_1.listen(gutterElement, 'mouseenter', '.decoration', (e) => {
                const bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
                if (bufferPt) {
                    this.lastMouseBufferPt = bufferPt;
                    return this.showCheckResult(bufferPt, true);
                }
            }));
            this.disposables.add(element_listener_1.listen(gutterElement, 'mouseleave', '.decoration', (e) => this.hideTooltip()));
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
        this.disposables.add(element_listener_1.listen(editorElement, 'mousemove', '.scroll-view', (e) => {
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
        this.disposables.add(element_listener_1.listen(editorElement, 'mouseout', '.scroll-view', (e) => {
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
                this.hideTooltip({ eventType: 'selection' });
                switch (atom.config.get('ide-haskell.onCursorMove')) {
                    case 'Show Tooltip':
                        if (this.exprTypeTimeout) {
                            clearTimeout(this.exprTypeTimeout);
                        }
                        if (!this.showCheckResult(newBufferRange.start, false, 'keyboard')) {
                            return this.hideTooltip({ persistOnCursorMove: false });
                        }
                        break;
                    case 'Hide Tooltip':
                        if (this.exprTypeTimeout) {
                            clearTimeout(this.exprTypeTimeout);
                        }
                        return this.hideTooltip({ persistOnCursorMove: false });
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
                const props = {
                    type: 'check-result',
                    severity: t
                };
                for (const m of Array.from(this.editor.findMarkers(props))) {
                    m.destroy();
                }
            }
        }
        else {
            const props = {
                type: 'check-result'
            };
            for (const m of Array.from(this.editor.findMarkers(props))) {
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
        let props = {
            type: 'check-result',
            severity,
            desc: message
        };
        marker.setProperties(props);
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
        const props = Object.assign({ type: 'tooltip' }, template);
        this.editor.findMarkers(props).forEach((m) => m.destroy());
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
                startBufferRow: pos.row
            });
        }
        else {
            switch (eventType) {
                case 'keyboard':
                    return this.editor.findMarkers({
                        type: 'check-result',
                        containsRange: new atom_1.Range(pos, pos.translate([0, 1]))
                    });
                case 'mouse':
                    return this.editor.findMarkers({
                        type: 'check-result',
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
        const props = Object.assign({ type: 'tooltip' }, template);
        return !!this.editor.findMarkers(props).length;
    }
}
exports.EditorControl = EditorControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWRpdG9yLWNvbnRyb2wvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFFYTtBQUViLG9DQUVpQjtBQUdqQixpREFBNkM7QUFFN0MseURBQXlDO0FBa0J6QztJQVVFLFlBQXFCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUMsQ0FBQTtRQUVsRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtZQUNyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO29CQUNsQyxJQUFJLEVBQUUsMkJBQTJCO29CQUNqQyxRQUFRLEVBQUUsRUFBRTtpQkFDYixDQUFDLENBQUE7WUFDSixDQUFDO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHlCQUFNLENBQ3pCLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUMxQyxDQUFDLENBQUM7Z0JBQ0EsTUFBTSxRQUFRLEdBQUcsb0NBQTRCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFlLENBQUMsQ0FBQTtnQkFDM0UsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDYixJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFBO29CQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQzdDLENBQUM7WUFDSCxDQUFDLENBQ0YsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMseUJBQU0sQ0FDekIsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUN0RSxDQUFDLENBQUE7UUFDSixDQUFDO1FBR0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLDJCQUEyQixDQUFDLENBQUE7WUFDM0UsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTFGLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTlHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUd0RyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyx5QkFBTSxDQUN6QixhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFDMUMsQ0FBQyxDQUFDO1lBQ0EsTUFBTSxRQUFRLEdBQUcsb0NBQTRCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFlLENBQUMsQ0FBQTtZQUUzRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFBO1lBQ1IsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsTUFBTSxDQUFBO1lBQ1IsQ0FBQztZQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUE7WUFFakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDcEMsQ0FBQztZQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUMvQixNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQ3RELENBQUE7UUFDSCxDQUFDLENBQ0YsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMseUJBQU0sQ0FDekIsYUFBYSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQ3pDLENBQUMsQ0FBQztZQUNBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUMzQyxDQUFDO1FBQ0gsQ0FBQyxDQUNGLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUFDLGNBQWMsRUFBMEI7WUFDbkcsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pHLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtnQkFDaEYsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUE7Z0JBQ25ELE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtnQkFDMUUsTUFBTSxLQUFLLEdBQUc7b0JBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7b0JBQzNCLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHO29CQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtpQkFDckIsQ0FBQTtnQkFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtnQkFDeEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Z0JBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3RELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUc7b0JBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO2dCQUNmLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQWdCLENBQUE7Z0JBQ3ZFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDbEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUNyQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUNyQixTQUFTLENBQUMsQ0FBQTtvQkFDZCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDL0IsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQTtnQkFDMUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELEtBQUssY0FBYzt3QkFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7d0JBQ3BDLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO3dCQUN2RCxDQUFDO3dCQUNELEtBQUssQ0FBQTtvQkFDUCxLQUFLLGNBQWM7d0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzRCQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO3dCQUNwQyxDQUFDO3dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQTtvQkFDdkQsUUFBUTtnQkFDVixDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUMxQixNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUN0RCxDQUFBO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDO0lBRU0sVUFBVTtRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDcEMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDL0IsQ0FBQztRQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUE7SUFDcEMsQ0FBQztJQUVNLGFBQWEsQ0FBRSxHQUFpQixFQUFFLEtBQW1CO1FBQzFELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxLQUFLLEdBQWlDO29CQUMxQyxJQUFJLEVBQUUsY0FBYztvQkFDcEIsUUFBUSxFQUFFLENBQUM7aUJBQ1osQ0FBQTtnQkFDRCxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLEtBQUssR0FBaUM7Z0JBQzFDLElBQUksRUFBRSxjQUFjO2FBQ3JCLENBQUE7WUFDRCxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0lBRUQscUJBQXFCLENBQUUsT0FBbUI7UUFDeEMsTUFBTSxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQTtRQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUE7UUFDUixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFBO1FBQ1IsQ0FBQztRQUdELE1BQU0sS0FBSyxHQUFHLElBQUksWUFBSyxDQUFDLFFBQVEsRUFBRSxZQUFLLENBQUMsVUFBVSxDQUFDO1lBQ2pELEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRztZQUNqQixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO1NBQzVCLENBQUMsQ0FBQyxDQUFBO1FBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFO1lBQ2hELFVBQVUsRUFBRSxPQUFPO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLElBQUksS0FBSyxHQUFpQztZQUN4QyxJQUFJLEVBQUUsY0FBYztZQUNwQixRQUFRO1lBQ1IsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFBO1FBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQWdCO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDekIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFRCxjQUFjLENBQUUsQ0FBZ0I7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUE7UUFDUixDQUFDO1FBQ0QsTUFBTSxHQUFHLEdBQUcsZUFBZ0IsQ0FBQyxDQUFDLGFBQWEsRUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRTtZQUM1QixJQUFJLEVBQUUsYUFBYTtZQUNuQixLQUFLLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRTtZQUM1QixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxtQkFBbUIsQ0FBRSxRQUFzRjtRQUN6RyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVELGdCQUFnQixDQUFFLFFBQTZCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsZUFBZSxDQUFFLFFBQTZCO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsaUJBQWlCLENBQUUsUUFBc0M7UUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFRCxpQkFBaUIsQ0FBRSxHQUFVLEVBQUUsU0FBMkI7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2YsU0FBUyxHQUFHLE9BQU8sQ0FBQTtRQUNyQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUE7UUFDUixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQTtRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQzlDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsR0FBRztnQkFDSCxTQUFTO2FBQ1YsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCxlQUFlLENBQUUsR0FBVSxFQUFFLFNBQTBCO1FBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtRQUMxRCxNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDdkYsTUFBTSxXQUFXLEdBQUc7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUFDLENBQUM7WUFDcEYsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNwRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUE7WUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFBO1lBQ2QsQ0FBQztZQUNELE1BQU0sRUFBRSxHQUFJLElBQUksQ0FBQyxNQUFjLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNuRyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLHFCQUFxQjtpQkFDcEUsTUFBTSxDQUFDLENBQUE7WUFDVixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3hELE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFBO1FBQzlCLENBQUMsQ0FBQTtRQUNELE1BQU0sTUFBTSxHQUFHLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDdkcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTtRQUNoQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsUUFBUSxDQUFBO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDZixDQUFDO0lBRUQsV0FBVyxDQUNULEdBQVUsRUFBRSxLQUFZLEVBQUUsSUFBMkIsRUFDckQsTUFBc0I7UUFFdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUE7UUFDUixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDdEMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RSxNQUFNLENBQUE7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxDQUFBO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxDQUFBO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFBO1FBQ2xDLE1BQU0sS0FBSyxxQkFBMEIsTUFBTSxJQUFFLElBQUksRUFBRSxTQUFTLEdBQUMsQ0FBQTtRQUM3RCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMxRCxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRTtZQUMxQyxJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLElBQUksRUFBRSxJQUFJLDZCQUFjLENBQUMsSUFBSSxDQUFDO1NBQy9CLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDakQsSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxFQUFFLGtCQUFrQjtTQUMxQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFFLFFBQXlCO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNkLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDZixDQUFDO1FBQ0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQTtRQUN0QyxNQUFNLEtBQUssbUJBQXVCLElBQUksRUFBRSxTQUFTLElBQUssUUFBUSxDQUFDLENBQUE7UUFDL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFFRCxhQUFhLENBQUUsR0FBc0IsRUFBRSxTQUEwQjtRQUMvRCxJQUFJLE1BQWEsQ0FBQTtRQUNqQixNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxTQUFTO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFBO2dCQUM5QixDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO3FCQUN0RCxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxhQUFhLENBQ25FLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDVixNQUFNLEdBQUcsUUFBUSxJQUFJLElBQUksWUFBSyxDQUFDLEdBQUksRUFBRSxHQUFJLENBQUMsQ0FBQTtnQkFDMUMsS0FBSyxDQUFBO1lBQ1AsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxXQUFXO2dCQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUE7Z0JBQ3hELEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO2dCQUNsQixLQUFLLENBQUE7WUFDUDtnQkFDRSxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ3RELENBQUM7UUFFRCxNQUFNLElBQUksR0FBRyxHQUFJLENBQUE7UUFFakIsTUFBTSxDQUFDO1lBQ0wsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUztTQUM3QixDQUFBO0lBQ0gsQ0FBQztJQUVELHNCQUFzQixDQUFFLEdBQVUsRUFBRSxNQUFlLEVBQUUsU0FBMEI7UUFDN0UsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDN0IsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLGNBQWMsRUFBRSxHQUFHLENBQUMsR0FBRzthQUN4QixDQUFDLENBQUE7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixLQUFLLFVBQVU7b0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO3dCQUM3QixJQUFJLEVBQUUsY0FBYzt3QkFDcEIsYUFBYSxFQUFFLElBQUksWUFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3JELENBQUMsQ0FBQTtnQkFDSixLQUFLLE9BQU87b0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO3dCQUM3QixJQUFJLEVBQUUsY0FBYzt3QkFDcEIsYUFBYSxFQUFFLEdBQUc7cUJBQ25CLENBQUMsQ0FBQTtnQkFDSjtvQkFDRSxNQUFNLENBQUMsRUFBRSxDQUFBO1lBQ2IsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBR0QsZUFBZSxDQUFFLEdBQVUsRUFBRSxNQUFlLEVBQUUsU0FBMkI7UUFDdkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2YsU0FBUyxHQUFHLE9BQU8sQ0FBQTtRQUNyQixDQUFDO1FBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDbkUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDZixPQUFPLEVBQUUsY0FBYzthQUN4QixDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsS0FBSyxDQUFBO1FBQ2QsQ0FBQztRQUVELE1BQU0sSUFBSSxHQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLFlBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFO2dCQUMvQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWM7YUFDbkMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRTtnQkFDbkQsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjO2FBQ25DLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELFdBQVcsQ0FBRSxRQUF5QjtRQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2YsQ0FBQztRQUNELE1BQU0sS0FBSyxtQkFBdUIsSUFBSSxFQUFFLFNBQVMsSUFBSyxRQUFRLENBQUMsQ0FBQTtRQUMvRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUNoRCxDQUFDO0NBQ0Y7QUExYkQsc0NBMGJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUmFuZ2UsIEVtaXR0ZXIsIFRleHRFZGl0b3IsIFBvaW50LCBDb21wb3NpdGVEaXNwb3NhYmxlLCBHdXR0ZXIsIERpc3BsYXlNYXJrZXIsIFRleHRCdWZmZXJcbn0gZnJvbSAnYXRvbSdcblxuaW1wb3J0IHtcbiAgYnVmZmVyUG9zaXRpb25Gcm9tTW91c2VFdmVudFxufSBmcm9tICcuLi91dGlscydcblxuaW1wb3J0IHtSZXN1bHRJdGVtLCBUU2V2ZXJpdHl9IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQge1Rvb2x0aXBNZXNzYWdlfSBmcm9tICcuL3Rvb2x0aXAtdmlldydcbmltcG9ydCB7VE1lc3NhZ2UsIE1lc3NhZ2VPYmplY3R9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtsaXN0ZW59IGZyb20gJy4vZWxlbWVudC1saXN0ZW5lcidcblxuZXhwb3J0IHR5cGUgVEV2ZW50UmFuZ2VUeXBlID0gJ2tleWJvYXJkJyB8ICdjb250ZXh0JyB8ICdtb3VzZScgfCAnc2VsZWN0aW9uJ1xuZXhwb3J0IHR5cGUgVFRleHRCdWZmZXJDYWxsYmFjayA9IChidWZmZXI6IFRleHRCdWZmZXIpID0+IHZvaWRcbmV4cG9ydCBpbnRlcmZhY2UgSUNoZWNrUmVzdWx0TWFya2VyUHJvcGVydGllcyB7XG4gIHR5cGU6ICdjaGVjay1yZXN1bHQnXG4gIHNldmVyaXR5PzogVFNldmVyaXR5XG4gIGRlc2M/OiBNZXNzYWdlT2JqZWN0XG59XG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZXJQcm9wZXJ0aWVzIGV4dGVuZHMgSU1hcmtlck9wdGlvbnMge1xuICB0eXBlOiAndG9vbHRpcCdcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSU1hcmtlck9wdGlvbnMge1xuICBldmVudFR5cGU/OiBURXZlbnRSYW5nZVR5cGVcbiAgcGVyc2lzdE9uQ3Vyc29yTW92ZT86IGJvb2xlYW5cbiAgc3VidHlwZT86IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgRWRpdG9yQ29udHJvbCB7XG4gIHB1YmxpYyBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSAvLyBUT0RPIHNob3VsZCBiZSBwcml2YXRlLi4uXG4gIHByaXZhdGUgZW1pdHRlcjogRW1pdHRlclxuICBwcml2YXRlIGd1dHRlcjogR3V0dGVyXG4gIHByaXZhdGUgbGFzdE1vdXNlQnVmZmVyUHQ/OiBQb2ludFxuICBwcml2YXRlIGV4cHJUeXBlVGltZW91dD86IG51bWJlclxuICBwcml2YXRlIHNlbFRpbWVvdXQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBsYXN0TW91c2VCdWZmZXJQdFRlc3Q/OiBQb2ludFxuICBwcml2YXRlIGxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdD86IFJhbmdlXG4gIHByaXZhdGUgdG9vbHRpcEhpZ2hsaWdodFJhbmdlPzogUmFuZ2VcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgZWRpdG9yOiBUZXh0RWRpdG9yKSB7XG4gICAgdGhpcy51cGRhdGVSZXN1bHRzID0gdGhpcy51cGRhdGVSZXN1bHRzLmJpbmQodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCkpXG5cbiAgICBjb25zdCBlZGl0b3JFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KHRoaXMuZWRpdG9yKVxuXG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwubWVzc2FnZURpc3BsYXlGcm9udGVuZCcpID09PSAnYnVpbHRpbicpIHtcbiAgICAgIHRoaXMuZ3V0dGVyID0gdGhpcy5lZGl0b3IuZ3V0dGVyV2l0aE5hbWUoJ2lkZS1oYXNrZWxsLWNoZWNrLXJlc3VsdHMnKVxuICAgICAgaWYgKCF0aGlzLmd1dHRlcikge1xuICAgICAgICB0aGlzLmd1dHRlciA9IHRoaXMuZWRpdG9yLmFkZEd1dHRlcih7XG4gICAgICAgICAgbmFtZTogJ2lkZS1oYXNrZWxsLWNoZWNrLXJlc3VsdHMnLFxuICAgICAgICAgIHByaW9yaXR5OiAxMFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBndXR0ZXJFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KHRoaXMuZ3V0dGVyKVxuICAgICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQobGlzdGVuKFxuICAgICAgICBndXR0ZXJFbGVtZW50LCAnbW91c2VlbnRlcicsICcuZGVjb3JhdGlvbicsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmZmVyUHQgPSBidWZmZXJQb3NpdGlvbkZyb21Nb3VzZUV2ZW50KHRoaXMuZWRpdG9yLCBlIGFzIE1vdXNlRXZlbnQpXG4gICAgICAgICAgaWYgKGJ1ZmZlclB0KSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ID0gYnVmZmVyUHRcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dDaGVja1Jlc3VsdChidWZmZXJQdCwgdHJ1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICkpXG4gICAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChsaXN0ZW4oXG4gICAgICAgIGd1dHRlckVsZW1lbnQsICdtb3VzZWxlYXZlJywgJy5kZWNvcmF0aW9uJywgKGUpID0+IHRoaXMuaGlkZVRvb2x0aXAoKVxuICAgICAgKSlcbiAgICB9XG5cbiAgICAvLyBidWZmZXIgZXZlbnRzIGZvciBhdXRvbWF0aWMgY2hlY2tcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGJ1ZmZlci5vbldpbGxTYXZlKCgpID0+IHtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCd3aWxsLXNhdmUtYnVmZmVyJywgYnVmZmVyKVxuICAgICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknKSkge1xuICAgICAgICByZXR1cm4gYXRvbS5jb21tYW5kcy5kaXNwYXRjaChlZGl0b3JFbGVtZW50LCAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZScpXG4gICAgICB9XG4gICAgfSkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChidWZmZXIub25EaWRTYXZlKCgpID0+IHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtc2F2ZS1idWZmZXInLCBidWZmZXIpKSlcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZWRpdG9yLm9uRGlkU3RvcENoYW5naW5nKCgpID0+IHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtc3RvcC1jaGFuZ2luZycsIHRoaXMuZWRpdG9yKSkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChlZGl0b3JFbGVtZW50Lm9uRGlkQ2hhbmdlU2Nyb2xsTGVmdCgoKSA9PiB0aGlzLmhpZGVUb29sdGlwKHtldmVudFR5cGU6ICdtb3VzZSd9KSkpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoZWRpdG9yRWxlbWVudC5vbkRpZENoYW5nZVNjcm9sbFRvcCgoKSA9PiB0aGlzLmhpZGVUb29sdGlwKHtldmVudFR5cGU6ICdtb3VzZSd9KSkpXG5cbiAgICAvLyBzaG93IGV4cHJlc3Npb24gdHlwZSBpZiBtb3VzZSBzdG9wcGVkIHNvbWV3aGVyZVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgIGVkaXRvckVsZW1lbnQsICdtb3VzZW1vdmUnLCAnLnNjcm9sbC12aWV3JyxcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlclB0ID0gYnVmZmVyUG9zaXRpb25Gcm9tTW91c2VFdmVudCh0aGlzLmVkaXRvciwgZSBhcyBNb3VzZUV2ZW50KVxuXG4gICAgICAgIGlmICghYnVmZmVyUHQpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ICYmIHRoaXMubGFzdE1vdXNlQnVmZmVyUHQuaXNFcXVhbChidWZmZXJQdCkpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ID0gYnVmZmVyUHRcblxuICAgICAgICBpZiAodGhpcy5leHByVHlwZVRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5leHByVHlwZVRpbWVvdXQpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leHByVHlwZVRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICgpID0+IGJ1ZmZlclB0ICYmIHRoaXMuc2hvdWxkU2hvd1Rvb2x0aXAoYnVmZmVyUHQpLFxuICAgICAgICAgIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuZXhwcmVzc2lvblR5cGVJbnRlcnZhbCcpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGxpc3RlbihcbiAgICAgIGVkaXRvckVsZW1lbnQsICdtb3VzZW91dCcsICcuc2Nyb2xsLXZpZXcnLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0KSB7XG4gICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICkpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVkaXRvci5vbkRpZENoYW5nZVNlbGVjdGlvblJhbmdlKCh7bmV3QnVmZmVyUmFuZ2V9OiB7bmV3QnVmZmVyUmFuZ2U6IFJhbmdlfSkgPT4ge1xuICAgICAgY29uc3QgdG9vbHRpcEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZGUtaGFza2VsbC10b29sdGlwJylcbiAgICAgIGlmICh0b29sdGlwRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzbGNsID0gZWRpdG9yRWxlbWVudC5waXhlbFJlY3RGb3JTY3JlZW5SYW5nZSh0aGlzLmVkaXRvci5zY3JlZW5SYW5nZUZvckJ1ZmZlclJhbmdlKG5ld0J1ZmZlclJhbmdlKSlcbiAgICAgICAgY29uc3QgZWVjbCA9IGVkaXRvckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC12aWV3JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgdHRjbCA9IHRvb2x0aXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHR0Y2xkID0gdG9vbHRpcEVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JykhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHR0Ym94ID0ge1xuICAgICAgICAgIGxlZnQ6IHR0Y2wubGVmdCAtIGVlY2wubGVmdCxcbiAgICAgICAgICB0b3A6IHR0Y2xkLnRvcCAtIGVlY2wudG9wLFxuICAgICAgICAgIHdpZHRoOiB0dGNsLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdHRjbGQuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeG1heCA9IE1hdGgucm91bmQoTWF0aC5tYXgodHRib3gubGVmdCwgc2xjbC5sZWZ0KSlcbiAgICAgICAgY29uc3QgeG1pbiA9IE1hdGgucm91bmQoTWF0aC5taW4odHRib3gubGVmdCArIHR0Ym94LndpZHRoLCBzbGNsLmxlZnQgK1xuICAgICAgICAgIHNsY2wud2lkdGgpKVxuICAgICAgICBjb25zdCB5bWF4ID0gTWF0aC5yb3VuZChNYXRoLm1heCh0dGJveC50b3AsIHNsY2wudG9wKSlcbiAgICAgICAgY29uc3QgeW1pbiA9IE1hdGgucm91bmQoTWF0aC5taW4odHRib3gudG9wICsgdHRib3guaGVpZ2h0LCBzbGNsLnRvcCArXG4gICAgICAgICAgc2xjbC5oZWlnaHQpKVxuICAgICAgICBjb25zdCB0dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lkZS1oYXNrZWxsLXRvb2x0aXAnKSBhcyBIVE1MRWxlbWVudFxuICAgICAgICBpZiAodHQpIHtcbiAgICAgICAgICBpZiAoKHltYXggPD0geW1pbikgJiYgKHhtYXggPD0geG1pbikpIHtcbiAgICAgICAgICAgIHR0LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAnb3BhY2l0eScsICcwLjMnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0dC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcbiAgICAgICAgICAgICAgJ29wYWNpdHknKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zZWxUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlbFRpbWVvdXQpXG4gICAgICB9XG4gICAgICBpZiAobmV3QnVmZmVyUmFuZ2UuaXNFbXB0eSgpKSB7XG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAoe2V2ZW50VHlwZTogJ3NlbGVjdGlvbid9KVxuICAgICAgICBzd2l0Y2ggKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25DdXJzb3JNb3ZlJykpIHtcbiAgICAgICAgICBjYXNlICdTaG93IFRvb2x0aXAnOlxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0KSB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93Q2hlY2tSZXN1bHQobmV3QnVmZmVyUmFuZ2Uuc3RhcnQsIGZhbHNlLCAna2V5Ym9hcmQnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oaWRlVG9vbHRpcCh7cGVyc2lzdE9uQ3Vyc29yTW92ZTogZmFsc2V9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdIaWRlIFRvb2x0aXAnOlxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwclR5cGVUaW1lb3V0KSB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cHJUeXBlVGltZW91dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVUb29sdGlwKHtwZXJzaXN0T25DdXJzb3JNb3ZlOiBmYWxzZX0pXG4gICAgICAgICAgZGVmYXVsdDogLy8gaW1wb3NzaWJsZSwgYnV0IHRzbGludCBjb21wbGFpbnNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxUaW1lb3V0ID0gc2V0VGltZW91dChcbiAgICAgICAgICAoKSA9PiB0aGlzLnNob3VsZFNob3dUb29sdGlwKG5ld0J1ZmZlclJhbmdlLnN0YXJ0LCAnc2VsZWN0aW9uJyksXG4gICAgICAgICAgYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5leHByZXNzaW9uVHlwZUludGVydmFsJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUgKCkge1xuICAgIGlmICh0aGlzLmV4cHJUeXBlVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwclR5cGVUaW1lb3V0KVxuICAgIH1cbiAgICBpZiAodGhpcy5zZWxUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5zZWxUaW1lb3V0KVxuICAgIH1cbiAgICB0aGlzLmhpZGVUb29sdGlwKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUHQgPSB1bmRlZmluZWRcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVSZXN1bHRzIChyZXM6IFJlc3VsdEl0ZW1bXSwgdHlwZXM/OiBUU2V2ZXJpdHlbXSkge1xuICAgIGlmICh0eXBlcykge1xuICAgICAgZm9yIChjb25zdCB0IG9mIEFycmF5LmZyb20odHlwZXMpKSB7XG4gICAgICAgIGNvbnN0IHByb3BzOiBJQ2hlY2tSZXN1bHRNYXJrZXJQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICAgIHNldmVyaXR5OiB0XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBtIG9mIEFycmF5LmZyb20odGhpcy5lZGl0b3IuZmluZE1hcmtlcnMocHJvcHMpKSkge1xuICAgICAgICAgIG0uZGVzdHJveSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvcHM6IElDaGVja1Jlc3VsdE1hcmtlclByb3BlcnRpZXMgPSB7XG4gICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnXG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IG0gb2YgQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5maW5kTWFya2Vycyhwcm9wcykpKSB7XG4gICAgICAgIG0uZGVzdHJveSgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHJlcykubWFwKChyKSA9PiB0aGlzLm1hcmtlckZyb21DaGVja1Jlc3VsdChyKSlcbiAgfVxuXG4gIG1hcmtlckZyb21DaGVja1Jlc3VsdCAocmVzSXRlbTogUmVzdWx0SXRlbSkge1xuICAgIGNvbnN0IHt1cmksIHNldmVyaXR5LCBtZXNzYWdlLCBwb3NpdGlvbn0gPSByZXNJdGVtXG4gICAgaWYgKCghdXJpKSB8fCAodXJpICE9PSB0aGlzLmVkaXRvci5nZXRQYXRoKCkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFwb3NpdGlvbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgbmV3IG1hcmtlclxuICAgIGNvbnN0IHJhbmdlID0gbmV3IFJhbmdlKHBvc2l0aW9uLCBQb2ludC5mcm9tT2JqZWN0KHtcbiAgICAgIHJvdzogcG9zaXRpb24ucm93LFxuICAgICAgY29sdW1uOiBwb3NpdGlvbi5jb2x1bW4gKyAxXG4gICAgfSkpXG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5lZGl0b3IubWFya0J1ZmZlclJhbmdlKHJhbmdlLCB7XG4gICAgICBpbnZhbGlkYXRlOiAndG91Y2gnXG4gICAgfSlcbiAgICBsZXQgcHJvcHM6IElDaGVja1Jlc3VsdE1hcmtlclByb3BlcnRpZXMgPSB7XG4gICAgICB0eXBlOiAnY2hlY2stcmVzdWx0JyxcbiAgICAgIHNldmVyaXR5LFxuICAgICAgZGVzYzogbWVzc2FnZVxuICAgIH1cbiAgICBtYXJrZXIuc2V0UHJvcGVydGllcyhwcm9wcylcbiAgICBjb25zdCBkaXNwID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIGRpc3AuYWRkKG1hcmtlci5vbkRpZENoYW5nZSgoe2lzVmFsaWR9OiBEaXNwbGF5TWFya2VyKSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgcmVzSXRlbS5kZXN0cm95KClcbiAgICAgICAgcmV0dXJuIG1hcmtlci5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KSlcbiAgICBkaXNwLmFkZChtYXJrZXIub25EaWREZXN0cm95KCgpID0+IGRpc3AuZGlzcG9zZSgpKSlcblxuICAgIHJldHVybiB0aGlzLmRlY29yYXRlTWFya2VyKG1hcmtlcilcbiAgfVxuXG4gIGRlY29yYXRlTWFya2VyIChtOiBEaXNwbGF5TWFya2VyKSB7XG4gICAgaWYgKCF0aGlzLmd1dHRlcikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNscyA9IGBpZGUtaGFza2VsbC0keyhtLmdldFByb3BlcnRpZXMoKSBhcyBhbnkpLnNldmVyaXR5fWBcbiAgICB0aGlzLmd1dHRlci5kZWNvcmF0ZU1hcmtlcihtLCB7XG4gICAgICB0eXBlOiAnbGluZS1udW1iZXInLFxuICAgICAgY2xhc3M6IGNsc1xuICAgIH0pXG4gICAgdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIobSwge1xuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjbGFzczogY2xzXG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIobSwge1xuICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgY2xhc3M6IGNsc1xuICAgIH0pXG4gIH1cblxuICBvblNob3VsZFNob3dUb29sdGlwIChjYWxsYmFjazogKGFyZ3M6IHtlZGl0b3I6IFRleHRFZGl0b3IsIHBvczogUG9pbnQsIGV2ZW50VHlwZTogVEV2ZW50UmFuZ2VUeXBlfSkgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ3Nob3VsZC1zaG93LXRvb2x0aXAnLCBjYWxsYmFjaylcbiAgfVxuXG4gIG9uV2lsbFNhdmVCdWZmZXIgKGNhbGxiYWNrOiBUVGV4dEJ1ZmZlckNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignd2lsbC1zYXZlLWJ1ZmZlcicsIGNhbGxiYWNrKVxuICB9XG5cbiAgb25EaWRTYXZlQnVmZmVyIChjYWxsYmFjazogVFRleHRCdWZmZXJDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1zYXZlLWJ1ZmZlcicsIGNhbGxiYWNrKVxuICB9XG5cbiAgb25EaWRTdG9wQ2hhbmdpbmcgKGNhbGxiYWNrOiAoZWRpdG9yOiBUZXh0RWRpdG9yKSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXN0b3AtY2hhbmdpbmcnLCBjYWxsYmFjaylcbiAgfVxuXG4gIHNob3VsZFNob3dUb29sdGlwIChwb3M6IFBvaW50LCBldmVudFR5cGU/OiBURXZlbnRSYW5nZVR5cGUpIHtcbiAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgZXZlbnRUeXBlID0gJ21vdXNlJ1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93Q2hlY2tSZXN1bHQocG9zLCBmYWxzZSwgZXZlbnRUeXBlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKChwb3Mucm93IDwgMCkgfHxcbiAgICAgIChwb3Mucm93ID49IHRoaXMuZWRpdG9yLmdldExpbmVDb3VudCgpKSB8fFxuICAgICAgcG9zLmlzRXF1YWwodGhpcy5lZGl0b3IuYnVmZmVyUmFuZ2VGb3JCdWZmZXJSb3cocG9zLnJvdykuZW5kKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZVRvb2x0aXAoe2V2ZW50VHlwZX0pXG4gICAgfSBlbHNlIGlmICh0aGlzLnJhbmdlSGFzQ2hhbmdlZChwb3MsIGV2ZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmVtaXR0ZXIuZW1pdCgnc2hvdWxkLXNob3ctdG9vbHRpcCcsIHtcbiAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvcixcbiAgICAgICAgcG9zLFxuICAgICAgICBldmVudFR5cGVcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmFuZ2VIYXNDaGFuZ2VkIChwb3M6IFBvaW50LCBldmVudFR5cGU6IFRFdmVudFJhbmdlVHlwZSkge1xuICAgIGNvbnN0IG5ld3JhbmdlID0gdGhpcy5nZXRFdmVudFJhbmdlKHBvcywgZXZlbnRUeXBlKS5jcmFuZ2VcbiAgICBjb25zdCBpc0ZpcnN0SXRlcmF0aW9uID0gISh0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdCAmJiB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0VGVzdClcbiAgICBjb25zdCBpc1NhbWVUb2tlbiA9ICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMubGFzdE1vdXNlQnVmZmVyUmFuZ2VUZXN0ICYmIHRoaXMubGFzdE1vdXNlQnVmZmVyUHRUZXN0KSkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgY29uc3QgcmFuZ2VzQXJlRW1wdHkgPSB0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdC5pc0VtcHR5KCkgJiYgbmV3cmFuZ2UuaXNFbXB0eSgpXG4gICAgICBjb25zdCBpc1NhbWVSb3cgPSB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0VGVzdC5yb3cgPT09IHBvcy5yb3dcbiAgICAgIGlmICghcmFuZ2VzQXJlRW1wdHkgfHwgIWlzU2FtZVJvdykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRsID0gKHRoaXMuZWRpdG9yIGFzIGFueSkudG9rZW5pemVkQnVmZmVyLnRva2VuaXplZExpbmVGb3JSb3codGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3Qucm93KVxuICAgICAgY29uc3Qgb2xkdG9raWQgPSB0bC50b2tlbkluZGV4QXRCdWZmZXJDb2x1bW4odGhpcy5sYXN0TW91c2VCdWZmZXJQdFRlc3RcbiAgICAgICAgLmNvbHVtbilcbiAgICAgIGNvbnN0IG5ld3Rva2lkID0gdGwudG9rZW5JbmRleEF0QnVmZmVyQ29sdW1uKHBvcy5jb2x1bW4pXG4gICAgICByZXR1cm4gb2xkdG9raWQgPT09IG5ld3Rva2lkXG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGlzRmlyc3RJdGVyYXRpb24gfHwgISh0aGlzLmxhc3RNb3VzZUJ1ZmZlclJhbmdlVGVzdCEuaXNFcXVhbChuZXdyYW5nZSkgfHwgaXNTYW1lVG9rZW4oKSlcbiAgICB0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0VGVzdCA9IHBvc1xuICAgIHRoaXMubGFzdE1vdXNlQnVmZmVyUmFuZ2VUZXN0ID0gbmV3cmFuZ2VcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBzaG93VG9vbHRpcCAoXG4gICAgcG9zOiBQb2ludCwgcmFuZ2U6IFJhbmdlLCB0ZXh0OiBUTWVzc2FnZSB8IFRNZXNzYWdlW10sXG4gICAgZGV0YWlsOiBJTWFya2VyT3B0aW9uc1xuICApIHtcbiAgICBpZiAoIXRoaXMuZWRpdG9yKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIWRldGFpbC5ldmVudFR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZXZlbnRUeXBlIG5vdCBzZXQnKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRvb2x0aXBIaWdobGlnaHRSYW5nZSAmJiByYW5nZS5pc0VxdWFsKHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuaGlkZVRvb2x0aXAoKVxuICAgICAgLy8gZXhpdCBpZiBtb3VzZSBtb3ZlZCBhd2F5XG4gICAgaWYgKGRldGFpbC5ldmVudFR5cGUgPT09ICdtb3VzZScpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RNb3VzZUJ1ZmZlclB0ICYmICFyYW5nZS5jb250YWluc1BvaW50KHRoaXMubGFzdE1vdXNlQnVmZmVyUHQpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGV0YWlsLmV2ZW50VHlwZSA9PT0gJ3NlbGVjdGlvbicpIHtcbiAgICAgIGNvbnN0IGxhc3RTZWwgPSB0aGlzLmVkaXRvci5nZXRMYXN0U2VsZWN0aW9uKClcbiAgICAgIGlmICghcmFuZ2UuY29udGFpbnNSYW5nZShsYXN0U2VsLmdldEJ1ZmZlclJhbmdlKCkpIHx8ICEhbGFzdFNlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG9vbHRpcEhpZ2hsaWdodFJhbmdlID0gcmFuZ2VcbiAgICBjb25zdCBwcm9wczogSU1hcmtlclByb3BlcnRpZXMgPSB7Li4uZGV0YWlsLCB0eXBlOiAndG9vbHRpcCd9XG4gICAgY29uc3QgaGlnaGxpZ2h0TWFya2VyID0gdGhpcy5lZGl0b3IubWFya0J1ZmZlclJhbmdlKHJhbmdlKVxuICAgIGhpZ2hsaWdodE1hcmtlci5zZXRQcm9wZXJ0aWVzKHByb3BzKVxuICAgIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKGhpZ2hsaWdodE1hcmtlciwge1xuICAgICAgdHlwZTogJ292ZXJsYXknLFxuICAgICAgcG9zaXRpb246ICd0YWlsJyxcbiAgICAgIGl0ZW06IG5ldyBUb29sdGlwTWVzc2FnZSh0ZXh0KVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yLmRlY29yYXRlTWFya2VyKGhpZ2hsaWdodE1hcmtlciwge1xuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjbGFzczogJ2lkZS1oYXNrZWxsLXR5cGUnXG4gICAgfSlcbiAgfVxuXG4gIGhpZGVUb29sdGlwICh0ZW1wbGF0ZT86IElNYXJrZXJPcHRpb25zKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgdGVtcGxhdGUgPSB7fVxuICAgIH1cbiAgICB0aGlzLnRvb2x0aXBIaWdobGlnaHRSYW5nZSA9IHVuZGVmaW5lZFxuICAgIGNvbnN0IHByb3BzOiBJTWFya2VyUHJvcGVydGllcyA9IHt0eXBlOiAndG9vbHRpcCcsIC4uLnRlbXBsYXRlfVxuICAgIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHByb3BzKS5mb3JFYWNoKChtKSA9PiBtLmRlc3Ryb3koKSlcbiAgfVxuXG4gIGdldEV2ZW50UmFuZ2UgKHBvczogUG9pbnQgfCB1bmRlZmluZWQsIGV2ZW50VHlwZTogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgbGV0IGNyYW5nZTogUmFuZ2VcbiAgICBzd2l0Y2ggKGV2ZW50VHlwZSkge1xuICAgICAgY2FzZSAnbW91c2UnOlxuICAgICAgY2FzZSAnY29udGV4dCc6XG4gICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgcG9zID0gdGhpcy5sYXN0TW91c2VCdWZmZXJQdFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtzZWxSYW5nZV0gPSBBcnJheS5mcm9tKHRoaXMuZWRpdG9yLmdldFNlbGVjdGlvbnMoKVxuICAgICAgICAgIC5tYXAoKHNlbCkgPT4gc2VsLmdldEJ1ZmZlclJhbmdlKCkpLmZpbHRlcigoc2VsKSA9PiBzZWwuY29udGFpbnNQb2ludChcbiAgICAgICAgICAgIHBvcykpKVxuICAgICAgICBjcmFuZ2UgPSBzZWxSYW5nZSB8fCBuZXcgUmFuZ2UocG9zISwgcG9zISlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2tleWJvYXJkJzpcbiAgICAgIGNhc2UgJ3NlbGVjdGlvbic6XG4gICAgICAgIGNyYW5nZSA9IHRoaXMuZWRpdG9yLmdldExhc3RTZWxlY3Rpb24oKS5nZXRCdWZmZXJSYW5nZSgpXG4gICAgICAgIHBvcyA9IGNyYW5nZS5zdGFydFxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGV2ZW50IHR5cGUgJHtldmVudFR5cGV9YClcbiAgICB9XG5cbiAgICBjb25zdCBwcG9zID0gcG9zIVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNyYW5nZSwgcG9zOiBwcG9zLCBldmVudFR5cGVcbiAgICB9XG4gIH1cblxuICBmaW5kQ2hlY2tSZXN1bHRNYXJrZXJzIChwb3M6IFBvaW50LCBndXR0ZXI6IGJvb2xlYW4sIGV2ZW50VHlwZTogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgaWYgKGd1dHRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgdHlwZTogJ2NoZWNrLXJlc3VsdCcsXG4gICAgICAgIHN0YXJ0QnVmZmVyUm93OiBwb3Mucm93XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50VHlwZSkge1xuICAgICAgICBjYXNlICdrZXlib2FyZCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGVjay1yZXN1bHQnLFxuICAgICAgICAgICAgY29udGFpbnNSYW5nZTogbmV3IFJhbmdlKHBvcywgcG9zLnRyYW5zbGF0ZShbMCwgMV0pKVxuICAgICAgICAgIH0pXG4gICAgICAgIGNhc2UgJ21vdXNlJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZmluZE1hcmtlcnMoe1xuICAgICAgICAgICAgdHlwZTogJ2NoZWNrLXJlc3VsdCcsXG4gICAgICAgICAgICBjb250YWluc1BvaW50OiBwb3NcbiAgICAgICAgICB9KVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNob3cgY2hlY2sgcmVzdWx0IHdoZW4gbW91c2Ugb3ZlciBndXR0ZXIgaWNvblxuICBzaG93Q2hlY2tSZXN1bHQgKHBvczogUG9pbnQsIGd1dHRlcjogYm9vbGVhbiwgZXZlbnRUeXBlPzogVEV2ZW50UmFuZ2VUeXBlKSB7XG4gICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgIGV2ZW50VHlwZSA9ICdtb3VzZSdcbiAgICB9XG4gICAgY29uc3QgbWFya2VycyA9IHRoaXMuZmluZENoZWNrUmVzdWx0TWFya2Vycyhwb3MsIGd1dHRlciwgZXZlbnRUeXBlKVxuICAgIGNvbnN0IFttYXJrZXJdID0gQXJyYXkuZnJvbShtYXJrZXJzKVxuXG4gICAgaWYgKCFtYXJrZXIpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAoe1xuICAgICAgICBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPVxuICAgICAgbWFya2Vycy5tYXAoKG0pID0+IG0uZ2V0UHJvcGVydGllcygpLmRlc2MpXG5cbiAgICBpZiAoZ3V0dGVyKSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbmV3IFJhbmdlKHBvcywgcG9zKSwgdGV4dCwge1xuICAgICAgICBldmVudFR5cGUsIHN1YnR5cGU6ICdjaGVjay1yZXN1bHQnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKHBvcywgbWFya2VyLmdldEJ1ZmZlclJhbmdlKCksIHRleHQsIHtcbiAgICAgICAgZXZlbnRUeXBlLCBzdWJ0eXBlOiAnY2hlY2stcmVzdWx0J1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaGFzVG9vbHRpcHMgKHRlbXBsYXRlPzogSU1hcmtlck9wdGlvbnMpIHtcbiAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICB0ZW1wbGF0ZSA9IHt9XG4gICAgfVxuICAgIGNvbnN0IHByb3BzOiBJTWFya2VyUHJvcGVydGllcyA9IHt0eXBlOiAndG9vbHRpcCcsIC4uLnRlbXBsYXRlfVxuICAgIHJldHVybiAhIXRoaXMuZWRpdG9yLmZpbmRNYXJrZXJzKHByb3BzKS5sZW5ndGhcbiAgfVxufVxuIl19