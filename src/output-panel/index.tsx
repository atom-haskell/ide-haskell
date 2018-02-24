import * as etch from 'etch'
import { Disposable, CompositeDisposable } from 'atom'
import { IBtnDesc, OutputPanelButtons } from './views/output-panel-buttons'
import { OutputPanelCheckbox } from './views/output-panel-checkbox'
import { ProgressBar } from './views/progress-bar'
import { OutputPanelItems } from './views/output-panel-items'
import { ResultsDB, ResultItem } from '../results-db'
import { StatusIcon } from './views/status-icon'
import { isDock, isSimpleControlDef } from '../utils'
import * as UPI from 'atom-haskell-upi'
const $ = etch.dom

export interface IState {
  fileFilter: boolean
  activeTab: string
}

export class OutputPanel {
  private refs!: {
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
  private buttonsClass!: 'buttons-top' | 'buttons-left'
  constructor(
    private state: IState = { fileFilter: false, activeTab: 'error' },
  ) {
    this.setButtonsClass(atom.config.get('ide-haskell.buttonsPosition'))
    etch.initialize(this)
    atom.config.onDidChange('ide-haskell.buttonsPosition', ({ newValue }) => {
      this.setButtonsClass(newValue)
      // tslint:disable-next-line:no-floating-promises
      this.update()
    })

    for (const tab of ['error', 'warning', 'lint']) {
      // tslint:disable-next-line:no-floating-promises
      this.createTab(tab, {})
    }

    this.disposables.add(
      atom.workspace.onDidChangeActivePaneItem(() => {
        // tslint:disable-next-line:no-floating-promises
        if (this.state.fileFilter) this.updateItems()
      }),
    )
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

    let lastUpdateTime = Date.now()
    let collectedSeverities = new Set<UPI.TSeverity>()
    const didUpdate = (severities: UPI.TSeverity[]) => {
      this.currentResult = 0
      // tslint:disable-next-line:no-floating-promises
      this.updateItems()
      const newUpdateTime = Date.now()
      if (
        newUpdateTime - lastUpdateTime <
        atom.config.get('ide-haskell.switchTabOnCheckInterval')
      ) {
        for (const s of severities) {
          collectedSeverities.add(s)
        }
      } else {
        collectedSeverities = new Set(severities)
      }
      if (
        atom.config.get('ide-haskell.autoHideOutput') &&
        (!this.results || this.results.isEmpty(severities))
      ) {
        this.hide()
      } else if (atom.config.get('ide-haskell.switchTabOnCheck')) {
        this.activateFirstNonEmptyTab(collectedSeverities)
      }
      lastUpdateTime = newUpdateTime
    }

    this.disposables.add(this.results.onDidUpdate(didUpdate))
    // tslint:disable-next-line:no-floating-promises
    this.update()
  }

  public render() {
    if (!this.results) {
      return <ide-haskell-panel />
    }
    return (
      <ide-haskell-panel class={this.buttonsClass}>
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
          filter={this.itemFilter}
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
    if (!pane || (isDock(pane) && !pane.isVisible())) {
      return this.show()
    } else {
      return this.hide()
    }
  }

  public async show() {
    await atom.workspace.open(this, {
      searchAllPanes: true,
      activatePane: false,
    })
    const pane = atom.workspace.paneContainerForItem(this)
    if (pane && isDock(pane)) {
      pane.show()
    }
  }

  public hide() {
    const pane = atom.workspace.paneContainerForItem(this)
    if (pane && isDock(pane)) {
      atom.workspace.hide(this)
    }
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
      if (classes) {
        props.class = classes.join(' ')
      }
      if (style) {
        props.style = style
      }
      if (attrs) {
        props.attributes = attrs
      }
      if (events) {
        props.on = events
      }

      newElement = $(def.element, props)
    } else {
      newElement = $(def.element, def.opts)
    }
    this.elements.add(newElement)
    // tslint:disable-next-line:no-floating-promises
    this.update()
    return new Disposable(() => {
      this.elements.delete(newElement)
      // tslint:disable-next-line:no-floating-promises
      this.update()
    })
  }

  public async updateItems() {
    const activeTab = this.getActiveTab()
    let currentUri: string | undefined
    if (this.state.fileFilter) {
      const ed = atom.workspace.getActiveTextEditor()
      currentUri = ed ? ed.getPath() : undefined
    }
    let scroll: boolean = false
    if (activeTab) {
      const ato = this.tabs.get(activeTab)
      if (currentUri !== undefined && ato && ato.uriFilter) {
        this.itemFilter = ({ uri, severity }) =>
          severity === activeTab && uri === currentUri
      } else {
        this.itemFilter = ({ severity }) => severity === activeTab
      }
      scroll =
        (ato && ato.autoScroll && this.refs.items && this.refs.items.atEnd()) ||
        false
    }

    if (this.results) {
      for (const [btn, ato] of this.tabs.entries()) {
        ato.count = Array.from(
          this.results.filter(({ severity }) => severity === btn),
        ).length
      }
    }

    await this.update()

    if (scroll && this.refs.items) await this.refs.items.scrollToEnd()
  }

  public activateTab(tab: string) {
    this.state.activeTab = tab
    // tslint:disable-next-line:no-floating-promises
    this.updateItems()
  }

  public activateFirstNonEmptyTab(severities: Set<UPI.TSeverity>) {
    for (const tab of this.tabs.values()) {
      if (!severities.has(tab.name)) continue
      const count = tab.count
      if (count && count > 0) {
        // tslint:disable-next-line:no-floating-promises
        this.show()
        this.activateTab(tab.name)
        break
      }
    }
  }

  public showItem(item: ResultItem) {
    this.activateTab(item.severity)
    // tslint:disable-next-line:no-floating-promises
    if (this.refs.items) this.refs.items.showItem(item)
  }

  public getActiveTab() {
    return this.state.activeTab
  }

  public async createTab(
    name: string,
    { uriFilter = true, autoScroll = false }: UPI.ISeverityTabDefinition,
  ) {
    if (
      ['error', 'warning', 'lint'].includes(name) &&
      atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin'
    ) {
      return
    }
    if (!Array.from(this.tabs.keys()).includes(name)) {
      this.tabs.set(name, {
        name,
        count: 0,
        onClick: () => this.activateTab(name),
        uriFilter,
        autoScroll,
      })
      if (this.state.activeTab) this.activateTab(this.state.activeTab)
    }
    return this.update()
  }

  public serialize(): IState & { deserializer: 'ide-haskell/OutputPanel' } {
    return {
      ...this.state,
      deserializer: 'ide-haskell/OutputPanel',
    }
  }

  public backendStatus(pluginName: string, st: UPI.IStatus) {
    this.statusMap.set(pluginName, st)
    this.progress = Array.from(this.statusMap.values()).reduce(
      (cv, i) => {
        if (i.status === 'progress' && i.progress !== undefined) {
          cv.push(i.progress)
        }
        return cv
      },
      [] as number[],
    )
    // tslint:disable-next-line:no-floating-promises
    this.update()
  }

  public showNextError() {
    if (!this.results) return
    const rs = Array.from(this.results.filter(({ uri }) => uri !== undefined))
    if (rs.length === 0) {
      return
    }

    this.currentResult++
    if (this.currentResult >= rs.length) {
      this.currentResult = 0
    }

    this.showItem(rs[this.currentResult])
  }

  public showPrevError() {
    if (!this.results) return
    const rs = Array.from(this.results.filter(({ uri }) => uri !== undefined))
    if (rs.length === 0) {
      return
    }

    this.currentResult--
    if (this.currentResult < 0) {
      this.currentResult = rs.length - 1
    }

    this.showItem(rs[this.currentResult])
  }

  private switchFileFilter = () => {
    this.state.fileFilter = !this.state.fileFilter
    // tslint:disable-next-line:no-floating-promises
    this.updateItems()
  }

  private setButtonsClass(buttonsPos: 'top' | 'left') {
    switch (buttonsPos) {
      case 'top':
        this.buttonsClass = 'buttons-top'
        break
      case 'left':
        this.buttonsClass = 'buttons-left'
        break
    }
  }
}
