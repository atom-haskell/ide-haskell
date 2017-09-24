import * as etch from 'etch'
import { Disposable, CompositeDisposable } from 'atom'
import { IBtnDesc, OutputPanelButtons } from './views/output-panel-buttons'
import { OutputPanelCheckbox } from './views/output-panel-checkbox'
import { ProgressBar } from './views/progress-bar'
import { OutputPanelItems } from './views/output-panel-items'
import { ResultsDB, ResultItem } from '../results-db'
import { StatusIcon } from './views/status-icon'
import { isDock, isSimpleControlDef } from '../utils'
const $ = etch.dom

export interface IState {
  fileFilter: boolean
  activeTab: string
}

export type TPanelPosition = 'bottom' | 'left' | 'top' | 'right'

export class OutputPanel {
  // tslint:disable-next-line:no-uninitialized
  private refs: {
    items?: OutputPanelItems
  }
  private elements: Set<JSX.Element> = new Set()
  private disposables: CompositeDisposable = new CompositeDisposable()
  private currentResult: number = 0
  private statusMap: Map<string, UPI.IStatus> = new Map()
  private progress: number[] = []
  private tabs: Map<string, IBtnDesc> = new Map()
  private itemFilter?: (item: ResultItem) => boolean
  private results?: ResultsDB
  constructor(private state: IState = {fileFilter: false, activeTab: 'error'}) {
    etch.initialize(this)

    for (const tab of ['error', 'warning', 'lint']) {
      this.createTab(tab, {})
    }

    this.disposables.add(atom.workspace.onDidChangeActivePaneItem(() => {
      if (this.state.fileFilter) this.updateItems()
    }))
    setImmediate(async () => {
      await this.show()
      if (atom.config.get('ide-haskell.autoHideOutput')) {
        this.hide()
      }
    })
  }

  public connectResults(results: ResultsDB) {
    if (this.results) throw new Error('Results already connected!')
    this.results = results

    const didUpdate = (severities: UPI.TSeverity[]) => {
      this.currentResult = 0
      this.updateItems()
      if (atom.config.get('ide-haskell.autoHideOutput') && (!this.results || this.results.isEmpty(severities))) {
        this.hide()
      } else if (atom.config.get('ide-haskell.switchTabOnCheck')) {
        this.show()
        this.activateFirstNonEmptyTab(severities)
      }
    }

    this.disposables.add(this.results.onDidUpdate(didUpdate))
    this.update()
  }

  public render() {
    if (!this.results) {
      return <ide-haskell-panel/>
    }
    return (
      <ide-haskell-panel>
        <ide-haskell-panel-heading>
          <StatusIcon statusMap={this.statusMap} />
          <OutputPanelButtons
            buttons={Array.from(this.tabs.values())}
            activeBtn={this.state.activeTab}
          />
          <OutputPanelCheckbox
            class="ide-haskell-checkbox--uri-filter"
            state={this.state.fileFilter || false}
            onSwitched={this.switchFileFilter}
            enabledHint="Show current file messages"
            disabledHint="Show all project messages"
          />
          {Array.from(this.elements.values())}
          <ProgressBar progress={this.progress} />
        </ide-haskell-panel-heading>
        <OutputPanelItems
          model={this.results}
          filter={this.itemFilter || (() => true)}
          ref="items"
        />
      </ide-haskell-panel>
    )
  }

  public async update() {
    return etch.update(this)
  }

  public destroy() {
    this.hide()
  }

  public async reallyDestroy() {
    await etch.destroy(this)
    this.disposables.dispose()
  }

  public async toggle() {
    const pane = atom.workspace.paneContainerForItem(this)
    if (!pane || isDock(pane) && !pane.isVisible()) {
      return this.show()
    } else {
      return this.hide()
    }
  }

  public async show() {
    await atom.workspace.open(this, { searchAllPanes: true, activatePane: false })
    const pane = atom.workspace.paneContainerForItem(this)
    if (pane && isDock(pane)) { pane.show() }
  }

  public hide() {
    const pane = atom.workspace.paneContainerForItem(this)
    if (pane && isDock(pane)) { atom.workspace.hide(this) }
  }

  public getTitle() {
    return 'IDE-Haskell'
  }

