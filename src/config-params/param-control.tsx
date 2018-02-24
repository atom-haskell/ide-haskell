import { CompositeDisposable, Disposable } from 'atom'
import * as etch from 'etch'
import * as UPI from 'atom-haskell-upi'

import { ConfigParamStore } from './param-store'

export interface IProps<T> {
  pluginName: string
  name: string
  spec: UPI.IParamSpec<T>
  store: ConfigParamStore
}

export class ParamControl<T> implements UPI.IElementObject<IProps<T>> {
  public element!: HTMLElement
  private disposables: CompositeDisposable
  private hiddenValue: boolean
  private value?: T
  private storeDisposable?: Disposable
  constructor(public props: IProps<T>) {
    this.disposables = new CompositeDisposable()

    this.hiddenValue = atom.config.get('ide-haskell.hideParameterValues')

    this.initStore()

    this.initSpec()

    etch.initialize(this)

    this.disposables.add(
      atom.config.onDidChange(
        'ide-haskell.hideParameterValues',
        ({ newValue }) => {
          this.hiddenValue = newValue
          // tslint:disable-next-line:no-floating-promises
          this.update()
        },
      ),
    )

    this.disposables.add(
      atom.tooltips.add(this.element, { title: this.tooltipTitle }),
    )
  }

  public render() {
    const classList = [
      `ide-haskell--${this.props.pluginName}`,
      `ide-haskell-param--${this.props.name}`,
    ]
    if (this.hiddenValue) {
      classList.push('hidden-value')
    }
    return (
      <ide-haskell-param
        class={classList.join(' ')}
        on={{ click: async () => this.setValue() }}
      >
        <ide-haskell-param-value>
          {this.props.spec.displayTemplate(this.value)}
        </ide-haskell-param-value>
      </ide-haskell-param>
    )
  }

  public async update(props?: Partial<IProps<T>>) {
    if (props) {
      const { pluginName, name, spec, store } = props
      if (pluginName !== undefined) {
        this.props.pluginName = pluginName
      }
      if (name !== undefined) {
        this.props.name = name
      }
      if (spec && this.props.spec !== spec) {
        this.props.spec = spec
        this.initSpec()
      }
      if (store && this.props.store !== store) {
        this.props.store = store
        this.initStore()
      }
    }
    return etch.update(this)
  }

  public async setValue(e?: T) {
    await this.props.store.setValue(this.props.pluginName, this.props.name, e)
    // tslint:disable-next-line:no-floating-promises
    this.update()
  }

  public async destroy() {
    await etch.destroy(this)
    this.disposables.dispose()
  }

  private initStore() {
    if (this.storeDisposable) {
      this.disposables.remove(this.storeDisposable)
    }
    this.storeDisposable = this.props.store.onDidUpdate<T>(
      this.props.pluginName,
      this.props.name,
      ({ value }) => {
        this.value = value
        // tslint:disable-next-line:no-floating-promises
        this.update()
      },
    )
    this.disposables.add(this.storeDisposable)
    // tslint:disable-next-line:no-floating-promises
    this.setValueInitial()
  }

  private async setValueInitial() {
    this.value = await this.props.store.getValueRaw<T>(
      this.props.pluginName,
      this.props.name,
    )
    return this.update()
  }

  private initSpec() {
    if (this.props.spec.displayName === undefined) {
      this.props.spec.displayName =
        this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)
    }
  }

  private tooltipTitle = (): string => {
    const displayName =
      this.props.spec.displayName !== undefined
        ? this.props.spec.displayName
        : 'Undefined name'
    if (this.hiddenValue) {
      return `${displayName}: ${this.props.spec.displayTemplate(this.value)}`
    } else {
      return displayName
    }
  }
}
