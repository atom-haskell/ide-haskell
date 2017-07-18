export type TEventRangeType = UPI.TEventRangeType
export type TRange = AtomTypes.Range | [TPosition, TPosition];
export type TPosition = AtomTypes.Point | [number, number];

//////////////////////////////// message ///////////////////////////////////////

export interface IMessageText {
    text: string;
    highlighter?: string;
}
export interface IMessageHTML {
    html: string;
}
export type TMessage = string | IMessageText | IMessageHTML;

//////////////////////////////// tooltip ///////////////////////////////////////

export interface ITooltipData {
    range: TRange;
    text: TMessage | TMessage[];
    persistOnCursorMove?: boolean;
}
export type TTooltipHandler = (editor: AtomTypes.TextEditor, crange: AtomTypes.Range, type: TEventRangeType) => ITooltipData | undefined | Promise<ITooltipData | undefined>;

export type TTooltipFunction = (crange: AtomTypes.Range) => ITooltipData | Promise<ITooltipData>;
export interface IShowTooltipParams {
  editor: AtomTypes.TextEditor
  pos: TPosition
  eventType?: TEventRangeType
  detail?: Object
  tooltip: TTooltipFunction
}

export interface ISeverityTabDefinition {
    uriFilter?: boolean;
    autoScroll?: boolean;
}

///////////////////////////////// controls//////////////////////////////////////

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

////////////////////////////// check results ///////////////////////////////////

export interface IResultItem {
    uri?: string;
    position?: TPosition;
    message: TMessage;
    severity: TSeverity;
}
export type TSeverity = 'error' | 'warning' | 'lint' | string;

///////////////////////////////// status ///////////////////////////////////////

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

export interface IAtomMenuCommand {
  label: string
  command: string
}

export interface IAtomSubmenu {
  label: string
  submenu: TAtomMenu[]
}

export type TAtomMenu = IAtomMenuCommand | IAtomSubmenu

///////////////////////////////// event range //////////////////////////////////

export interface IEventRangeParams {
  editor: AtomTypes.TextEditor
  detail?: Object
  eventType?: TEventRangeType
  pos: TPosition
}

export type TEventRangeCallback<T> = (pars: {
  /** event position */
  pos: AtomTypes.Point
  /** event range */
  crange: AtomTypes.Range
  /** event type */
  eventType: TEventRangeType
}) => T

///////////////////////////////callbacks ///////////////////////////////////////

export type TTextBufferCallback = (buffer: AtomTypes.TextBuffer) => void;
