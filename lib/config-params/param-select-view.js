'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SelectListView from 'atom-select-list';
export default function selectListView({ items, heading, itemTemplate, itemFilterKey, itemElement }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!itemElement) {
            itemElement = (item) => {
                let li = document.createElement('li');
                li.innerHTML = itemTemplate(item);
                if (li.firstElementChild && li.firstElementChild.tagName === 'LI') {
                    li.innerHTML = li.firstElementChild.innerHTML;
                }
                return li;
            };
        }
        let myitems = yield Promise.resolve(items);
        let panel;
        let res = yield new Promise((resolve, reject) => {
            let select = new SelectListView({
                items: myitems,
                infoMessage: heading,
                className: 'ide-haskell',
                elementForItem: itemElement,
                filterKeyForItem: (item) => item[itemFilterKey],
                didCancelSelection: () => {
                    resolve();
                },
                didConfirmSelection: (item) => {
                    resolve(item);
                }
            });
            select.element.classList.add('ide-haskell');
            panel = atom.workspace.addModalPanel({
                item: select,
                visible: true
            });
            select.focus();
        });
        panel.destroy();
        return res;
    });
}
