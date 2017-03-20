import { CompositeDisposable, Point, TextEditor, Range } from 'atom';
import { PluginManager } from '../plugin-manager';
import { IStatus, ISeverityTabDefinition, IControlOpts } from '../output-panel';
import { IResultItem } from '../results-db';
import { TEventRangeType } from '../editor-control/tooltip-manager';
import { TPosition } from '../results-db';
import { IParamSpec } from '../config-params';
import { TTextBufferCallback } from '../editor-control';
import { TTooltipHandler, TTooltipFunction } from '../tooltip-registry';
export interface IShowTooltipParams {
    editor: TextEditor;
    pos: TPosition;
    eventType?: TEventRangeType;
    detail?: Object;
    tooltip: TTooltipFunction;
}
export interface IEventRangeParams {
    editor: TextEditor;
    detail?: Object;
    eventType?: TEventRangeType;
    pos: TPosition;
}
export interface IAtomMenuCommand {
    label: string;
    command: string;
}
export interface IAtomSubmenu {
    label: string;
    submenu: TAtomMenu[];
}
export declare type TAtomMenu = IAtomMenuCommand | IAtomSubmenu;
export declare type TEventRangeCallback<T> = (pars: {
    pos: Point;
    crange: Range;
    eventType: TEventRangeType;
}) => T;
export declare function instance(pluginManager: PluginManager, outerDisposables: CompositeDisposable, pluginName: string): {
    setMenu(name: string, menu: TAtomMenu[]): AtomTypes.Disposable;
    setStatus(status: IStatus): void;
    addMessages(newMessages: IResultItem[], types?: string[] | undefined): void;
    setMessages(newMessages: IResultItem[], types: string[]): void;
    clearMessages(types: string[]): void;
    setMessageTypes(types: {
        [severity: string]: ISeverityTabDefinition;
    }): void[];
    onShouldShowTooltip(callback: TTooltipHandler): AtomTypes.Disposable;
    showTooltip({editor, pos, eventType, detail, tooltip}: IShowTooltipParams): void;
    onWillSaveBuffer(callback: TTextBufferCallback): AtomTypes.Disposable;
    onDidSaveBuffer(callback: TTextBufferCallback): AtomTypes.Disposable;
    onDidStopChanging(callback: TTextBufferCallback): AtomTypes.Disposable;
    addPanelControl(element: string | HTMLElement, opts: IControlOpts): AtomTypes.Disposable;
    addConfigParam(specs: {
        [paramName: string]: IParamSpec<Object>;
    }): CompositeDisposable;
    getConfigParam(otherPluginName: string, name: string): Promise<Object>;
    setConfigParam(otherPluginName: string, name: string, value?: Object | undefined): Promise<Object | undefined>;
    withEventRange<T>({editor, detail, eventType, pos}: IEventRangeParams, callback: TEventRangeCallback<T>): T | undefined;
};
