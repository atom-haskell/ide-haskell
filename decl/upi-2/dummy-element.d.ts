import { IControlOpts } from '../output-panel';
export declare class DummyElement {
    private opts;
    element: HTMLElement;
    constructor(opts: IControlOpts & {
        element: HTMLElement;
    });
    update(opts: IControlOpts & {
        element: HTMLElement;
    }): Promise<void>;
    private init();
}
