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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc2VsZWN0LXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zZWxlY3Qtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBV25ELHdCQUNFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBd0I7O1FBRWxGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFPO1lBQ2pDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsRUFBRSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQTtZQUMxQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFBO1lBQy9DLENBQUM7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQyxDQUFBO1FBQ0QsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFPO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFBO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7WUFDbEIsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1QyxJQUFJLEtBQXdCLENBQUE7UUFDNUIsSUFBSSxHQUFrQixDQUFBO1FBQ3RCLElBQUksQ0FBQztZQUNILEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNyRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQztvQkFDaEMsS0FBSyxFQUFFLE9BQU87b0JBQ2QsV0FBVyxFQUFFLE9BQU87b0JBQ3BCLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDL0IsY0FBYyxFQUFFLFdBQVcsSUFBSSxrQkFBa0I7b0JBQ2pELGdCQUFnQixFQUFFLFdBQVc7b0JBQzdCLGtCQUFrQixFQUFFO3dCQUNsQixPQUFPLEVBQUUsQ0FBQTtvQkFDWCxDQUFDO29CQUNELG1CQUFtQixFQUFFLENBQUMsSUFBTzt3QkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUNmLENBQUM7aUJBQ0YsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDM0MsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO29CQUNuQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUE7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztnQkFBUyxDQUFDO1lBQ1QsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNaLENBQUM7Q0FBQTtBQXRERCx3Q0FzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VsZWN0TGlzdFZpZXcgPSByZXF1aXJlKCdhdG9tLXNlbGVjdC1saXN0JylcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGludGVyZmFjZSBJU2VsZWN0TGlzdFBhcmFtczxUPiB7XG4gIGl0ZW1zOiBUW10gfCBQcm9taXNlPFRbXT5cbiAgaGVhZGluZz86IHN0cmluZ1xuICBpdGVtVGVtcGxhdGU/OiAoaXRlbTogVCkgPT4gc3RyaW5nXG4gIGl0ZW1GaWx0ZXJLZXk/OiBzdHJpbmcgfCAoKGl0ZW06IFQpID0+IHN0cmluZylcbiAgaXRlbUVsZW1lbnQ/OiAoaXRlbTogVCkgPT4gSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdExpc3RWaWV3PFQ+KFxuICB7IGl0ZW1zLCBoZWFkaW5nLCBpdGVtVGVtcGxhdGUsIGl0ZW1GaWx0ZXJLZXksIGl0ZW1FbGVtZW50IH06IElTZWxlY3RMaXN0UGFyYW1zPFQ+LFxuKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gIGNvbnN0IGl0ZW1FbGVtZW50RGVmYXVsdCA9IChpdGVtOiBUKSA9PiB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgaWYgKGl0ZW1UZW1wbGF0ZSkge1xuICAgICAgbGkuaW5uZXJIVE1MID0gaXRlbVRlbXBsYXRlKGl0ZW0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpLmlubmVyVGV4dCA9IGAke2l0ZW19YFxuICAgIH1cbiAgICAvLyBoYWNrIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIGlmIChsaS5maXJzdEVsZW1lbnRDaGlsZCAmJiBsaS5maXJzdEVsZW1lbnRDaGlsZC50YWdOYW1lID09PSAnTEknKSB7XG4gICAgICBsaS5pbm5lckhUTUwgPSBsaS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUxcbiAgICB9XG4gICAgcmV0dXJuIGxpXG4gIH1cbiAgY29uc3QgZmlsdGVyS2V5Rm4gPSAoaXRlbTogVCkgPT4ge1xuICAgIGlmICh0eXBlb2YgaXRlbUZpbHRlcktleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBgJHtpdGVtW2l0ZW1GaWx0ZXJLZXldfWBcbiAgICB9IGVsc2UgaWYgKGl0ZW1GaWx0ZXJLZXkpIHtcbiAgICAgIHJldHVybiBpdGVtRmlsdGVyS2V5KGl0ZW0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtpdGVtfWBcbiAgICB9XG4gIH1cbiAgY29uc3QgbXlpdGVtcyA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShpdGVtcylcbiAgbGV0IHBhbmVsOiBQYW5lbCB8IHVuZGVmaW5lZFxuICBsZXQgcmVzOiBUIHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8VCB8IHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ID0gbmV3IFNlbGVjdExpc3RWaWV3KHtcbiAgICAgICAgaXRlbXM6IG15aXRlbXMsXG4gICAgICAgIGluZm9NZXNzYWdlOiBoZWFkaW5nLFxuICAgICAgICBpdGVtc0NsYXNzTGlzdDogWydpZGUtaGFza2VsbCddLFxuICAgICAgICBlbGVtZW50Rm9ySXRlbTogaXRlbUVsZW1lbnQgfHwgaXRlbUVsZW1lbnREZWZhdWx0LFxuICAgICAgICBmaWx0ZXJLZXlGb3JJdGVtOiBmaWx0ZXJLZXlGbixcbiAgICAgICAgZGlkQ2FuY2VsU2VsZWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0sXG4gICAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtOiBUKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShpdGVtKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIHNlbGVjdC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgICAgIHBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XG4gICAgICAgIGl0ZW06IHNlbGVjdCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICBzZWxlY3QuZm9jdXMoKVxuICAgIH0pXG4gIH0gZmluYWxseSB7XG4gICAgcGFuZWwgJiYgcGFuZWwuZGVzdHJveSgpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuIl19