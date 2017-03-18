import * as etch from 'etch'
import {Emitter} from 'atom'

export interface IProps {
  active: boolean
  ref: string
  count: number
  emitter: Emitter
}

export class Button {
  constructor (public props: IProps) {
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-button
        class={this.props.active ? 'active' : ''}
        dataset={{caption: this.props.ref, count: this.props.count}}
        on={{click: this.didClick.bind(this)}}/>
    )
  }

  public update (props?: IProps) {
    if (props) { this.props = props }
    return etch.update(this)
  }

  public async destroy () {
    await etch.destroy(this)
  }

  public toggleActive () {
    this.props.active = !this.props.active
    this.update()
  }

  public deactivate () {
    this.props.active = false
    this.update()
  }

  public activate () {
    this.props.active = true
    this.update()
  }

  public setCount (count: number) {
    this.props.count = count
    this.update()
  }

  private didClick () {
    this.toggleActive()
    this.props.emitter.emit('button-clicked', this.props.ref)
  }
}
