import { TextEditor, TextBuffer, Disposable } from 'atom';
import { ResultsDB } from './results-db';
import { OutputPanel, IState as IOutputViewState } from './output-panel';
import { ConfigParamManager, IState as IParamState } from './config-params';
import { EditorControl, TTextBufferCallback } from './editor-control';
import { ILinter } from './linter-support';
import { TooltipRegistry } from './tooltip-registry';
export { IParamState, IOutputViewState };
export declare type TEventType = 'keyboard' | 'context' | 'mouse' | 'selection';
export interface IState {
    outputView: IOutputViewState;
    configParams: IParamState;
}
export interface IEditorController {
    destroy(): void;
}
export interface IEditorControllerFactory {
    new (editor: TextEditor, manager: PluginManager): IEditorController;
}
export declare type ECMap<T extends IEditorController> = WeakMap<TextEditor, T>;
export declare class PluginManager {
    resultsDB: ResultsDB;
    outputPanel: OutputPanel;
    configParamManager: ConfigParamManager;
    tooltipRegistry: TooltipRegistry;
    private linterSupport?;
    private disposables;
    private emitter;
    private controllers;
    private controllerClasses;
    private editorDispMap;
    constructor(state: IState);
    deactivate(): void;
    serialize(): IState;
    onWillSaveBuffer(callback: TTextBufferCallback): Disposable;
    onDidSaveBuffer(callback: TTextBufferCallback): Disposable;
    onDidStopChanging(callback: TTextBufferCallback): Disposable;
    willSaveBuffer(buffer: TextBuffer): void;
    didSaveBuffer(buffer: TextBuffer): void;
    didStopChanging(buffer: TextBuffer): void;
    togglePanel(): void;
    controller(editor: TextEditor): EditorControl | undefined;
    setLinter(linter: ILinter): void;
    nextError(): void;
    prevError(): void;
    removeController(editor: TextEditor): void;
    addEditorController(factory: IEditorControllerFactory, map?: ECMap<IEditorController>): void;
    private controllerOnGrammar(editor, grammar);
    private subscribeEditorController();
    private deleteEditorControllers();
    private addController(editor);
}
