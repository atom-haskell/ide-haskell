'use babel'

import SelectListView from 'atom-select-list'

export default async function selectListView ({items, heading, itemTemplate, itemFilterKey, itemElement}) {
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
  let panel
  let res = await new Promise((resolve, reject) => {
    let select = new SelectListView({
      items: myitems,
      infoMessage: heading,
      className: 'ide-haskell',
      elementForItem: itemElement,
      filterKeyForItem: (item) => item[itemFilterKey],
      didCancelSelection: () => {
        resolve()
      },
      didConfirmSelection: (item) => {
        resolve(item)
      }
    })
    select.element.classList.add('ide-haskell')
    panel = atom.workspace.addModalPanel({
      item: select,
      visible: true
    })
    select.focus()
  })
  panel.destroy()
  return res
}
