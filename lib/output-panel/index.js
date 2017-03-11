'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import {Disposable, CompositeDisposable} from 'atom'
import {OutputPanelButtons} from './views/output-panel-buttons'
import {OutputPanelCheckbox} from './views/output-panel-checkbox'
import {ProgressBar} from './views/progress-bar'
import {OutputPanelItems} from './views/output-panel-items'
const $ = etch.dom

export class OutputPanel {
  constructor (state, results) {
    this.state = state || {}
    this.results = results

    this.hiddenOutput = true

    this.elements = new Set()

    this.statusMap = new Map()

    this.disposables = new CompositeDisposable()

    etch.initialize(this)

    atom.config.observe('ide-haskell.panelPosition', (value) => {
      this.pos = value
      this.panel = atom.workspace.addPanel(this.pos, {
        item: this,
        visible: this.state.visibility || true
      })
      if (this.element) {
        this.update()
      }
    })

    this.disposables.add(atom.tooltips.add(this.refs.status, {
      'class': 'ide-haskell-status-tooltip',
      title: () => {
        let res = []
        for (let [plugin, {status, detail}] of this.statusMap.entries()) {
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
      this.currentResult = null
      if (atom.config.get('ide-haskell.autoHideOutput') &&
          types.map((type) => this.results.filter({severity: type}).length).every((l) => l === 0)) {
        this.buttons.disableAll()
      } else {
        if (atom.config.get('ide-haskell.switchTabOnCheck')) {
          this.activateFirstNonEmptyTab(types)
        }
      }
      this.updateItems()
    }))

    this.refs.progressBar.setProgress(0)

    this.disposables.add(this.refs.buttons.onButtonClicked(() => this.updateItems()))
    this.disposables.add(this.refs.checkboxUriFilter.onCheckboxSwitched(() => this.updateItems()))
    this.disposables.add(atom.workspace.onDidChangeActivePaneItem(() => {
      if (this.refs.checkboxUriFilter.getFileFilter()) this.updateItems()
    }))
  }

  render () {
    let orientMap = {
      'top': 'horizontal',
      'bottom': 'horizontal',
      'left': 'vertical',
      'right': 'vertical'
    }
    return (
      <ide-haskell-panel style={{width: this.state.width, height: this.state.height}}
        dataset={{pos: this.pos}}
        class={this.hiddenOutput ? 'hidden-output' : ''}>
        <resize-handle on={{mousedown: this.resizeStart}} />
        <ide-haskell-panel-heading ref='heading'>
          <ide-haskell-status-icon ref='status' id='status' dataset={{status: 'ready'}}/>
          <OutputPanelButtons ref='buttons' id='buttons'/>
          <OutputPanelCheckbox ref='checkboxUriFilter' id='checkboxUriFilter'
            enabled={this.state.fileFilter}/>
          {Array.from(this.elements.values())}
          <ProgressBar ref='progressBar' id='progressBar'
            orientation={orientMap[this.pos]}/>
        </ide-haskell-panel-heading>
        <OutputPanelItems model={this.results} ref='items' id='items'/>
      </ide-haskell-panel>
    )
  }

  resizeStart (e) {
    let varsMap = {
      'top': {axis: 'Y', param: 'height', dir: 1},
      'bottom': {axis: 'Y', param: 'height', dir: -1},
      'left': {axis: 'X', param: 'width', dir: 1},
      'right': {axis: 'X', param: 'width', dir: -1}
    }

    let vars = varsMap[this.pos]

    vars.axis = `client${vars.axis}`
    let startAxis = e[vars.axis]
    let startParam = parseInt(document.defaultView.getComputedStyle(this.element)[vars.param], 10)

    let doDrag = (e) => {
      this.state[vars.param] =
        (startParam + vars.dir * (e[vars.axis] - startAxis)) + 'px'
      this.update()
    }
    let stopDrag = () => {
      document.documentElement.removeEventListener('mousemove', doDrag)
      document.documentElement.removeEventListener('mouseup', stopDrag)
    }

    document.documentElement.addEventListener('mousemove', doDrag)
    document.documentElement.addEventListener('mouseup', stopDrag)
  }

  update () {
    return etch.update(this)
  }

  async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
    this.panel.destroy()
    this.statusMap.clear()
    this.statusMap = null
  }

  addPanelControl (element, opts) {
    if (typeof element === 'string') {
      let {events, classes, style, attrs} = opts
      let props = {}
      if (classes) props.class = classes.join(' ')
      if (style) props.style = style
      if (attrs) props.attributes = attrs
      if (events) props.on = events

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

  updateItems () {
    let activeTab = this.getActiveTab()
    let uri
    if (activeTab) {
      this.hiddenOutput = false
      let filter = {severity: activeTab}
      if (this.refs.checkboxUriFilter.getFileFilter()) {
        uri = atom.workspace.getActiveTextEditor().getPath()
        if (uri && this.refs.buttons.options(activeTab).uriFilter) {
          filter.uri = uri
        }
      }
      let scroll = this.refs.buttons.options(activeTab).autoScroll && this.refs.items.atEnd()
      this.refs.items.filter(filter)
      if (scroll) this.refs.items.scrollToEnd()
    } else {
      this.hiddenOutput = true
    }

    this.refs.buttons.buttonNames().forEach((btn) => {
      let f = {severity: btn}
      if (uri && this.refs.buttons.options(btn).uriFilter) f.uri = uri
      this.refs.buttons.setCount(btn, this.results.filter(f).length)
    })
    this.update()
  }

  activateTab (tab) {
    this.refs.buttons.clickButton(tab, true)
  }

  activateFirstNonEmptyTab (types) {
    let names = this.refs.buttons.buttonNames()
    for (let i in names) {
      let name = names[i]
      if (!types || types.includes(name)) {
        if ((this.results.filter({severity: name})).length > 0) {
          this.activateTab(name)
          break
        }
      }
    }
  }

  showItem (item) {
    this.activateTab(item.severity)
    this.refs.items.showItem(item)
  }

  getActiveTab () {
    return this.refs.buttons.getActive()
  }

  createTab (name, opts) {
    if (!this.refs.buttons.buttonNames().includes(name)) {
      this.refs.buttons.createButton(name, opts)
      this.activateTab(this.state.activeTab)
    }
  }

  setProgress (progress) {
    this.refs.progressBar.setProgress(progress)
  }

  toggle () {
    if (this.panel.isVisible()) this.panel.hide()
    else this.panel.show()
  }

  serialize () {
    return {
      visibility: this.panel.isVisible(),
      height: this.element.style.height,
      width: this.element.style.width,
      activeTab: this.getActiveTab(),
      fileFilter: this.refs.checkboxUriFilter.getFileFilter()
    }
  }

  backendStatus (pluginName, {status, progress, detail}) {
    let prio = {
      progress: 5,
      error: 20,
      warning: 10,
      ready: 0
    }
    this.statusMap.set(pluginName, {status, progress, detail})
    let [consensus] = Array.from(this.statusMap.values()).sort((a, b) => prio[b.status] - prio[a.status])
    this.refs.status.setAttribute('data-status', consensus.status)
    if (status !== 'progress') { progress = 0 }
    this.setProgress(progress)
  }

  showNextError () {
    let rs = this.results.resultsWithURI()
    if (rs.length === 0) return

    if (this.currentResult !== null && this.currentResult !== undefined) {
      this.currentResult++
    } else {
      this.currentResult = 0
    }
    if (this.currentResult >= rs.length) this.currentResult = 0

    this.showItem(rs[this.currentResult])
  }

  showPrevError () {
    let rs = this.results.resultsWithURI()
    if (rs.length === 0) return

    if (this.currentResult !== null && this.currentResult !== undefined) {
      this.currentResult--
    } else {
      this.currentResult = rs.length - 1
    }
    if (this.currentResult < 0) this.currentResult = rs.length - 1

    this.showItem(rs[this.currentResult])
  }
}
