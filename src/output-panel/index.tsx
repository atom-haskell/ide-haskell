import * as etch from 'etch'
import { Disposable, CompositeDisposable } from 'atom'
import { IBtnDesc, OutputPanelButtons } from './views/output-panel-buttons'
import { OutputPanelCheckbox } from './views/output-panel-checkbox'
import { OutputPanelItems } from './views/output-panel-items'
import { ResultsDB, ResultItem } from '../results-db'
import { isDock, isSimpleControlDef, handlePromise } from '../utils'
import * as UPI from 'atom-haskell-upi'
import { BackendStatusController } from '../backend-status'

export interface IState {
  fileFilter: boolean
  activeTab: string
}

export class OutputPanel {
  private static readonly defaultTabs: ReadonlyArray<string> = [
    'error',
    'warning',
    'lint',
  ]
  private readonly refs!: {
    items?: OutputPanelItems
  }
  private readonly elements: Set<JSX.Element> = new Set()
  private readonly disposables: CompositeDisposable = new CompositeDisposable()
  private readonly tabs: Map<string, IBtnDesc> = new Map()
  private readonly tabUsers: Map<string, number> = new Map()
  private itemFilter?: (item: ResultItem) => boolean
  private currentResult: number = 0
  private results?: ResultsDB
  private buttonsClass!: 'buttons-top' | 'buttons-left'
  private bsc?: BackendStatusController
  constructor(
    private state: IState = { fileFilter: false, activeTab: 'error' },
  ) {
    this.setButtonsClass(atom.config.get('ide-haskell.buttonsPosition'))
    etch.initialize(this)
    atom.config.onDidChange('ide-haskell.buttonsPosition', ({ newValue }) => {
      this.setButtonsClass(newValue)
      handlePromise(this.update())
    })

    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      for (const name of OutputPanel.defaultTabs) {
        this.tabs.set(name, {
          name,
          count: 0,
          onClick: () => this.activateTab(name),
          uriFilter: true,
          autoScroll: false,
        })
      }
    }
    handlePromise(this.update())

    this.disposables.add(
      atom.workspace.onDidChangeActivePaneItem(() => {
        if (this.state.fileFilter) handlePromise(this.updateItems())
      }),
    )
    setImmediate(async () => {
      await this.show()
      if (atom.config.get('ide-haskell.autoHideOutput')) {
        this.hide()
      }
    })
  }

  public connectBsc(bsc: BackendStatusController) {
    if (this.bsc) throw new Error('BackendStatusController already connected!')
    this.bsc = bsc
    this.disposables.add(
      this.bsc.onDidUpdate(() => handlePromise(this.update())),
    )

    handlePromise(this.update())
  }

  public connectResults(results: ResultsDB) {
    if (this.results) throw new Error('Results already connected!')
    this.results = results

    let lastUpdateTime = Date.now()
    let collectedSeverities = new Set<UPI.TSeverity>()
    const didUpdate = (severities: UPI.TSeverity[]) => {
      this.currentResult = 0

      handlePromise(this.updateItems())
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

    handlePromise(this.update())
  }

  public render() {
    if (!this.results) {
      return <ide-haskell-panel />
    }
    // tslint:disable: strict-boolean-expressions no-null-keyword
    return (
      <ide-haskell-panel class={this.buttonsClass}>
        <ide-haskell-panel-heading>
          {this.bsc?.renderStatusIcon() || null}
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
          {this.bsc?.renderProgressBar() || null}
        </ide-haskell-panel-heading>
        <OutputPanelItems
          model={this.results}
          filter={this.itemFilter}
          ref="items"
        />
      </ide-haskell-panel>
    )
    // tslint:enable: strict-boolean-expressions no-null-keyword
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

      newElement = etch.dom(def.element, props)
    } else {
      newElement = etch.dom(def.element, def.opts)
    }
    this.elements.add(newElement)

    handlePromise(this.update())
    return new Disposable(() => {
      this.elements.delete(newElement)
      handlePromise(this.update())
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
        ato.count = this.results.filter(
          ({ severity }) => severity === btn,
        ).length
      }
    }

    await this.update()

    if (scroll && this.refs.items) await this.refs.items.scrollToEnd()
  }

  public activateTab(tab: string) {
    this.state.activeTab = tab
    handlePromise(this.updateItems())
  }

  public activateFirstNonEmptyTab(severities: Set<UPI.TSeverity>) {
    for (const tab of this.tabs.values()) {
      if (!severities.has(tab.name)) continue
      const count = tab.count
      if (count && count > 0) {
        handlePromise(this.show())
        this.activateTab(tab.name)
        break
      }
    }
  }

  public showItem(item: ResultItem) {
    this.activateTab(item.severity)

    if (this.refs.items) handlePromise(this.refs.items.showItem(item))
  }

  public getActiveTab() {
    return this.state.activeTab
  }

  public async createTab(
    name: string,
    { uriFilter = true, autoScroll = false }: UPI.ISeverityTabDefinition,
  ) {
    if (OutputPanel.defaultTabs.includes(name)) return
    if (this.tabs.has(name)) {
      // tslint:disable-next-line: no-non-null-assertion
      this.tabUsers.set(name, this.tabUsers.get(name)! + 1)
    } else {
      this.tabUsers.set(name, 1)
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

  public async removeTab(name: string) {
    if (OutputPanel.defaultTabs.includes(name)) return
    if (this.tabUsers.has(name)) {
      // tslint:disable-next-line: no-non-null-assertion
      let n = this.tabUsers.get(name)!
      n -= 1
      if (n === 0) {
        this.tabUsers.delete(name)
        this.tabs.delete(name)
        if (this.state.activeTab === name) {
          this.state.activeTab = OutputPanel.defaultTabs[0]
        }
        return this.update()
      } else {
        this.tabUsers.set(name, n)
      }
    } else {
      throw new Error(
        `Ide-Haskell: Removing nonexistent output panel tab ${name}`,
      )
    }
  }

  public serialize(): IState & { deserializer: 'ide-haskell/OutputPanel' } {
    return {
      ...this.state,
      deserializer: 'ide-haskell/OutputPanel',
    }
  }

  public showNextError() {
    if (!this.results) return
    const rs = this.results.filter(({ uri }) => uri !== undefined)
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
    const rs = this.results.filter(({ uri }) => uri !== undefined)
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
    handlePromise(this.updateItems())
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
