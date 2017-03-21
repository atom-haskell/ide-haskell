import { TextEditor } from 'atom';
import { PluginManager } from '../plugin-manager';
export declare class CheckResultsProvider {
    private editor;
    private disposables;
    private editorMap;
    constructor(editor: TextEditor, pluginManager: PluginManager);
    destroy(): void;
    private tooltipProvider(editor, crange, type);
}
