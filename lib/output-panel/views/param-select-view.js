'use babel'

import SelectListView from 'atom-select-list'

export default async function selectListView ({onConfirmed, onCancelled, items, heading, itemTemplate, itemFilterKey, itemElement}) {
  if (!itemElement) {
    itemElement = (item) => {
      let li = document.createElement('li')
      li.innerHTML = itemTemplate(item)
      // hack for backwards compatibility
      if (li.firstElementChild && li.firstElementChild.tagName === 'LI') {
        li.innerHTML = li.firstElementChild.innerHTML
      }
      return li
    }
  }
  let myitems = await Promise.resolve(items)
  let select = new SelectListView({
    items: myitems,
    infoMessage: heading,
    className: 'ide-haskell',
    elementForItem: itemElement,
    filterKeyForItem: (item) => item[itemFilterKey],
    didCancelSelection: () => {
      this.panel.destroy()
      if (onCancelled) onCancelled()
    },
    didConfirmSelection: (item) => {
      this.panel.destroy()
      if (onConfirmed) onConfirmed(item)
    }
  })
  select.element.classList.add('ide-haskell')
  this.panel = atom.workspace.addModalPanel({
    item: select,
    visible: true
  })
  select.focus()
}
