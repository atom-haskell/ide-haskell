import {CompositeDisposable, Disposable} from 'atom'
import {MainMenuLabel} from '../../utils'

export interface IMainInterface {
  /**
  Adds new sumbenu to 'Haskell IDE' menu item

  @param name -- submenu label, should be descriptive of a package
  @param menu -- Atom menu object

  @returns Disposable.
  */
  set (options: IMenuDefinition): Disposable
}

export interface IMenuDefinition {label: string, menu: any[]}

export function create (disposables: CompositeDisposable): IMainInterface {
  return {
    set ({label, menu}) {
      const menuDisp = atom.menu.add([{
        label: MainMenuLabel,
        submenu: [ {label, submenu: menu} ]
      }])
      disposables.add(menuDisp)
      return menuDisp
    }
  }
}
