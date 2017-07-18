/// <reference path="typings/atom.d.ts"/>
/// <reference path="typings/etch.d.ts"/>

declare module 'utils/message-object' {
  export interface IMessageText {
      text: string;
      highlighter?: string;
  }
  export interface IMessageHTML {
      html: string;
  }
  export type TMessage = string | IMessageText | IMessageHTML | MessageObject;
  export class MessageObject {
      private msg;
      static fromObject(message: TMessage): MessageObject;
      private htmlCache?;
      constructor(msg: string | IMessageText | IMessageHTML);
      toHtml(linter?: boolean): string;
      raw(): string | IMessageHTML;
  }

}
declare module 'utils/cast' {
  import Dock = AtomTypes.Dock;
  import WorkspaceCenter = AtomTypes.WorkspaceCenter;
  export function isDock(object: Dock | WorkspaceCenter): object is Dock;

}
declare module 'utils/element-listener' {
  import { Disposable } from 'atom';
  export function listen(element: HTMLElement, event: string, selector: string, callback: (event: Event) => void): Disposable;

}
declare module 'utils' {
  import { TextEditor } from 'atom';
  export { MessageObject, TMessage } from 'utils/message-object';
  export * from 'utils/cast';
  export * from 'utils/element-listener';
  export const MAIN_MENU_LABEL = "Haskell IDE";
  export function getEventType(detail: any): "context" | "keyboard";
  export function bufferPositionFromMouseEvent(editor: TextEditor, event: MouseEvent): AtomTypes.Point | undefined;

}
declare module 'results-db/result-item' {
  import { Point } from 'atom';
  import { TMessage, MessageObject } from 'utils';
  export type TSeverity = 'error' | 'warning' | 'lint' | string;
  export type TPosition = Point | [number, number];
  export interface IResultItem {
      uri?: string;
      position?: TPosition;
      message: TMessage;
      severity: TSeverity;
      context?: string;
  }
  export class ResultItem {
      readonly providerId: number;
      readonly uri?: string;
      readonly position?: Point;
      readonly message: MessageObject;
      readonly severity: TSeverity;
      readonly context?: string;
      private _isValid;
      constructor(providerId: number, {uri, message, severity, position, context}: IResultItem);
      isValid(): boolean;
      setValid(isValid: boolean): void;
      hash(): string;
  }

}
declare module 'results-db/provider' {
  import { IResultItem } from 'results-db/result-item';
  import { ResultsDB } from 'results-db';
  export type TMessageProviderFunction = (pushMessages: (messages: IResultItem[]) => void) => void;
  export class Provider {
      private parent;
      readonly id: number;
      private disposed;
      constructor(parent: ResultsDB, id: number);
      dispose(): void;
      setMessages(messages: IResultItem[]): void;
  }

}
declare module 'results-db' {
  import { TPosition, TSeverity, IResultItem, ResultItem } from 'results-db/result-item';
  import { Provider, TMessageProviderFunction } from 'results-db/provider';
  export { TPosition, TSeverity, IResultItem, TMessageProviderFunction, ResultItem };
  export type TUpdateCallback = (severities: TSeverity[]) => void;
  export class ResultsDB {
      private currentId;
      private messages;
      private disposables;
      private emitter;
      constructor();
      destroy(): void;
      onDidUpdate(callback: TUpdateCallback): AtomTypes.Disposable;
      didUpdate(providerId: number, msgs: ResultItem[]): void;
      registerProvider(): Provider;
      results(): IterableIterator<ResultItem>;
      filter(f: (item: ResultItem) => boolean): IterableIterator<ResultItem>;
      isEmpty(): boolean;
  }

}
declare module 'output-panel/views/output-panel-button' {
  export interface IProps extends JSX.Props {
      active: boolean;
      name: string;
      count: number;
      onClick: () => void;
  }
  export class Button implements JSX.ElementClass {
      props: IProps;
      constructor(props: IProps);
      render(): JSX.Element;
      update(props: IProps): Promise<void>;
      destroy(): Promise<void>;
  }

}
declare module 'output-panel/views/output-panel-buttons' {
  export interface ISeverityTabDefinition {
      uriFilter?: boolean;
      autoScroll?: boolean;
  }
  export interface IBtnDesc {
      name: string;
      count: number;
      onClick: () => void;
      uriFilter: boolean;
      autoScroll: boolean;
  }
  export interface IProps extends JSX.Props {
      onChange?: (btn: string) => void;
  }
  export class OutputPanelButtons implements JSX.ElementClass {
      props: IProps;
      private buttons;
      private activeBtn;
      constructor(props: IProps);
      render(): JSX.Element;
      update(props?: IProps): Promise<void>;
      createButton(btn: string, {uriFilter, autoScroll}?: ISeverityTabDefinition): void;
      options(btn: string): IBtnDesc | undefined;
      buttonNames(): string[];
      setCount(btn: string, count: number): void;
      getCount(btn: string): number | undefined;
      setActive(btn: string): void;
      destroy(): Promise<void>;
      getActive(): string;
      private renderButtons();
  }

}
declare module 'output-panel/views/output-panel-checkbox' {
  export interface IProps extends JSX.Props {
      initialState?: boolean;
      class?: string;
      onSwitched?: (state: boolean) => void;
      enabledHint?: string;
      disabledHint?: string;
  }
  export class OutputPanelCheckbox implements JSX.ElementClass {
      props: IProps;
      private disposables;
      private element;
      private state;
      constructor(props?: IProps);
      render(): JSX.Element;
      update(props?: IProps): Promise<void>;
      getState(): boolean;
      destroy(): Promise<void>;
      private setState(state);
      private toggleState();
      private tooltipTitle();
  }

}
declare module 'output-panel/views/progress-bar' {
  export interface IProps extends JSX.Props {
      progress: number[];
  }
  export class ProgressBar implements JSX.ElementClass {
      props: IProps;
      constructor(props: IProps);
      render(): JSX.Element;
      update(props: IProps): Promise<void>;
      destroy(): Promise<void>;
      private aveProgress();
  }

}
declare module 'output-panel/views/output-panel-item' {
  import { ResultItem } from 'results-db';
  export interface IProps extends JSX.Props {
      model: ResultItem;
  }
  export class OutputPanelItem implements JSX.ElementClass {
      props: IProps;
      element: HTMLElement;
      constructor(props: IProps);
      render(): JSX.Element;
      update(props: IProps): Promise<void>;
      destroy(): Promise<void>;
      clickPosition(): Promise<void>;
      private renderPosition();
      private renderContext();
  }

}
declare module 'output-panel/views/output-panel-items' {
  import { ResultsDB, ResultItem } from 'results-db';
  export interface IProps extends JSX.Props {
      model: ResultsDB;
      filter: (item: ResultItem) => boolean;
  }
  export class OutputPanelItems implements JSX.ElementClass {
      props: IProps;
      private element;
      private itemMap;
      constructor(props: IProps);
      render(): JSX.Element;
      update(props: IProps): Promise<void>;
      destroy(): Promise<void>;
      showItem(item: ResultItem): Promise<void>;
      scrollToEnd(): Promise<void>;
      atEnd(): boolean;
      private renderItems();
  }

}
declare module 'output-panel/views/status-icon' {
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
  export interface IProps extends JSX.Props {
      statusMap: Map<string, IStatus>;
  }
  export class StatusIcon implements JSX.ElementClass {
      props: IProps;
      private disposables;
      private element;
      constructor(props: IProps);
      render(): JSX.Element;
      update(props: IProps): Promise<void>;
      destroy(): Promise<void>;
      private calcCurrentStatus();
  }

}
declare module 'output-panel' {
  import { Disposable } from 'atom';
  import { ISeverityTabDefinition } from 'output-panel/views/output-panel-buttons';
  import { ResultsDB, ResultItem, TSeverity } from 'results-db';
  import { IStatus } from 'output-panel/views/status-icon';
  export { ISeverityTabDefinition, IStatus };
  export interface IElementObject<T> {
      element: HTMLElement;
      update(props: T): Promise<void>;
  }
  export interface IState {
      fileFilter?: boolean;
      activeTab?: string;
  }
  export type TPanelPosition = 'bottom' | 'left' | 'top' | 'right';
  export interface ISetTypesParams {
      [severity: string]: ISeverityTabDefinition;
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
  export type TControlDefinition<T> = IControlCustomDefinition<T> | IControlSimpleDefinition;
  export class OutputPanel {
      private state;
      private results;
      private refs;
      private elements;
      private disposables;
      private currentResult;
      private statusMap;
      private progress;
      private itemFilter;
      constructor(state: IState, results: ResultsDB);
      render(): JSX.Element;
      update(): Promise<void>;
      destroy(): Promise<void>;
      reallyDestroy(): Promise<void>;
      toggle(): Promise<void>;
      show(): Promise<void>;
      hide(): Promise<void>;
      getTitle(): string;
      getDefaultLocation(): any;
      addPanelControl<T>({element, opts}: TControlDefinition<T>): Disposable;
      updateItems(): void;
      activateTab(tab: string): void;
      activateFirstNonEmptyTab(severities: TSeverity[]): void;
      showItem(item: ResultItem): void;
      getActiveTab(): string;
      createTab(name: string, opts: ISeverityTabDefinition): void;
      serialize(): IState;
      backendStatus(pluginName: string, st: IStatus): void;
      showNextError(): void;
      showPrevError(): void;
  }

}
declare module 'config-params/param-select-view' {
  export interface ISelectListParams<T> {
      items: T[] | Promise<T[]>;
      heading?: string;
      itemTemplate?: (item: T) => string;
      itemFilterKey?: string | ((item: T) => string);
      itemElement?: (item: T) => HTMLElement;
  }
  export function selectListView<T>({items, heading, itemTemplate, itemFilterKey, itemElement}: ISelectListParams<T>): Promise<T | undefined>;

}
declare module 'config-params/param-store' {
  import { Disposable } from 'atom';
  export interface IParamSpec<T> {
      itemFilterKey: string;
      description?: string;
      displayName?: string;
      default?: T;
      items: T[] | Promise<T[]> | (() => T[] | Promise<T[]>);
      onChanged(value: T): void;
      itemTemplate(item: T): string;
      displayTemplate(item: T): string;
  }
  export interface IState {
      [pluginNameParamName: string]: Object;
  }
  export type TUpdatedCallback = (arg: {
      pluginName: string;
      paramName: string;
      value: Object;
  }) => void;
  export class ConfigParamStore {
      private disposables;
      private emitter;
      private saved;
      private plugins;
      constructor(state?: IState);
      serialize(): IState;
      destroy(): void;
      onDidUpdate(callback: TUpdatedCallback): Disposable;
      addParamSpec<T>(pluginName: string, paramName: string, spec: IParamSpec<T>): Disposable;
      setValue(pluginName: string, paramName: string, value?: Object): Promise<Object | undefined>;
      getValue(pluginName: string, paramName: string): Promise<Object | undefined>;
      getValueRaw(pluginName: string, paramName: string): Object | undefined;
      private getParamConfig(pluginName, paramName, reason);
      private showSelect<T>(spec);
  }

}
declare module 'config-params/param-control' {
  import { IParamSpec, ConfigParamStore } from 'config-params/param-store';
  import { IElementObject } from 'output-panel';
  export interface IProps<T> {
      pluginName: string;
      name: string;
      spec: IParamSpec<T>;
      store: ConfigParamStore;
  }
  export class ParamControl<T> implements IElementObject<IProps<T>> {
      element: HTMLElement;
      private pluginName;
      private name;
      private spec;
      private store;
      private disposables;
      private hiddenValue?;
      private value;
      private storeDisposable?;
      constructor({pluginName, name, spec, store}: IProps<T>);
      render(): JSX.Element;
      update(props?: IProps<T>): Promise<void>;
      setValue(e?: T): Promise<void>;
      destroy(): Promise<void>;
      private initStore();
      private initSpec();
      private tooltipTitle();
  }

}
declare module 'config-params' {
  import { CompositeDisposable } from 'atom';
  import { IParamSpec, IState as IStoreState } from 'config-params/param-store';
  export { IParamSpec };
  import { OutputPanel } from 'output-panel'; type IState = IStoreState;
  export { IState };
  export class ConfigParamManager {
      private outputPanel;
      private store;
      constructor(outputPanel: OutputPanel, state: IState);
      destroy(): void;
      serialize(): IStoreState;
      add(pluginName: string, paramName: string, spec: IParamSpec<Object>): CompositeDisposable;
      get(pluginName: string, name: string): Promise<Object | undefined>;
      set(pluginName: string, name: string, value?: Object): Promise<Object | undefined>;
  }

}
declare module 'editor-control/tooltip-view' {
  import { MessageObject } from 'utils';
  export class TooltipMessage {
      private message;
      private element;
      constructor(message: MessageObject | MessageObject[]);
      render(): JSX.Element;
      update(): Promise<void>;
      writeAfterUpdate(): void;
  }

}
declare module 'editor-control/event-table' {
  import { TextEditor, DisplayMarkerLayer } from 'atom';
  export const TEventRangeType: {
      context: "context";
      keyboard: "keyboard";
      mouse: "mouse";
      selection: "selection";
  };
  export function isTEventRangeType(x: Object): x is TEventRangeType;
  export type TEventRangeType = keyof typeof TEventRangeType;
  export type IMarkerGroup = Array<{
      type: TEventRangeType;
      source?: string;
  }>;
  export class EventTable {
      private editor;
      private table;
      private layers;
      constructor(editor: TextEditor, groups: IMarkerGroup[]);
      destroy(): void;
      get(type: TEventRangeType, source?: string): DisplayMarkerLayer;
      clear(): void;
      getMarkerCount(): number;
      keys(): string[];
      values(): IterableIterator<any>;
      entries(): IterableIterator<any[]>;
  }

}
declare module 'editor-control/tooltip-manager' {
  import { Range, TextEditor } from 'atom';
  import { MessageObject } from 'utils';
  import { TEventRangeType } from 'editor-control/event-table';
  export { TEventRangeType };
  export interface IMarkerProperties {
      persistOnCursorMove: boolean;
  }
  export class TooltipManager {
      private editor;
      private markers;
      private editorElement;
      constructor(editor: TextEditor);
      dispose(): void;
      show(range: Range, text: MessageObject | MessageObject[], type: TEventRangeType, source: string, detail: IMarkerProperties): void;
      hide(type?: TEventRangeType, source?: string, template?: IMarkerProperties): void;
      has(type?: TEventRangeType, source?: string, template?: IMarkerProperties): number | boolean;
      private decorate(marker, tooltipView);
  }

}
declare module 'tooltip-registry' {
  import { TextEditor, Disposable, Range } from 'atom';
  import { TMessage } from 'utils';
  import { PluginManager } from 'plugin-manager';
  import { TEventRangeType } from 'editor-control/tooltip-manager';
  import { TPosition } from 'results-db';
  export type TTooltipFunction = (crange: Range) => ITooltipData | Promise<ITooltipData>;
  export type TRange = Range | [TPosition, TPosition];
  export interface ITooltipData {
      range: TRange;
      text: TMessage | TMessage[];
      persistOnCursorMove?: boolean;
  }
  export type TTooltipHandler = (editor: TextEditor, crange: Range, type: TEventRangeType) => ITooltipData | undefined | Promise<ITooltipData | undefined>;
  export interface TTooltipHandlerSpec {
      priority: number;
      handler: TTooltipHandler;
      eventTypes?: TEventRangeType[];
  }
  export interface ITooltipSpec {
      pluginName: string;
      tooltip: TTooltipFunction | ITooltipData;
  }
  export class TooltipRegistry {
      private pluginManager;
      private providers;
      constructor(pluginManager: PluginManager);
      dispose(): void;
      register(pluginName: string, provider: TTooltipHandlerSpec): Disposable;
      showTooltip(editor: TextEditor, type: TEventRangeType, spec?: ITooltipSpec): Promise<void>;
      hideTooltip(editor: TextEditor, type?: TEventRangeType, source?: string): void;
      private defaultTooltipFunction(editor, type, crange);
  }

}
declare module 'editor-control' {
  import { Range, TextEditor, Point, TextBuffer } from 'atom';
  import { TooltipManager, TEventRangeType } from 'editor-control/tooltip-manager';
  import { PluginManager, IEditorController } from 'plugin-manager';
  export type TTextBufferCallback = (buffer: TextBuffer) => void;
  export type TEventRangeResult = {
      crange: Range;
      pos: Point;
      eventType: TEventRangeType;
  } | undefined;
  export { TEventRangeType };
  export class EditorControl implements IEditorController {
      private editor;
      tooltips: TooltipManager;
      private disposables;
      private lastMouseBufferPt?;
      private exprTypeTimeout?;
      private selTimeout?;
      private editorElement;
      private tooltipRegistry;
      constructor(editor: TextEditor, pluginManager: PluginManager);
      destroy(): void;
      getEventRange(eventType: TEventRangeType): TEventRangeResult;
      private shouldShowTooltip(pos, type);
      private trackMouseBufferPosition(e);
      private stopTrackingMouseBufferPosition(e);
      private trackSelection({newBufferRange});
      private handleCursorUnderTooltip(currentRange);
  }

}
declare module 'src/linter-support/linter' {
  import {Range} from 'atom'

  interface Fix {
    range: Range,
    newText: string,
    oldText?: string
  }

  interface Trace {
    type: 'Trace',
    text?: string,
    html?: string,
    name?: string,
    // ^ Only specify this if you want the name to be something other than your linterProvider.name
    // WARNING: There is NO replacement for this in v2
    filePath?: string,
    // ^ MUST be an absolute path (relative paths are not supported)
    range?: Range,
    class?: string,
    severity?: 'error' | 'warning' | 'info'
  }

  interface ILinterMessage {
    // Automatically added for internal Linter use, do not specify in a provider
    // key: string,
    // version: 1,
    // linterName: string,

    // From providers
    type: string,
    text?: string,
    html?: string,
    name?: string,
    // ^ Only specify this if you want the name to be something other than your linterProvider.name
    // WARNING: There is NO replacement for this in v2
    filePath?: string,
    // ^ MUST be an absolute path (relative paths are not supported)
    range?: Range,
    trace?: Array<Trace>,
    fix?: Fix,
    severity?: 'error' | 'warning' | 'info',
    selected?: Function
    // ^ WARNING: There is NO replacement for this in v2
  }

  export interface ILinter {
    deleteMessages (): void
    setMessages (messages: ILinterMessage[]): void
    dispose (): void
  }


  export interface ILinterRegistry {
    register: (arg: {name: string}) => ILinter
  }

}

declare module 'check-results-provider/editor-control' {
  import { TextEditor, Point } from 'atom';
  import { MessageObject } from 'utils';
  import { TEventRangeType } from 'editor-control/tooltip-manager';
  import { PluginManager, IEditorController } from 'plugin-manager';
  export class CREditorControl implements IEditorController {
      private editor;
      private gutter;
      private gutterElement;
      private markers;
      private disposables;
      private markerProps;
      private tooltipRegistry;
      private resultsDB;
      constructor(editor: TextEditor, pluginManager: PluginManager);
      destroy(): void;
      getMessageAt(pos: Point, type: TEventRangeType | 'gutter'): MessageObject[];
      private registerGutterEvents();
      private updateResults();
      private markerFromCheckResult(resItem);
      private decorateMarker(m, r);
      private find(pos, type);
  }

}
declare module 'check-results-provider' {
  import { TextEditor } from 'atom';
  import { PluginManager } from 'plugin-manager';
  export class CheckResultsProvider {
      private disposables;
      private editorMap;
      constructor(editor: TextEditor, pluginManager: PluginManager);
      destroy(): void;
      private tooltipProvider(editor, crange, type);
  }

}
declare module 'status-bar' {
  import { IStatus, OutputPanel } from 'output-panel';
  export interface ITile {
      getPriority(): number;
      getItem(): Object;
      destroy(): void;
  }
  export interface IStatusBar {
      addLeftTile(params: {
          item: Object;
          priority: number;
      }): ITile;
      addRightTile(params: {
          item: Object;
          priority: number;
      }): ITile;
  }
  export class StatusBarView {
      private panel;
      element: HTMLElement;
      private statusMap;
      constructor(panel: OutputPanel);
      render(): JSX.Element;
      update(): Promise<void>;
      backendStatus(pluginName: string, st: IStatus): void;
      destroy(): Promise<void>;
      private didClick();
  }

}
declare module 'plugin-manager' {
  import { TextEditor, TextBuffer, Disposable } from 'atom';
  import { ResultsDB } from 'results-db';
  import { OutputPanel, IState as IOutputViewState, IStatus } from 'output-panel';
  import { ConfigParamManager, IState as IParamState } from 'config-params';
  import { EditorControl, TTextBufferCallback } from 'editor-control';
  import { TooltipRegistry } from 'tooltip-registry';
  import { IStatusBar } from 'status-bar';
  export { IParamState, IOutputViewState };
  export type TEventType = 'keyboard' | 'context' | 'mouse' | 'selection';
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
  export type ECMap<T extends IEditorController> = WeakMap<TextEditor, T>;
  export class PluginManager {
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
      private statusBarTile?;
      private statusBarView?;
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
      nextError(): void;
      prevError(): void;
      backendStatus(pluginName: string, st: IStatus): void;
      removeController(editor: TextEditor): void;
      addEditorController(factory: IEditorControllerFactory, map?: ECMap<IEditorController>): void;
      setStatusBar(sb: IStatusBar): void;
      removeStatusBar(): void;
      private controllerOnGrammar(editor, grammar);
      private subscribeEditorController();
      private deleteEditorControllers();
      private addController(editor);
  }

}
declare module 'prettify/util-run-filter' {
  export interface IRunFilterArgs {
      command: string;
      args: string[];
      cwd: string;
      stdin?: string;
  }
  export function runFilter({command, args, cwd, stdin}: IRunFilterArgs): Promise<{}>;

}
declare module 'prettify/util-cabal-format' {
  export function format(text: string, workingDirectory: string): Promise<string>;

}
declare module 'prettify/util-stylish-haskell' {
  export function format(text: string, workingDirectory: string): Promise<{}>;

}
declare module 'prettify' {
  import { TextEditor } from 'atom';
  export function prettifyFile(editor: TextEditor, format?: string): Promise<void>;

}
declare module 'upi-2/dummy-element' {
  import { IControlOpts } from 'output-panel';
  export class DummyElement {
      private opts;
      element: HTMLElement;
      constructor(opts: IControlOpts & {
          element: HTMLElement;
      });
      update(opts: IControlOpts & {
          element: HTMLElement;
      }): Promise<void>;
      private init();
  }

}
declare module 'upi-2' {
  import { CompositeDisposable, Point, TextEditor, Range } from 'atom';
  import { PluginManager } from 'plugin-manager';
  import { IStatus, ISeverityTabDefinition, IControlOpts } from 'output-panel';
  import { IResultItem, TSeverity } from 'results-db';
  import { TEventRangeType } from 'editor-control/tooltip-manager';
  import { TPosition } from 'results-db';
  import { IParamSpec } from 'config-params';
  import { TTextBufferCallback } from 'editor-control';
  import { TTooltipHandler, TTooltipFunction } from 'tooltip-registry';
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
  export type TAtomMenu = IAtomMenuCommand | IAtomSubmenu;
  export type TEventRangeCallback<T> = (pars: {
      pos: Point;
      crange: Range;
      eventType: TEventRangeType;
  }) => T;
  export function instance(pluginManager: PluginManager, outerDisposables: CompositeDisposable, pluginName: string): UPIInstance;
  export class UPIInstance {
      private pluginManager;
      private pluginName;
      private messages;
      private disposables;
      private messageProvider;
      constructor(pluginManager: PluginManager, outerDisposables: CompositeDisposable, pluginName: string);
      setMenu(name: string, menu: TAtomMenu[]): AtomTypes.Disposable;
      setStatus(status: IStatus): void;
      addMessages(newMessages: IResultItem[], types?: TSeverity[]): void;
      setMessages(newMessages: IResultItem[], types: TSeverity[]): void;
      clearMessages(types: TSeverity[]): void;
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
      getConfigParam(name: string): Promise<Object | undefined>;
      getConfigParam(otherPluginName: string, name: string): Promise<Object | undefined>;
      setConfigParam(name: string, value?: Object): Promise<Object | undefined>;
      withEventRange<T>({editor, detail, eventType, pos}: IEventRangeParams, callback: TEventRangeCallback<T>): T | undefined;
  }

}
declare module 'upi-3/instance' {
  import { CompositeDisposable, TextEditor } from 'atom';
  import { PluginManager } from 'plugin-manager';
  import { IStatus, ISeverityTabDefinition, TControlDefinition } from 'output-panel';
  import { IResultItem } from 'results-db';
  import { TEventRangeType } from 'editor-control/tooltip-manager';
  import { IParamSpec } from 'config-params';
  import { TTooltipFunction, ITooltipData } from 'tooltip-registry';
  import { TAtomMenu, IRegistrationOptions } from 'upi-3';
  export interface IShowTooltipParams {
      editor: TextEditor;
      eventType?: TEventRangeType;
      detail?: Object;
      tooltip: TTooltipFunction | ITooltipData;
  }
  export function instance(pluginManager: PluginManager, options: IRegistrationOptions): {
      setMenu(name: string, menu: TAtomMenu[]): AtomTypes.Disposable;
      setStatus(status: IStatus): void;
      setMessages(messages: IResultItem[]): void;
      addMessageTab(name: string, opts: ISeverityTabDefinition): void;
      showTooltip({editor, eventType, detail, tooltip}: IShowTooltipParams): void;
      addPanelControl<T>(def: TControlDefinition<T>): AtomTypes.Disposable;
      addConfigParam(paramName: string, spec: IParamSpec<Object>): CompositeDisposable;
      getConfigParam(name: string): Promise<Object | undefined>;
      getOthersConfigParam(plugin: string, name: string): Promise<Object | undefined>;
      setConfigParam(name: string, value: Object): Promise<Object | undefined>;
      getEventRange(editor: TextEditor, typeOrDetail: Object | "context" | "keyboard" | "mouse" | "selection"): {
          crange: AtomTypes.Range;
          pos: AtomTypes.Point;
          eventType: "context" | "keyboard" | "mouse" | "selection";
      } | undefined;
      dispose(): void;
  };

}
declare module 'upi-3' {
  import { Disposable } from 'atom';
  import { PluginManager } from 'plugin-manager';
  import { TTextBufferCallback, TEventRangeType } from 'editor-control';
  import { ISetTypesParams, TControlDefinition } from 'output-panel';
  import { IParamSpec } from 'config-params';
  import { TTooltipHandler } from 'tooltip-registry';
  export * from 'upi-3/instance';
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
          eventTypes?: TEventRangeType[];
      };
  }
  export function consume(pluginManager: PluginManager, options: IRegistrationOptions): Disposable;

}
declare module 'ide-haskell' {
  import { CompositeDisposable, Disposable } from 'atom';
  import * as UPI3 from 'upi-3';
  import { IShowTooltipParams } from 'upi-3';
  import { IStatus, ISeverityTabDefinition, TControlDefinition } from 'output-panel';
  import { IResultItem } from 'results-db';
  import { IParamSpec } from 'config-params';

  export function provideUpi3(): (options: UPI3.IRegistrationOptions) => {
      setMenu(name: string, menu: UPI3.TAtomMenu[]): Disposable;
      setStatus(status: IStatus): void;
      setMessages(messages: IResultItem[]): void;
      addMessageTab(name: string, opts: ISeverityTabDefinition): void;
      showTooltip({editor, eventType, detail, tooltip}: IShowTooltipParams): void;
      addPanelControl<T>(def: TControlDefinition<T>): Disposable;
      addConfigParam(paramName: string, spec: IParamSpec<Object>): CompositeDisposable;
      getConfigParam(name: string): Promise<Object | undefined>;
      getOthersConfigParam(plugin: string, name: string): Promise<Object | undefined>;
      setConfigParam(name: string, value: Object): Promise<Object | undefined>;
      getEventRange(editor: AtomTypes.TextEditor, typeOrDetail: Object | "context" | "keyboard" | "mouse" | "selection"): {
          crange: AtomTypes.Range;
          pos: AtomTypes.Point;
          eventType: "context" | "keyboard" | "mouse" | "selection";
      } | undefined;
      dispose(): void;
  } | undefined;
  export function consumeUpi3(registration: UPI3.IRegistrationOptions): Disposable | undefined;
}
