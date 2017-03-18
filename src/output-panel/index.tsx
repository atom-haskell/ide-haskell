import * as etch from 'etch'
import {Disposable, CompositeDisposable, Panel} from 'atom'
import {OutputPanelButtons, ISeverityTabDefinition} from './views/output-panel-buttons'
import {OutputPanelCheckbox} from './views/output-panel-checkbox'
import {ProgressBar} from './views/progress-bar'
import {OutputPanelItems} from './views/output-panel-items'
import {ResultsDB, ResultItem} from '../results-db'
const $ = etch.dom

export {ISeverityTabDefinition}

interface IState {
  visibility?: boolean
  width?: number
  height?: number
  fileFilter?: boolean
  activeTab?: string
}

interface INormalStatus {
  status: 'ready' | 'error' | 'warning'
}

interface IProgressStatus {
  status: 'progress'
  progress?: number
}

export type IStatus = (INormalStatus | IProgressStatus) & {detail: string}

export type TPanelPosition = 'bottom' | 'left' | 'top' | 'right'

export interface ISetTypesParams {[severity: string]: ISeverityTabDefinition}

export interface IControlOpts {
  id?: string
  events?: {[key: string]: EventListener}
  classes?: string[]
  style?: {[key: string]: string}
  attrs?: {[key: string]: string}
}

export class OutputPanel {
  private refs: {
    items: OutputPanelItems
    buttons: OutputPanelButtons
    status: HTMLElement
    checkboxUriFilter: OutputPanelCheckbox
    progressBar: ProgressBar
  }
  private hiddenOutput: boolean
  private elements: Set<JSX.Element>
  private statusMap: Map<string, IStatus>
  private disposables: CompositeDisposable
  private pos: TPanelPosition
  private panel: Panel
  private element?: HTMLElement
  private currentResult: number
  constructor (private state: IState | undefined = {}, private results: ResultsDB) {
    this.hiddenOutput = true

    this.elements = new Set()

    this.statusMap = new Map()

    this.disposables = new CompositeDisposable()

    etch.initialize(this)

    atom.config.observe('ide-haskell.panelPosition', (value: TPanelPosition) => {
      this.pos = value
      const options = {
        item: this,
        visible: this.state.visibility || true
      }
      switch (this.pos) {
        case 'top':
          atom.workspace.addTopPanel(options)
          break
        case 'bottom':
          atom.workspace.addBottomPanel(options)
          break
        case 'left':
          atom.workspace.addLeftPanel(options)
          break
        case 'right':
          atom.workspace.addRightPanel(options)
          break
        default: // impossible, but tslint won't shut up
      }
      if (this.element) {
        this.update()
      }
    })

    this.disposables.add(atom.tooltips.add(this.refs.status, {
      class: 'ide-haskell-status-tooltip',
      title: () => {
        const res = []
        for (const [plugin, {status, detail}] of this.statusMap.entries()) {
          res.push(`
          <ide-haskell-status-item>
            <ide-haskell-status-icon data-status="${status}">${plugin}</ide-haskell-status-icon>
            <ide-haskell-status-detail>${detail || ''}</ide-haskell-status-detail>
          </ide-haskell-status-item>
          `)
        }
        return res.join('')
      }
    }))

    this.disposables.add(this.results.onDidUpdate(({types}) => {
      this.currentResult = 0
      if (atom.config.get('ide-haskell.autoHideOutput') &&
          types.map((type) => this.results.filter(({severity}) => severity === type).length).every((l) => l === 0)) {
        this.refs.buttons.disableAll()
      } else {
        if (atom.config.get('ide-haskell.switchTabOnCheck')) {
          this.activateFirstNonEmptyTab(types)
        }
      }
      this.updateItems()
    }))

    this.setProgress(NaN)

    this.disposables.add(this.refs.buttons.onButtonClicked(() => this.updateItems()))
    this.disposables.add(this.refs.checkboxUriFilter.onCheckboxSwitched(() => this.updateItems()))
    this.disposables.add(atom.workspace.onDidChangeActivePaneItem(() => {
      if (this.refs.checkboxUriFilter.getFileFilter()) { this.updateItems() }
    }))
  }

  public render () {
    const orientMap = {
      top: 'horizontal',
      bottom: 'horizontal',
      left: 'vertical',
      right: 'vertical'
    }
    return (
      <ide-haskell-panel style={{width: this.state.width, height: this.state.height}}
        dataset={{pos: this.pos}}
        class={this.hiddenOutput ? 'hidden-output' : ''}>
        <resize-handle on={{mousedown: this.resizeStart.bind(this)}} />
        <ide-haskell-panel-heading ref="heading">
          <ide-haskell-status-icon ref="status" id="status" dataset={{status: 'ready'}}/>
          <OutputPanelButtons ref="buttons" id="buttons"/>
          <OutputPanelCheckbox ref="checkboxUriFilter" id="checkboxUriFilter"
            enabled={this.state.fileFilter}/>
          {Array.from(this.elements.values())}
          <ProgressBar ref="progressBar" id="progressBar"
            orientation={orientMap[this.pos]}/>
        </ide-haskell-panel-heading>
        <OutputPanelItems model={this.results} ref="items" id="items"/>
      </ide-haskell-panel>
    )
  }

