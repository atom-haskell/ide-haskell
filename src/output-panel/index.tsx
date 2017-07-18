import * as etch from 'etch'
import {Disposable, CompositeDisposable} from 'atom'
import {OutputPanelButtons} from './views/output-panel-buttons'
import {OutputPanelCheckbox} from './views/output-panel-checkbox'
import {ProgressBar} from './views/progress-bar'
import {OutputPanelItems} from './views/output-panel-items'
import {ResultsDB, ResultItem} from '../results-db'
import {StatusIcon} from './views/status-icon'
import {isDock} from '../utils'
const $ = etch.dom

export interface IState {
  fileFilter?: boolean
  activeTab?: string
}

export type TPanelPosition = 'bottom' | 'left' | 'top' | 'right'

export class OutputPanel {
  // tslint:disable-next-line:no-uninitialized-class-properties
  private refs: {
    items: OutputPanelItems
    buttons: OutputPanelButtons
    checkboxUriFilter: OutputPanelCheckbox
  }
  private elements: Set<JSX.Element>
  private disposables: CompositeDisposable
  private currentResult: number
  private statusMap: Map<string, UPI.IStatus>
  private progress: number[]
  private itemFilter: (item: ResultItem) => boolean
  constructor (private state: IState = {}, private results: ResultsDB) {
    this.elements = new Set()
    this.statusMap = new Map()
    this.disposables = new CompositeDisposable()

    this.currentResult = 0
    this.progress = []
    this.itemFilter = () => true

    etch.initialize(this)

    this.disposables.add(this.results.onDidUpdate((severities: UPI.TSeverity[]) => {
      this.currentResult = 0
      this.updateItems()
      if (atom.config.get('ide-haskell.autoHideOutput') && this.results.isEmpty()) {
        this.hide()
      } else if (atom.config.get('ide-haskell.switchTabOnCheck')) {
        this.show()
        this.activateFirstNonEmptyTab(severities)
      }
    }))

    this.disposables.add(atom.workspace.onDidChangeActivePaneItem(() => {
      if (this.refs.checkboxUriFilter.getState()) { this.updateItems() }
    }))
  }

  public render () {
    return (
      <ide-haskell-panel>
        <ide-haskell-panel-heading>
          <StatusIcon ref="status" statusMap={this.statusMap}/>
          <OutputPanelButtons ref="buttons" onChange={this.updateItems.bind(this)}/>
          <OutputPanelCheckbox ref="checkboxUriFilter" class="ide-haskell-checkbox--uri-filter"
            initialState={this.state.fileFilter} onSwitched={this.updateItems.bind(this)}
            enabledHint="Show current file messages"
            disabledHint="Show all project messages"
            />
          {Array.from(this.elements.values())}
          <ProgressBar progress={this.progress}/>
        </ide-haskell-panel-heading>
        <OutputPanelItems model={this.results} filter={this.itemFilter} ref="items"/>
      </ide-haskell-panel>
    )
  }

  public async update () {
    return etch.update(this)
  }

  public async destroy () {
    this.hide()
  }

  public async reallyDestroy () {
    await etch.destroy(this)
    this.disposables.dispose()
  }

  public async toggle () {
    const pane = atom.workspace.paneContainerForItem(this)
    if (! pane || isDock(pane) && ! pane.isVisible()) {
      this.show()
    } else {
      this.hide()
    }
  }

  public async show () {
    await atom.workspace.open(this, {searchAllPanes: true, activatePane: false})
    const pane = atom.workspace.paneContainerForItem(this)
    if (pane && isDock(pane)) { pane.show() }
  }

  public async hide () {
    atom.workspace.hide(this)
  }

  public getTitle () {
    return 'IDE-Haskell'
  }

  public getDefaultLocation () {
    return atom.config.get('ide-haskell.panelPosition')
  }

  public addPanelControl<T> ({element, opts}: UPI.TControlDefinition<T>) {
    if (typeof element === 'string') {
      const {events, classes, style, attrs} = (opts as UPI.IControlOpts)
      const props: {[key: string]: Object} = {}
      if (classes) { props.class = classes.join(' ') }
      if (style) { props.style = style }
      if (attrs) { props.attributes = attrs }
      if (events) { props.on = events }

      element = $(element, props)
    } else {
      element = $(element, opts)
    }
    this.elements.add(element)
    this.update()
    return new Disposable(() => {
      this.elements.delete(element)
      this.update()
    })
  }

  public updateItems () {
    const activeTab = this.getActiveTab()
    let currentUri: string
    if (activeTab) {
      let filterUri: string | undefined
      const filterSeverity = activeTab
      const ato = this.refs.buttons.options(activeTab)
      if (this.refs.checkboxUriFilter.getState()) {
        currentUri = atom.workspace.getActiveTextEditor().getPath()
        if (currentUri && ato && ato.uriFilter) {
          filterUri = currentUri
        }
      }
      const scroll = ato && ato.autoScroll && this.refs.items.atEnd()
      this.itemFilter = ({uri, severity}) => (severity === filterSeverity) && (!filterUri || uri === filterUri)
      if (scroll) { this.refs.items.scrollToEnd() }
    }

    this.refs.buttons.buttonNames().forEach((btn) => {
      const f: {severity: string, uri?: string} = {severity: btn}
      const ato = this.refs.buttons.options(btn)
      if (currentUri && ato && ato.uriFilter) { f.uri = currentUri }
      this.refs.buttons.setCount(btn, Array.from(this.results.filter(
        ({uri, severity}) => (severity === f.severity) && (!f.uri || uri === f.uri)
      )).length)
    })
    this.update()
  }

  public activateTab (tab: string) {
    this.refs.buttons.setActive(tab)
  }

  public activateFirstNonEmptyTab (severities: UPI.TSeverity[]) {
    const sevs: UPI.TSeverity[] = severities
    for (const i of sevs) {
      const count = this.refs.buttons.getCount(i)
      if (count && count > 0) {
        this.activateTab(i)
        break
      }
    }
  }

  public showItem (item: ResultItem) {
    this.activateTab(item.severity)
    this.refs.items.showItem(item)
  }

  public getActiveTab () {
    return this.refs.buttons.getActive()
  }

  public createTab (name: string, opts: UPI.ISeverityTabDefinition) {
    if (!this.refs.buttons.buttonNames().includes(name)) {
      this.refs.buttons.createButton(name, opts)
      this.state.activeTab && this.activateTab(this.state.activeTab)
    }
  }

  public serialize (): IState {
    return {
      activeTab: this.getActiveTab(),
      fileFilter: this.refs.checkboxUriFilter.getState()
    }
  }

  public backendStatus (pluginName: string, st: UPI.IStatus) {
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
        [] as number[]
      )
    this.update()
  }

  public showNextError () {
    const rs = Array.from(this.results.filter(({uri}) => !!uri))
    if (rs.length === 0) { return }

    if (this.currentResult !== undefined) {
      this.currentResult++
    } else {
      this.currentResult = 0
    }
    if (this.currentResult >= rs.length) { this.currentResult = 0 }

    this.showItem(rs[this.currentResult])
  }

  public showPrevError () {
    const rs = Array.from(this.results.filter(({uri}) => !!uri))
    if (rs.length === 0) { return }

    if (this.currentResult !== undefined) {
      this.currentResult--
    } else {
      this.currentResult = rs.length - 1
    }
    if (this.currentResult < 0) { this.currentResult = rs.length - 1 }

    this.showItem(rs[this.currentResult])
  }
}
