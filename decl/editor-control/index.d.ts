import { Range, TextEditor, Point, TextBuffer } from 'atom';
import { TooltipManager, TEventRangeType } from './tooltip-manager';
import { PluginManager, IEditorController } from '../plugin-manager';
export declare type TTextBufferCallback = (buffer: TextBuffer) => void;
export declare type TEventRangeResult = {
    crange: Range;
    pos: Point;
    eventType: TEventRangeType;
} | undefined;
export { TEventRangeType };
export declare class EditorControl implements IEditorController {
    private editor;
    tooltips: TooltipManager;
    private disposables;
    private lastMouseBufferPt?;
    private exprTypeTimeout?;
    private selTimeout?;
    private editorElement;
    private tooltipRegistry;
    constructor(editor: TextEditor, pluginManager: PluginManager);
    destroy(): void;
    getEventRange(eventType: TEventRangeType): TEventRangeResult;
    private shouldShowTooltip(pos, type);
    private trackMouseBufferPosition(e);
    private stopTrackingMouseBufferPosition(e);
    private trackSelection({newBufferRange});
    private handleCursorUnderTooltip(currentRange);
}