  public update () {
    return etch.update(this)
  }

  public async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
    this.panel.destroy()
    this.statusMap.clear()
  }

  public addPanelControl (element: string | Function, opts: IControlOpts | Object) {
    if (typeof element === 'string') {
      const {events, classes, style, attrs} = (opts as IControlOpts)
      const props: any = {}
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
      this.hiddenOutput = false
      let filterUri: string | undefined
      const filterSeverity = activeTab
      const ato = this.refs.buttons.options(activeTab)
      if (this.refs.checkboxUriFilter.getFileFilter()) {
        currentUri = atom.workspace.getActiveTextEditor().getPath()
        if (currentUri && ato && ato.uriFilter) {
          filterUri = currentUri
        }
      }
      const scroll = ato && ato.autoScroll && this.refs.items.atEnd()
      this.refs.items.filter(({uri, severity}) =>
        (severity === filterSeverity) && (!filterUri || uri === filterUri)
      )
      if (scroll) { this.refs.items.scrollToEnd() }
    } else {
      this.hiddenOutput = true
    }

    this.refs.buttons.buttonNames().forEach((btn) => {
      const f: {severity: string, uri?: string} = {severity: btn}
      const ato = this.refs.buttons.options(btn)
      if (currentUri && ato && ato.uriFilter) { f.uri = currentUri }
      this.refs.buttons.setCount(btn, this.results.filter(
        ({uri, severity}) => (severity === f.severity) && (!f.uri || uri === f.uri)
      ).length)
    })
    this.update()
  }

  public activateTab (tab: string) {
    this.refs.buttons.clickButton(tab)
  }

  public activateFirstNonEmptyTab (types: string[]) {
    const names = this.refs.buttons.buttonNames()
    for (const i of names) {
      const name = names[i]
      if (!types || types.includes(name)) {
        if ((this.results.filter(({severity}) => severity === name)).length > 0) {
          this.activateTab(name)
          break
        }
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

  public createTab (name: string, opts: ISeverityTabDefinition) {
    if (!this.refs.buttons.buttonNames().includes(name)) {
      this.refs.buttons.createButton(name, opts)
      this.state.activeTab && this.activateTab(this.state.activeTab)
    }
  }

  public setProgress (progress: number) {
    this.refs.progressBar.setProgress(progress)
  }

  public toggle () {
    if (this.panel.isVisible()) {
      this.panel.hide()
    } else {
      this.panel.show()
    }
  }

  public serialize () {
    return {
      visibility: this.panel.isVisible(),
      height: this.element && this.element.style.height || this.state.height,
      width: this.element && this.element.style.width || this.state.width,
      activeTab: this.getActiveTab(),
      fileFilter: this.refs.checkboxUriFilter.getFileFilter()
    }
  }

  public backendStatus (pluginName: string, st: IStatus) {
    const prio = {
      progress: 5,
      error: 20,
      warning: 10,
      ready: 0
    }
    this.statusMap.set(pluginName, st)
    const stArr = Array.from(this.statusMap.values())
    const [consensus] = stArr.sort((a, b) => prio[b.status] - prio[a.status])
    this.refs.status.setAttribute('data-status', consensus.status)
    let count = 0
    let tot = 0
    for (const i of stArr) {
      if (i.status === 'progress' && i.progress !== undefined) {
        tot += i.progress
        count++
      }
    }
    const progressAve = tot / count
    this.setProgress(progressAve)
  }

  public showNextError () {
    const rs = this.results.filter(({uri}) => !!uri)
    if (rs.length === 0) { return }

    if (this.currentResult !== null && this.currentResult !== undefined) {
      this.currentResult++
    } else {
      this.currentResult = 0
    }
    if (this.currentResult >= rs.length) { this.currentResult = 0 }

    this.showItem(rs[this.currentResult])
  }

  public showPrevError () {
    const rs = this.results.filter(({uri}) => !!uri)
    if (rs.length === 0) { return }

    if (this.currentResult !== null && this.currentResult !== undefined) {
      this.currentResult--
    } else {
      this.currentResult = rs.length - 1
    }
    if (this.currentResult < 0) { this.currentResult = rs.length - 1 }

    this.showItem(rs[this.currentResult])
  }

  private resizeStart (e: MouseEvent) {
    if (!this.element) { return }
    const varsMap = {
      top: {axis: 'Y', param: 'height', dir: 1},
      bottom: {axis: 'Y', param: 'height', dir: -1},
      left: {axis: 'X', param: 'width', dir: 1},
      right: {axis: 'X', param: 'width', dir: -1}
    }

    const vars = varsMap[this.pos]

    vars.axis = `client${vars.axis}`
    const startAxis = e[vars.axis]
    const startParam = parseInt(document.defaultView.getComputedStyle(this.element)[vars.param], 10)

    const doDrag = (event: MouseEvent) => {
      this.state[vars.param] =
        (startParam + vars.dir * (event[vars.axis] - startAxis)) + 'px'
      this.update()
    }
    const stopDrag = () => {
      document.documentElement.removeEventListener('mousemove', doDrag)
      document.documentElement.removeEventListener('mouseup', stopDrag)
    }

    document.documentElement.addEventListener('mousemove', doDrag)
    document.documentElement.addEventListener('mouseup', stopDrag)
  }
}
