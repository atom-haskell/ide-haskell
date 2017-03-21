import { TextEditor, Point } from 'atom';
import { MessageObject } from '../utils';
import { TEventRangeType } from '../editor-control/tooltip-manager';
import { PluginManager, IEditorController } from '../plugin-manager';
export declare class CREditorControl implements IEditorController {
    private editor;
    private gutter;
    private gutterElement;
    private markers;
    private disposables;
    private markerProps;
    private tooltipRegistry;
    constructor(editor: TextEditor, pluginManager: PluginManager);
    destroy(): void;
    getMessageAt(pos: Point, type: TEventRangeType | 'gutter'): MessageObject[];
    private registerGutterEvents();
    private updateResults(res);
    private markerFromCheckResult(resItem);
    private decorateMarker(m, r);
    private find(pos, type);
}
