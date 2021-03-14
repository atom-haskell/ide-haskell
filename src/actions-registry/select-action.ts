import { Panel } from 'atom'
import * as UPI from 'atom-haskell-upi'
import SelectListView from 'atom-select-list'
export async function selectAction(actions: UPI.Action[]) {
  let panel: Panel | undefined
  const currentFocus = document.activeElement as HTMLElement | undefined | null
  try {
    return await new Promise<UPI.Action | undefined>((resolve) => {
      const select = new SelectListView({
        items: actions,
        infoMessage: 'Actions',
        itemsClassList: ['ide-haskell', 'mark-active'],
        elementForItem: (x) => {
          const el = document.createElement('li')
          el.innerText = x.title
          return el
        },
        filterKeyForItem: (x) => x.title,
        didCancelSelection: () => {
          resolve(undefined)
        },
        didConfirmSelection: (item) => {
          resolve(item)
        },
      })
      select.element.classList.add('ide-haskell')
      panel = atom.workspace.addModalPanel({
        item: select,
        visible: true,
      })
      select.focus()
    })
  } finally {
    panel?.destroy()
    currentFocus?.focus()
  }
}
