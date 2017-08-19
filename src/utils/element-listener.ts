import { Disposable } from 'atom'

export function listen(
  element: HTMLElement, event: string, selector: string, callback: (event: Event) => void,
): Disposable {
  const bound = (evt: Event) => {
    const sel = (evt.target as HTMLElement).closest(selector)
    if (sel && element.contains(sel)) {
      callback(evt)
    }
  }
  element.addEventListener(event, bound)
  return new Disposable(() => {
    element.removeEventListener(event, bound)
  })
}
