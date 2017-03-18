import { CompositeDisposable, Disposable } from 'atom';
export interface IMainInterface {
    set(options: IMenuDefinition): Disposable;
}
export interface IMenuDefinition {
    label: string;
    menu: any[];
}
export declare function create(disposables: CompositeDisposable): IMainInterface;
