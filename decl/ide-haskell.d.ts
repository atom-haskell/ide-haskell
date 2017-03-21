import { CompositeDisposable, Disposable } from 'atom';
import { IState } from './plugin-manager';
import { ILinterRegistry } from './linter-support';
import * as UPI from './upi-2';
import * as UPI3 from './upi-3';
import { IShowTooltipParams } from './upi-3';
import { IStatus, ISeverityTabDefinition, IControlOpts, TControlDefinition } from './output-panel';
import { IResultItem } from './results-db';
import { IParamSpec } from './config-params';
import { TTooltipHandler } from './tooltip-registry';
export { config } from './config';
export declare function activate(state: IState): void;
export declare function deactivate(): void;
export declare function serialize(): IState | undefined;
export declare function provideUpi(): {
    registerPlugin(disp: CompositeDisposable, pluginName: string): {
        setMenu(name: string, menu: UPI.TAtomMenu[]): Disposable;
        setStatus(status: IStatus): void;
        addMessages(newMessages: IResultItem[], types?: string[] | undefined): void;
        setMessages(newMessages: IResultItem[], types: string[]): void;
        clearMessages(types: string[]): void;
        setMessageTypes(types: {
            [severity: string]: ISeverityTabDefinition;
        }): void[];
        onShouldShowTooltip(callback: TTooltipHandler): Disposable;
        showTooltip({editor, pos, eventType, detail, tooltip}: UPI.IShowTooltipParams): void;
        onWillSaveBuffer(callback: (buffer: AtomTypes.TextBuffer) => void): Disposable;
        onDidSaveBuffer(callback: (buffer: AtomTypes.TextBuffer) => void): Disposable;
        onDidStopChanging(callback: (buffer: AtomTypes.TextBuffer) => void): Disposable;
        addPanelControl(element: string | HTMLElement, opts: IControlOpts): Disposable;
        addConfigParam(specs: {
            [paramName: string]: IParamSpec<Object>;
        }): CompositeDisposable;
        getConfigParam(otherPluginName: string, name: string): Promise<Object>;
        setConfigParam(otherPluginName: string, name: string, value?: Object | undefined): Promise<Object | undefined>;
        withEventRange<T>({editor, detail, eventType, pos}: UPI.IEventRangeParams, callback: UPI.TEventRangeCallback<T>): T | undefined;
    };
};
export declare function provideUpi3(): {
    register(options: UPI3.IRegistrationOptions): {
        setMenu(name: string, menu: UPI3.TAtomMenu[]): Disposable;
        setStatus(status: IStatus): void;
        setMessages(messages: IResultItem[]): void;
        addMessageTab(name: string, opts: ISeverityTabDefinition): void;
        showTooltip({editor, eventType, detail, tooltip}: IShowTooltipParams): void;
        addPanelControl<T>(def: TControlDefinition<Object>): Disposable;
        addConfigParam(paramName: string, spec: IParamSpec<Object>): CompositeDisposable;
        getConfigParam(name: string): Promise<Object>;
        getOthersConfigParam(plugin: string, name: string): Promise<Object>;
        setConfigParam(name: string, value: Object): Promise<Object | undefined>;
        getEventRange(editor: AtomTypes.TextEditor, typeOrDetail: Object | "context" | "keyboard" | "mouse" | "selection" | "gutter"): {
            crange: AtomTypes.Range;
            pos: AtomTypes.Point;
            eventType: "context" | "keyboard" | "mouse" | "selection" | "gutter";
        } | undefined;
        dispose(): void;
    };
};
export declare function consumeUpi3(registration: UPI3.IRegistrationOptions): Disposable;
export declare function consumeLinter(indieRegistry: ILinterRegistry): Disposable | undefined;
