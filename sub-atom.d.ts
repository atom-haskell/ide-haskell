import {CompositeDisposable} from 'atom'

declare module 'sub-atom' {
  export = SubAtom
  class SubAtom extends CompositeDisposable {

  }
}
