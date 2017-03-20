import {IControlOpts} from '../output-panel'

export class DummyElement {
  private element: HTMLElement
  constructor (private opts: IControlOpts & {element: HTMLElement}) {
    this.element = opts.element.cloneNode(true) as HTMLElement
    this.init()
  }

  public update (opts: IControlOpts & {element: HTMLElement}) {
    this.opts = opts
    this.element.remove()
    this.element = opts.element.cloneNode(true) as HTMLElement
    this.init()
  }

  private init () {
    const {id, events, classes, style, attrs} = this.opts
    if (id) { this.element.id = id }
    if (events) {
      for (const ev of Object.keys(events)) {
        this.element.addEventListener(ev, events[ev])
      }
    }
    if (classes) {
      for (const cls of classes) {
        this.element.classList.add(cls)
      }
    }
    if (style) {
      for (const st of Object.keys(style)) {
        this.element.style[st] = style[st]
      }
    }
    if (attrs) {
      for (const at of Object.keys(attrs)) {
        this.element.setAttribute(at, attrs[at])
      }
    }
  }
}
