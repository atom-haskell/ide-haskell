declare namespace UPI {
export const TEventRangeType: {
    context: "context";
    keyboard: "keyboard";
    mouse: "mouse";
    selection: "selection";
    gutter: "gutter";
};
export type TEventRangeType = keyof typeof TEventRangeType;
export type TTooltipFunction = (crange: AtomTypes.Range) => ITooltipData | Promise<ITooltipData>;
export type TRange = AtomTypes.Range | [TPosition, TPosition];
export type TPosition = AtomTypes.Point | [number, number];
export interface IMessageText {
    text: string;
    highlighter?: string;
}
export interface IMessageHTML {
    html: string;
}
export type TMessage = string | IMessageText | IMessageHTML;
export interface ITooltipData {
    range: TRange;
    text: TMessage | TMessage[];
    persistOnCursorMove?: boolean;
}

export interface IAtomMenuCommand {
    label: string;
    command: string;
}
export interface IAtomSubmenu {
    label: string;
    submenu: TAtomMenu[];
}
export type TAtomMenu = IAtomMenuCommand | IAtomSubmenu;
export type TSingleOrArray<T> = T | T[];
export interface ISetTypesParams {
    [severity: string]: ISeverityTabDefinition;
}
export interface ISeverityTabDefinition {
    uriFilter?: boolean;
    autoScroll?: boolean;
}
export type TTextBufferCallback = (buffer: AtomTypes.TextBuffer) => void;
export interface IControlSimpleDefinition {
    element: string;
    opts: IControlOpts;
}
export interface IControlCustomDefinition<T> {
    element: {
        new (arg: T): IElementObject<T>;
    };
    opts: T;
}
export interface IElementObject<T> {
    element: HTMLElement;
    update(props: T): Promise<void>;
}
export interface IControlOpts {
    id?: string;
    events?: {
        [key: string]: EventListener;
    };
    classes?: string[];
    style?: {
        [key: string]: string;
    };
    attrs?: {
        [key: string]: string;
    };
}
export type TControlDefinition<T> = IControlCustomDefinition<T> | IControlSimpleDefinition;
export interface IParamSpec<T> {
    onChanged: (value: T) => void;
    items: T[] | Promise<T[]> | (() => T[] | Promise<T[]>);
    itemTemplate: (item: T) => string;
    itemFilterKey: string;
    description?: string;
    displayName?: string;
    displayTemplate: (item: T) => string;
    default: T;
}
export type TTooltipHandler = (editor: AtomTypes.TextEditor, crange: AtomTypes.Range, type: TEventRangeType) => ITooltipData | undefined | Promise<ITooltipData | undefined>;
export interface IRegistrationOptions {
    name: string;
    menu?: {
        label: string;
        menu: TAtomMenu;
    };
    messageTypes?: ISetTypesParams;
    events?: {
        onWillSaveBuffer?: TSingleOrArray<TTextBufferCallback>;
        onDidSaveBuffer?: TSingleOrArray<TTextBufferCallback>;
        onDidStopChanging?: TSingleOrArray<TTextBufferCallback>;
    };
    controls?: Array<TControlDefinition<Object>>;
    params?: {
        [paramName: string]: IParamSpec<Object>;
    };
    tooltip?: TTooltipHandler | {
        priority?: number;
        handler: TTooltipHandler;
    };
}


export interface IShowTooltipParams {
    editor: AtomTypes.TextEditor;
    eventType?: TEventRangeType;
    detail?: Object;
    tooltip: TTooltipFunction | ITooltipData;
}

export type IUPIRegistration = (options: IRegistrationOptions) => IUPIInstance

export interface IUPIInstance {
  setMenu(name: string, menu: TAtomMenu[]): AtomTypes.Disposable;
  setStatus(status: IStatus): void;
  setMessages(messages: IResultItem[]): void;
  addMessageTab(name: string, opts: ISeverityTabDefinition): void;
  showTooltip({editor, eventType, detail, tooltip}: IShowTooltipParams): void;
  addPanelControl<T>(def: TControlDefinition<Object>): AtomTypes.Disposable;
  addConfigParam(paramName: string, spec: IParamSpec<Object>): AtomTypes.CompositeDisposable;
  getConfigParam(name: string): Promise<Object>;
  getOthersConfigParam(plugin: string, name: string): Promise<Object>;
  setConfigParam(name: string, value: Object): Promise<Object | undefined>;
  getEventRange(editor: AtomTypes.TextEditor, typeOrDetail: Object | TEventRangeType): {
      crange: AtomTypes.Range;
      pos: AtomTypes.Point;
      eventType: TEventRangeType;
  } | undefined;
  dispose(): void;
}
export interface IResultItem {
    uri?: string;
    position?: TPosition;
    message: TMessage;
    severity: TSeverity;
}
export type TSeverity = 'error' | 'warning' | 'lint' | string;
export interface INormalStatus {
    status: 'ready' | 'error' | 'warning';
}
export interface IProgressStatus {
    status: 'progress';
    progress?: number;
}
export type IStatus = (INormalStatus | IProgressStatus) & {
    detail: string;
};
}
