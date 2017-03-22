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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc2VsZWN0LXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zZWxlY3Qtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBV25ELHdCQUNFLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBdUI7O1FBRWhGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFPO1lBQ2pDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsRUFBRSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQTtZQUMxQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFBO1lBQy9DLENBQUM7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQyxDQUFBO1FBQ0QsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFPO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFBO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUE7WUFDbEIsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1QyxJQUFJLEtBQXdCLENBQUE7UUFDNUIsSUFBSSxHQUFrQixDQUFBO1FBQ3RCLElBQUksQ0FBQztZQUNILEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFjLENBQUMsT0FBTyxFQUFFLE1BQU07Z0JBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDO29CQUNoQyxLQUFLLEVBQUUsT0FBTztvQkFDZCxXQUFXLEVBQUUsT0FBTztvQkFDcEIsY0FBYyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMvQixjQUFjLEVBQUUsV0FBVyxJQUFJLGtCQUFrQjtvQkFDakQsZ0JBQWdCLEVBQUUsV0FBVztvQkFDN0Isa0JBQWtCLEVBQUU7d0JBQ2xCLE9BQU8sRUFBRSxDQUFBO29CQUNYLENBQUM7b0JBQ0QsbUJBQW1CLEVBQUUsQ0FBQyxJQUFPO3dCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2YsQ0FBQztpQkFDRixDQUFDLENBQUE7Z0JBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUMzQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7b0JBQ25DLElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUMsQ0FBQTtnQkFDRixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO2dCQUFTLENBQUM7WUFDVCxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ1osQ0FBQztDQUFBO0FBdERELHdDQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWxlY3RMaXN0VmlldyA9IHJlcXVpcmUoJ2F0b20tc2VsZWN0LWxpc3QnKVxuaW1wb3J0IHtQYW5lbH0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGludGVyZmFjZSBJU2VsZWN0TGlzdFBhcmFtczxUPiB7XG4gIGl0ZW1zOiBUW10gfCBQcm9taXNlPFRbXT5cbiAgaGVhZGluZz86IHN0cmluZ1xuICBpdGVtVGVtcGxhdGU/OiAoaXRlbTogVCkgPT4gc3RyaW5nXG4gIGl0ZW1GaWx0ZXJLZXk/OiBzdHJpbmcgfCAoKGl0ZW06IFQpID0+IHN0cmluZylcbiAgaXRlbUVsZW1lbnQ/OiAoaXRlbTogVCkgPT4gSFRNTEVsZW1lbnRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdExpc3RWaWV3PFQ+IChcbiAge2l0ZW1zLCBoZWFkaW5nLCBpdGVtVGVtcGxhdGUsIGl0ZW1GaWx0ZXJLZXksIGl0ZW1FbGVtZW50fTogSVNlbGVjdExpc3RQYXJhbXM8VD5cbik6IFByb21pc2U8VHx1bmRlZmluZWQ+IHtcbiAgY29uc3QgaXRlbUVsZW1lbnREZWZhdWx0ID0gKGl0ZW06IFQpID0+IHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBpZiAoaXRlbVRlbXBsYXRlKSB7XG4gICAgICBsaS5pbm5lckhUTUwgPSBpdGVtVGVtcGxhdGUoaXRlbSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGkuaW5uZXJUZXh0ID0gYCR7aXRlbX1gXG4gICAgfVxuICAgIC8vIGhhY2sgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgaWYgKGxpLmZpcnN0RWxlbWVudENoaWxkICYmIGxpLmZpcnN0RWxlbWVudENoaWxkLnRhZ05hbWUgPT09ICdMSScpIHtcbiAgICAgIGxpLmlubmVySFRNTCA9IGxpLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTFxuICAgIH1cbiAgICByZXR1cm4gbGlcbiAgfVxuICBjb25zdCBmaWx0ZXJLZXlGbiA9IChpdGVtOiBUKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpdGVtRmlsdGVyS2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGAke2l0ZW1baXRlbUZpbHRlcktleV19YFxuICAgIH0gZWxzZSBpZiAoaXRlbUZpbHRlcktleSkge1xuICAgICAgcmV0dXJuIGl0ZW1GaWx0ZXJLZXkoaXRlbSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2l0ZW19YFxuICAgIH1cbiAgfVxuICBjb25zdCBteWl0ZW1zID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGl0ZW1zKVxuICBsZXQgcGFuZWw6IFBhbmVsIHwgdW5kZWZpbmVkXG4gIGxldCByZXM6IFQgfCB1bmRlZmluZWRcbiAgdHJ5IHtcbiAgICByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxUfHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ID0gbmV3IFNlbGVjdExpc3RWaWV3KHtcbiAgICAgICAgaXRlbXM6IG15aXRlbXMsXG4gICAgICAgIGluZm9NZXNzYWdlOiBoZWFkaW5nLFxuICAgICAgICBpdGVtc0NsYXNzTGlzdDogWydpZGUtaGFza2VsbCddLFxuICAgICAgICBlbGVtZW50Rm9ySXRlbTogaXRlbUVsZW1lbnQgfHwgaXRlbUVsZW1lbnREZWZhdWx0LFxuICAgICAgICBmaWx0ZXJLZXlGb3JJdGVtOiBmaWx0ZXJLZXlGbixcbiAgICAgICAgZGlkQ2FuY2VsU2VsZWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0sXG4gICAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtOiBUKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShpdGVtKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgc2VsZWN0LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuICAgICAgcGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogc2VsZWN0LFxuICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICB9KVxuICAgICAgc2VsZWN0LmZvY3VzKClcbiAgICB9KVxuICB9IGZpbmFsbHkge1xuICAgIHBhbmVsICYmIHBhbmVsLmRlc3Ryb3koKVxuICB9XG4gIHJldHVybiByZXNcbn1cbiJdfQ==