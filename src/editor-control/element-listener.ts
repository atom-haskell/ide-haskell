import {Disposable} from 'atom'

export function listen(element: HTMLElement, event: string, callback: (event: Event) => void): Disposable {
  element.addEventListener(event, callback)
  return new Disposable(() => {
    element.removeEventListener(event, callback)
  })
}
