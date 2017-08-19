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

/////////////////////////////// provider ///////////////////////////////////////

export interface IUPIProvided {
  registerPlugin(
    disp: AtomTypes.CompositeDisposable, pluginName: string
  ): IUPIInstance | undefined;
}


/////////////////////////////// instance ///////////////////////////////////////

export declare interface IUPIInstance {
  /**
  Adds new sumbenu to 'Haskell IDE' menu item

  @param name submenu label, should be descriptive of a package
  @param menu Atom menu object
  */
  setMenu(name: string, menu: TAtomMenu[]): AtomTypes.IDisposable;
  /**
  Sets backend status

  @param status current backend status
  */
  setStatus(status: IStatus): void;
  /**
  Add messages to ide-haskell output

  @param messages array of messages
  @param types array, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  addMessages(newMessages: IResultItem[], types?: TSeverity[]): void;
  /**
  Set messages in ide-haskell output. Clears all existing messages with
  `severity` in `types`

  @param messages: array of messages
  @param types array, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  setMessages(newMessages: IResultItem[], types: TSeverity[]): void;
  /**
  Clear all existing messages with `severity` in `types`

  @param types message severities to clean out
  */
  clearMessages(types: TSeverity[]): void;
  /**
  Set possible message `severity` that your package will use.
  This allows definition of custom output panel tabs.

  @param types: Object with keys representing possible message `severity` (i.e. tab name)
         and values being Objects with keys
  */
  setMessageTypes(types: {
    [severity: string]: ISeverityTabDefinition;
  }): void;
  /**
  Editor event subscription. Fires when mouse cursor stopped over a symbol in
  editor.

  @param callback will be called to provide a tooltip once needed
  */
  onShouldShowTooltip(callback: TTooltipHandler): AtomTypes.IDisposable;
  /**
  Show tooltip in editor.

  @param editor editor that will show tooltip
  @param pos tooltip position
  @param eventType type of event
  @param detail DOM event detail, for automatic event type selection, ignored if `eventType` is set.
  @param tooltip tooltip generator function
  */
  showTooltip({ editor, pos, eventType, detail, tooltip }: IShowTooltipParams): void;
  /**
  Convenience function. Will fire before Haskell buffer is saved.
  */
  onWillSaveBuffer(callback: TTextBufferCallback): AtomTypes.IDisposable;
  /**
  Convenience function. Will fire after Haskell buffer is saved.
  */
  onDidSaveBuffer(callback: TTextBufferCallback): AtomTypes.IDisposable;
  /**
  Convenience function. Will fire after Haskell buffer stoped changing.
  */
  onDidStopChanging(callback: TTextBufferCallback): AtomTypes.IDisposable;
  /**
  Add a new control to ouptut panel heading.

  @param element HTMLElement of control, or string with tag name
  @param opts description of element
  */
  addPanelControl(element: string | HTMLElement, opts: IControlOpts): AtomTypes.IDisposable;
  /**
  Add per-project configuration parameters to be managed by ide-haskell. This
  will also add a control element to output panel.

  @param specs specification of parameters
  @param paramName name of a parameter
  */
  addConfigParam(specs: {
    [paramName: string]: IParamSpec<Object>;
  }): AtomTypes.IDisposable;
  /**
  Get value of a config parameter, either for this plugin, or for another
  named plugin. If value isn't set and default is `undefined`, will show
  a selection dialog.

  @returns `Promise` that resolves to parameter value. If user cancels selection
  dialog, it will resolve to `undefined`
  */
  getConfigParam(name: string): Promise<Object | undefined>;
  getConfigParam(otherPluginName: string, name: string): Promise<Object | undefined>;
  /**
  @param name Parameter name
  @param value If omitted, a selection dialog will be presented to user.

  @returns a `Promise` that resolves to parameter value. If `value` is `undefined`
  and user cancels selection dialog, resolves to `undefined`
  */
  setConfigParam(name: string, value?: Object): Promise<Object | undefined>;
  /**
  Utility function to extract event range/type for a given event

  @param editor editor that generated event
  @param detail event detail, ignored if `eventType` is set
  @param eventType type of event
  @param pos event position, can be undefined

  @param callback will be called immediately with event range/type as arguments
  */
  withEventRange<T>({ editor, detail, eventType, pos }: IEventRangeParams, callback: TEventRangeCallback<T>): T | undefined;
}
