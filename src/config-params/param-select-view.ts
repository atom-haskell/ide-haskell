import SelectListView = require('atom-select-list')
import { Panel } from 'atom'

export interface ISelectListParams<T> {
  items: T[] | Promise<T[]>
  heading?: string
  itemTemplate?: (item: T) => string
  itemFilterKey?: string | ((item: T) => string)
  activeItem?: T
}

export async function selectListView<T>({
  items,
  heading,
  itemTemplate,
  itemFilterKey,
  activeItem,
}: ISelectListParams<T>): Promise<T | undefined> {
  const elementForItem = (item: T) => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.style.display = 'inline-block'
    let isActive
    if (itemTemplate) {
      div.innerHTML = itemTemplate(item)
      isActive = activeItem && itemTemplate(item) === itemTemplate(activeItem)
    } else {
      div.innerText = `${item}`
      isActive = activeItem && item === activeItem
    }
    if (isActive) li.classList.add('active')
    // hack for backwards compatibility
    if (div.firstElementChild && div.firstElementChild.tagName === 'LI') {
      div.innerHTML = div.firstElementChild.innerHTML
    }
    li.appendChild(div)
    return li
  }
  const filterKeyForItem = (item: T) => {
    if (typeof itemFilterKey === 'string') {
      return `${item[itemFilterKey]}`
    } else if (itemFilterKey) {
      return itemFilterKey(item)
    } else {
      return `${item}`
    }
  }
  const myitems = await Promise.resolve(items)
  let panel: Panel<SelectListView<T>> | undefined
  try {
    return await new Promise<T | undefined>((resolve) => {
      const select = new SelectListView({
        items: myitems,
        infoMessage: heading,
        itemsClassList: ['ide-haskell', 'mark-active'],
        elementForItem,
        filterKeyForItem,
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
    if (panel) panel.destroy()
  }
}
