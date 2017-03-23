import { CompositeDisposable, Disposable } from 'atom';
import { IState } from './plugin-manager';
import { ILinterRegistry } from './linter-support';
import * as UPI from './upi-2';
import * as UPI3 from './upi-3';
import { IShowTooltipParams } from './upi-3';
import { IStatus, ISeverityTabDefinition, TControlDefinition } from './output-panel';
import { IResultItem } from './results-db';
import { IParamSpec } from './config-params';
export { config } from './config';
export declare function activate(state: IState): void;
export declare function deactivate(): void;
export declare function serialize(): IState | undefined;
export declare function provideUpi(): {
    registerPlugin(disp: CompositeDisposable, pluginName: string): UPI.UPIInstance;
};
export declare function provideUpi3(): (options: UPI3.IRegistrationOptions) => {
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
    getEventRange(editor: AtomTypes.TextEditor, typeOrDetail: Object | "keyboard" | "context" | "mouse" | "selection"): {
        crange: AtomTypes.Range;
        pos: AtomTypes.Point;
        eventType: "keyboard" | "context" | "mouse" | "selection";
    } | undefined;
    dispose(): void;
};
export declare function consumeUpi3(registration: UPI3.IRegistrationOptions): Disposable;
export declare function consumeLinter(indieRegistry: ILinterRegistry): Disposable | undefined;
