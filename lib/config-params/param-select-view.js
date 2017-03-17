'use babel';
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
            let select = new atom_select_list_1.default({
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
exports.default = selectListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc2VsZWN0LXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zZWxlY3Qtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7Ozs7Ozs7QUFFWCx1REFBNkM7QUFFN0Msd0JBQThDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBQzs7UUFDdEcsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLFdBQVcsR0FBRyxDQUFDLElBQUk7Z0JBQ2pCLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3JDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUVqQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUE7Z0JBQy9DLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQTtZQUNYLENBQUMsQ0FBQTtRQUNILENBQUM7UUFDRCxJQUFJLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUMsSUFBSSxLQUFLLENBQUE7UUFDVCxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSwwQkFBYyxDQUFDO2dCQUM5QixLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQUUsT0FBTztnQkFDcEIsU0FBUyxFQUFFLGFBQWE7Z0JBQ3hCLGNBQWMsRUFBRSxXQUFXO2dCQUMzQixnQkFBZ0IsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUMvQyxrQkFBa0IsRUFBRTtvQkFDbEIsT0FBTyxFQUFFLENBQUE7Z0JBQ1gsQ0FBQztnQkFDRCxtQkFBbUIsRUFBRSxDQUFDLElBQUk7b0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDZixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztnQkFDbkMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDRixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZixNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ1osQ0FBQztDQUFBO0FBckNELGlDQXFDQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmltcG9ydCBTZWxlY3RMaXN0VmlldyBmcm9tICdhdG9tLXNlbGVjdC1saXN0J1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBzZWxlY3RMaXN0VmlldyAoe2l0ZW1zLCBoZWFkaW5nLCBpdGVtVGVtcGxhdGUsIGl0ZW1GaWx0ZXJLZXksIGl0ZW1FbGVtZW50fSkge1xuICBpZiAoIWl0ZW1FbGVtZW50KSB7XG4gICAgaXRlbUVsZW1lbnQgPSAoaXRlbSkgPT4ge1xuICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgbGkuaW5uZXJIVE1MID0gaXRlbVRlbXBsYXRlKGl0ZW0pXG4gICAgICAvLyBoYWNrIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgaWYgKGxpLmZpcnN0RWxlbWVudENoaWxkICYmIGxpLmZpcnN0RWxlbWVudENoaWxkLnRhZ05hbWUgPT09ICdMSScpIHtcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gbGkuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MXG4gICAgICB9XG4gICAgICByZXR1cm4gbGlcbiAgICB9XG4gIH1cbiAgbGV0IG15aXRlbXMgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoaXRlbXMpXG4gIGxldCBwYW5lbFxuICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBzZWxlY3QgPSBuZXcgU2VsZWN0TGlzdFZpZXcoe1xuICAgICAgaXRlbXM6IG15aXRlbXMsXG4gICAgICBpbmZvTWVzc2FnZTogaGVhZGluZyxcbiAgICAgIGNsYXNzTmFtZTogJ2lkZS1oYXNrZWxsJyxcbiAgICAgIGVsZW1lbnRGb3JJdGVtOiBpdGVtRWxlbWVudCxcbiAgICAgIGZpbHRlcktleUZvckl0ZW06IChpdGVtKSA9PiBpdGVtW2l0ZW1GaWx0ZXJLZXldLFxuICAgICAgZGlkQ2FuY2VsU2VsZWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfSxcbiAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtKSA9PiB7XG4gICAgICAgIHJlc29sdmUoaXRlbSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHNlbGVjdC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgICBwYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoe1xuICAgICAgaXRlbTogc2VsZWN0LFxuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0pXG4gICAgc2VsZWN0LmZvY3VzKClcbiAgfSlcbiAgcGFuZWwuZGVzdHJveSgpXG4gIHJldHVybiByZXNcbn1cbiJdfQ==