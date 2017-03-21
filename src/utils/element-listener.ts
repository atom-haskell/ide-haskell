import {Disposable} from 'atom'

export function listen (
  element: HTMLElement, event: string, selector: string, callback: (event: Event) => void
): Disposable {
  const bound = (evt: Event) => {
    if ((evt.target as HTMLElement).matches(selector)) {
      callback(evt)
    }
  }
  element.addEventListener(event, bound)
  return new Disposable(() => {
    element.removeEventListener(event, bound)
  })
}