  public getURI() {
    return `ide-haskell://output-panel/`
  }

  public getDefaultLocation() {
    return atom.config.get('ide-haskell.panelPosition')
  }

  public addPanelControl<T>(def: UPI.TControlDefinition<T>) {
    let newElement: JSX.Element
    if (isSimpleControlDef(def)) {
      const { events, classes, style, attrs } = def.opts
      const props: { [key: string]: Object } = {}
      if (classes) { props.class = classes.join(' ') }
      if (style) { props.style = style }
      if (attrs) { props.attributes = attrs }
      if (events) { props.on = events }

      newElement = $(def.element, props)
    } else {
      newElement = $(def.element, def.opts)
    }
    this.elements.add(newElement)
    this.update()
    return new Disposable(() => {
      this.elements.delete(newElement)
      this.update()
    })
  }

  public async updateItems() {
    const activeTab = this.getActiveTab()
    let currentUri: string | undefined
    if (this.state.fileFilter) {
      const ed = atom.workspace.getActiveTextEditor()
      currentUri = ed && ed.getPath()
    }
    let scroll: boolean = false
    if (activeTab) {
      const ato = this.tabs.get(activeTab)
      if (currentUri && ato && ato.uriFilter) {
        this.itemFilter = ({ uri, severity }) => (severity === activeTab) && (uri === currentUri)
      } else {
        this.itemFilter = ({ severity }) => severity === activeTab
      }
      scroll = (ato && ato.autoScroll && this.refs.items && this.refs.items.atEnd()) || false
    }

    if (this.results) {
      for (const [btn, ato] of this.tabs.entries()) {
        ato.count = Array.from(this.results.filter(({ severity }) => (severity === btn))).length
      }
    }

    await this.update()

    if (scroll && this.refs.items) this.refs.items.scrollToEnd()
  }

  public activateTab(tab: string) {
    this.state.activeTab = tab
    this.updateItems()
  }

  public activateFirstNonEmptyTab(severities: UPI.TSeverity[]) {
    const sevs: UPI.TSeverity[] = severities
    for (const i of sevs) {
      const tab = this.tabs.get(i)
      if (!tab) continue
      const count = tab.count
      if (count && count > 0) {
        this.activateTab(i)
        break
      }
    }
  }

  public showItem(item: ResultItem) {
    this.activateTab(item.severity)
    this.refs.items && this.refs.items.showItem(item)
  }

  public getActiveTab() {
    return this.state.activeTab
  }

  public createTab(
    name: string,
    { uriFilter = true, autoScroll = false }: UPI.ISeverityTabDefinition,
  ) {
    if (!Array.from(this.tabs.keys()).includes(name)) {
      this.tabs.set(name, {
        name,
        count: 0,
        onClick: () => this.activateTab(name),
        uriFilter,
        autoScroll,
      })
      this.state.activeTab && this.activateTab(this.state.activeTab)
    }
    this.update()
  }

  public serialize(): IState & {deserializer: 'ide-haskell/OutputPanel'} {
    return {
      ...this.state,
      deserializer: 'ide-haskell/OutputPanel',
    }
  }

  public backendStatus(pluginName: string, st: UPI.IStatus) {
    this.statusMap.set(pluginName, st)
    this.progress =
      Array.from(this.statusMap.values())
        .reduce(
        (cv, i) => {
          if (i.status === 'progress' && i.progress !== undefined) {
            cv.push(i.progress)
          }
          return cv
        },
        [] as number[],
      )
    this.update()
  }

  public showNextError() {
    if (!this.results) return
    const rs = Array.from(this.results.filter(({ uri }) => !!uri))
    if (rs.length === 0) { return }

    this.currentResult++
    if (this.currentResult >= rs.length) { this.currentResult = 0 }

    this.showItem(rs[this.currentResult])
  }

  public showPrevError() {
    if (!this.results) return
    const rs = Array.from(this.results.filter(({ uri }) => !!uri))
    if (rs.length === 0) { return }

    this.currentResult--
    if (this.currentResult < 0) { this.currentResult = rs.length - 1 }

    this.showItem(rs[this.currentResult])
  }

  private switchFileFilter = () => {
    this.state.fileFilter = !this.state.fileFilter
    this.updateItems()
  }
}
