import { CompositeDisposable, TextEditor } from 'atom';
import { PluginManager } from '../plugin-manager';
import { IStatus, ISeverityTabDefinition, TControlDefinition } from '../output-panel';
import { IResultItem } from '../results-db';
import { TEventRangeType } from '../editor-control/tooltip-manager';
import { IParamSpec } from '../config-params';
import { TTooltipFunction, ITooltipData } from '../tooltip-registry';
import { TAtomMenu, IRegistrationOptions } from './';
export interface IShowTooltipParams {
    editor: TextEditor;
    eventType?: TEventRangeType;
    detail?: Object;
    tooltip: TTooltipFunction | ITooltipData;
}
export declare function instance(pluginManager: PluginManager, options: IRegistrationOptions): {
    setMenu(name: string, menu: TAtomMenu[]): AtomTypes.Disposable;
    setStatus(status: IStatus): void;
    setMessages(messages: IResultItem[]): void;
    addMessageTab(name: string, opts: ISeverityTabDefinition): void;
    showTooltip({editor, eventType, detail, tooltip}: IShowTooltipParams): void;
    addPanelControl<T>(def: TControlDefinition<Object>): AtomTypes.Disposable;
    addConfigParam(paramName: string, spec: IParamSpec<Object>): CompositeDisposable;
    getConfigParam(name: string): Promise<Object>;
    getOthersConfigParam(plugin: string, name: string): Promise<Object>;
    setConfigParam(name: string, value: Object): Promise<Object | undefined>;
    getEventRange(editor: TextEditor, typeOrDetail: Object | "keyboard" | "context" | "mouse" | "selection"): {
        crange: AtomTypes.Range;
        pos: AtomTypes.Point;
        eventType: "keyboard" | "context" | "mouse" | "selection";
    } | undefined;
    dispose(): void;
};
