"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SelectListView = require("atom-select-list");
function selectListView({ items, heading, itemTemplate, itemFilterKey, itemElement }) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemElementDefault = (item) => {
            const li = document.createElement('li');
            if (itemTemplate) {
                li.innerHTML = itemTemplate(item);
            }
            else {
                li.innerText = `${item}`;
            }
            if (li.firstElementChild && li.firstElementChild.tagName === 'LI') {
                li.innerHTML = li.firstElementChild.innerHTML;
            }
            return li;
        };
        const filterKeyFn = (item) => {
            if (typeof itemFilterKey === 'string') {
                return `${item[itemFilterKey]}`;
            }
            else if (itemFilterKey) {
                return itemFilterKey(item);
            }
            else {
                return `${item}`;
            }
        };
        const myitems = yield Promise.resolve(items);
        let panel;
        let res;
        try {
            res = yield new Promise((resolve, reject) => {
                const select = new SelectListView({
                    items: myitems,
                    infoMessage: heading,
                    itemsClassList: ['ide-haskell'],
                    elementForItem: itemElement || itemElementDefault,
                    filterKeyForItem: filterKeyFn,
                    didCancelSelection: () => {
                        resolve();
                    },
                    didConfirmSelection: (item) => {
                        resolve(item);
                    },
                });
                select.element.classList.add('ide-haskell');
                panel = atom.workspace.addModalPanel({
                    item: select,
                    visible: true,
                });
                select.focus();
            });
        }
        finally {
            panel && panel.destroy();
        }
        return res;
    });
}
exports.selectListView = selectListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc2VsZWN0LXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zZWxlY3Qtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBV25ELHdCQUNFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBd0I7O1FBRWxGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFPLEVBQUUsRUFBRTtZQUNyQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ25DLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixFQUFFLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUE7WUFDMUIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQTtZQUMvQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUMsQ0FBQTtRQUNELE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBTyxFQUFFLEVBQUU7WUFDOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxhQUFhLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUE7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtZQUNsQixDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVDLElBQUksS0FBMkMsQ0FBQTtRQUMvQyxJQUFJLEdBQWtCLENBQUE7UUFDdEIsSUFBSSxDQUFDO1lBQ0gsR0FBRyxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQztvQkFDaEMsS0FBSyxFQUFFLE9BQU87b0JBQ2QsV0FBVyxFQUFFLE9BQU87b0JBQ3BCLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDL0IsY0FBYyxFQUFFLFdBQVcsSUFBSSxrQkFBa0I7b0JBQ2pELGdCQUFnQixFQUFFLFdBQVc7b0JBQzdCLGtCQUFrQixFQUFFLEdBQUcsRUFBRTt3QkFDdkIsT0FBTyxFQUFFLENBQUE7b0JBQ1gsQ0FBQztvQkFDRCxtQkFBbUIsRUFBRSxDQUFDLElBQU8sRUFBRSxFQUFFO3dCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2YsQ0FBQztpQkFDRixDQUFDLENBQUE7Z0JBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUMzQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7b0JBQ25DLElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQTtnQkFDRixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO2dCQUFTLENBQUM7WUFDVCxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ1osQ0FBQztDQUFBO0FBdERELHdDQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWxlY3RMaXN0VmlldyA9IHJlcXVpcmUoJ2F0b20tc2VsZWN0LWxpc3QnKVxuaW1wb3J0IHsgUGFuZWwgfSBmcm9tICdhdG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZWxlY3RMaXN0UGFyYW1zPFQ+IHtcbiAgaXRlbXM6IFRbXSB8IFByb21pc2U8VFtdPlxuICBoZWFkaW5nPzogc3RyaW5nXG4gIGl0ZW1UZW1wbGF0ZT86IChpdGVtOiBUKSA9PiBzdHJpbmdcbiAgaXRlbUZpbHRlcktleT86IHN0cmluZyB8ICgoaXRlbTogVCkgPT4gc3RyaW5nKVxuICBpdGVtRWxlbWVudD86IChpdGVtOiBUKSA9PiBIVE1MRWxlbWVudFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0TGlzdFZpZXc8VD4oXG4gIHsgaXRlbXMsIGhlYWRpbmcsIGl0ZW1UZW1wbGF0ZSwgaXRlbUZpbHRlcktleSwgaXRlbUVsZW1lbnQgfTogSVNlbGVjdExpc3RQYXJhbXM8VD4sXG4pOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgaXRlbUVsZW1lbnREZWZhdWx0ID0gKGl0ZW06IFQpID0+IHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBpZiAoaXRlbVRlbXBsYXRlKSB7XG4gICAgICBsaS5pbm5lckhUTUwgPSBpdGVtVGVtcGxhdGUoaXRlbSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGkuaW5uZXJUZXh0ID0gYCR7aXRlbX1gXG4gICAgfVxuICAgIC8vIGhhY2sgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgaWYgKGxpLmZpcnN0RWxlbWVudENoaWxkICYmIGxpLmZpcnN0RWxlbWVudENoaWxkLnRhZ05hbWUgPT09ICdMSScpIHtcbiAgICAgIGxpLmlubmVySFRNTCA9IGxpLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTFxuICAgIH1cbiAgICByZXR1cm4gbGlcbiAgfVxuICBjb25zdCBmaWx0ZXJLZXlGbiA9IChpdGVtOiBUKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpdGVtRmlsdGVyS2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGAke2l0ZW1baXRlbUZpbHRlcktleV19YFxuICAgIH0gZWxzZSBpZiAoaXRlbUZpbHRlcktleSkge1xuICAgICAgcmV0dXJuIGl0ZW1GaWx0ZXJLZXkoaXRlbSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2l0ZW19YFxuICAgIH1cbiAgfVxuICBjb25zdCBteWl0ZW1zID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGl0ZW1zKVxuICBsZXQgcGFuZWw6IFBhbmVsPFNlbGVjdExpc3RWaWV3PFQ+PiB8IHVuZGVmaW5lZFxuICBsZXQgcmVzOiBUIHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8VCB8IHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ID0gbmV3IFNlbGVjdExpc3RWaWV3KHtcbiAgICAgICAgaXRlbXM6IG15aXRlbXMsXG4gICAgICAgIGluZm9NZXNzYWdlOiBoZWFkaW5nLFxuICAgICAgICBpdGVtc0NsYXNzTGlzdDogWydpZGUtaGFza2VsbCddLFxuICAgICAgICBlbGVtZW50Rm9ySXRlbTogaXRlbUVsZW1lbnQgfHwgaXRlbUVsZW1lbnREZWZhdWx0LFxuICAgICAgICBmaWx0ZXJLZXlGb3JJdGVtOiBmaWx0ZXJLZXlGbixcbiAgICAgICAgZGlkQ2FuY2VsU2VsZWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0sXG4gICAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtOiBUKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShpdGVtKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIHNlbGVjdC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgICAgIHBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XG4gICAgICAgIGl0ZW06IHNlbGVjdCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICBzZWxlY3QuZm9jdXMoKVxuICAgIH0pXG4gIH0gZmluYWxseSB7XG4gICAgcGFuZWwgJiYgcGFuZWwuZGVzdHJveSgpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuIl19