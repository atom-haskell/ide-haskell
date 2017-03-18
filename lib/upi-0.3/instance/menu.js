import { MainMenuLabel } from '../../utils';
export function create(disposables) {
    return {
        set({ label, menu }) {
            const menuDisp = atom.menu.add([{
                    label: MainMenuLabel,
                    submenu: [{ label: label, submenu: menu }]
                }]);
            disposables.add(menuDisp);
            return menuDisp;
        }
    };
}
