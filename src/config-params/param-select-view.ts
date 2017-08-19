import SelectListView = require('atom-select-list')
import { Panel } from 'atom'

export interface ISelectListParams<T> {
  items: T[] | Promise<T[]>
  heading?: string
  itemTemplate?: (item: T) => string
  itemFilterKey?: string | ((item: T) => string)
  itemElement?: (item: T) => HTMLElement
}

export async function selectListView<T>(
  { items, heading, itemTemplate, itemFilterKey, itemElement }: ISelectListParams<T>,
): Promise<T | undefined> {
  const itemElementDefault = (item: T) => {
    const li = document.createElement('li')
    if (itemTemplate) {
      li.innerHTML = itemTemplate(item)
    } else {
      li.innerText = `${item}`
    }
    // hack for backwards compatibility
    if (li.firstElementChild && li.firstElementChild.tagName === 'LI') {
      li.innerHTML = li.firstElementChild.innerHTML
    }
    return li
  }
  const filterKeyFn = (item: T) => {
    if (typeof itemFilterKey === 'string') {
      return `${item[itemFilterKey]}`
    } else if (itemFilterKey) {
      return itemFilterKey(item)
    } else {
      return `${item}`
    }
  }
  const myitems = await Promise.resolve(items)
  let panel: Panel | undefined
  let res: T | undefined
  try {
    res = await new Promise<T | undefined>((resolve, reject) => {
      const select = new SelectListView({
        items: myitems,
        infoMessage: heading,
        itemsClassList: ['ide-haskell'],
        elementForItem: itemElement || itemElementDefault,
        filterKeyForItem: filterKeyFn,
        didCancelSelection: () => {
          resolve()
        },
        didConfirmSelection: (item: T) => {
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
    panel && panel.destroy()
  }
  return res
}
