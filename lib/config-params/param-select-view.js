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
const atom_select_list_1 = require("atom-select-list");
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
                const select = new atom_select_list_1.default({
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
                    }
                });
                select.element.classList.add('ide-haskell');
                panel = atom.workspace.addModalPanel({
                    item: select,
                    visible: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc2VsZWN0LXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zZWxlY3Qtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdURBQTZDO0FBVzdDLHdCQUNFLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBdUI7O1FBRWhGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFPO1lBQ2pDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsRUFBRSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQTtZQUMxQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFBO1lBQy9DLENBQUM7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQyxDQUFBO1FBQ0QsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFPO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFBO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7WUFDbEIsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1QyxJQUFJLEtBQXdCLENBQUE7UUFDNUIsSUFBSSxHQUFrQixDQUFBO1FBQ3RCLElBQUksQ0FBQztZQUNILEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFjLENBQUMsT0FBTyxFQUFFLE1BQU07Z0JBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQWMsQ0FBQztvQkFDaEMsS0FBSyxFQUFFLE9BQU87b0JBQ2QsV0FBVyxFQUFFLE9BQU87b0JBQ3BCLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDL0IsY0FBYyxFQUFFLFdBQVcsSUFBSSxrQkFBa0I7b0JBQ2pELGdCQUFnQixFQUFFLFdBQVc7b0JBQzdCLGtCQUFrQixFQUFFO3dCQUNsQixPQUFPLEVBQUUsQ0FBQTtvQkFDWCxDQUFDO29CQUNELG1CQUFtQixFQUFFLENBQUMsSUFBTzt3QkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUNmLENBQUM7aUJBQ0YsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDM0MsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO29CQUNuQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUE7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztnQkFBUyxDQUFDO1lBQ1QsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNaLENBQUM7Q0FBQTtBQXRERCx3Q0FzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VsZWN0TGlzdFZpZXcgZnJvbSAnYXRvbS1zZWxlY3QtbGlzdCdcbmltcG9ydCB7UGFuZWx9IGZyb20gJ2F0b20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdExpc3RQYXJhbXM8VD4ge1xuICBpdGVtczogVFtdIHwgUHJvbWlzZTxUW10+XG4gIGhlYWRpbmc/OiBzdHJpbmdcbiAgaXRlbVRlbXBsYXRlPzogKGl0ZW06IFQpID0+IHN0cmluZ1xuICBpdGVtRmlsdGVyS2V5Pzogc3RyaW5nIHwgKChpdGVtOiBUKSA9PiBzdHJpbmcpXG4gIGl0ZW1FbGVtZW50PzogKGl0ZW06IFQpID0+IEhUTUxFbGVtZW50XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RMaXN0VmlldzxUPiAoXG4gIHtpdGVtcywgaGVhZGluZywgaXRlbVRlbXBsYXRlLCBpdGVtRmlsdGVyS2V5LCBpdGVtRWxlbWVudH06IElTZWxlY3RMaXN0UGFyYW1zPFQ+XG4pOiBQcm9taXNlPFR8dW5kZWZpbmVkPiB7XG4gIGNvbnN0IGl0ZW1FbGVtZW50RGVmYXVsdCA9IChpdGVtOiBUKSA9PiB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgaWYgKGl0ZW1UZW1wbGF0ZSkge1xuICAgICAgbGkuaW5uZXJIVE1MID0gaXRlbVRlbXBsYXRlKGl0ZW0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpLmlubmVyVGV4dCA9IGAke2l0ZW19YFxuICAgIH1cbiAgICAvLyBoYWNrIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIGlmIChsaS5maXJzdEVsZW1lbnRDaGlsZCAmJiBsaS5maXJzdEVsZW1lbnRDaGlsZC50YWdOYW1lID09PSAnTEknKSB7XG4gICAgICBsaS5pbm5lckhUTUwgPSBsaS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUxcbiAgICB9XG4gICAgcmV0dXJuIGxpXG4gIH1cbiAgY29uc3QgZmlsdGVyS2V5Rm4gPSAoaXRlbTogVCkgPT4ge1xuICAgIGlmICh0eXBlb2YgaXRlbUZpbHRlcktleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBgJHtpdGVtW2l0ZW1GaWx0ZXJLZXldfWBcbiAgICB9IGVsc2UgaWYgKGl0ZW1GaWx0ZXJLZXkpIHtcbiAgICAgIHJldHVybiBpdGVtRmlsdGVyS2V5KGl0ZW0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtpdGVtfWBcbiAgICB9XG4gIH1cbiAgY29uc3QgbXlpdGVtcyA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShpdGVtcylcbiAgbGV0IHBhbmVsOiBQYW5lbCB8IHVuZGVmaW5lZFxuICBsZXQgcmVzOiBUIHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8VHx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IG5ldyBTZWxlY3RMaXN0Vmlldyh7XG4gICAgICAgIGl0ZW1zOiBteWl0ZW1zLFxuICAgICAgICBpbmZvTWVzc2FnZTogaGVhZGluZyxcbiAgICAgICAgaXRlbXNDbGFzc0xpc3Q6IFsnaWRlLWhhc2tlbGwnXSxcbiAgICAgICAgZWxlbWVudEZvckl0ZW06IGl0ZW1FbGVtZW50IHx8IGl0ZW1FbGVtZW50RGVmYXVsdCxcbiAgICAgICAgZmlsdGVyS2V5Rm9ySXRlbTogZmlsdGVyS2V5Rm4sXG4gICAgICAgIGRpZENhbmNlbFNlbGVjdGlvbjogKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9LFxuICAgICAgICBkaWRDb25maXJtU2VsZWN0aW9uOiAoaXRlbTogVCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHNlbGVjdC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgICAgIHBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XG4gICAgICAgIGl0ZW06IHNlbGVjdCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICAgIHNlbGVjdC5mb2N1cygpXG4gICAgfSlcbiAgfSBmaW5hbGx5IHtcbiAgICBwYW5lbCAmJiBwYW5lbC5kZXN0cm95KClcbiAgfVxuICByZXR1cm4gcmVzXG59XG4iXX0=