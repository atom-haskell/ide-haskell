import { TextEditor, Gutter } from 'atom';
import { PluginManager, IEditorController } from '../plugin-manager';
export declare class CheckResultsProvider implements IEditorController {
    private editor;
    gutter: Gutter;
    private markers;
    private disposables;
    private markerProps;
    constructor(editor: TextEditor, pluginManager: PluginManager);
    destroy(): void;
    private tooltipProvider(editor, crange, type);
    private getMessageAt(pos, type);
    private updateResults(res);
    private markerFromCheckResult(resItem);
    private decorateMarker(m, r);
    private find(pos, type);
}
