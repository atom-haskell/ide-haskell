import { TPosition, TSeverity, IResultItem, ResultItem } from './result-item';
import { Provider, TMessageProviderFunction } from './provider';
export { TPosition, TSeverity, IResultItem, TMessageProviderFunction, ResultItem };
export declare type TUpdateCallback = (arg: ResultsDB) => void;
export declare class ResultsDB {
    private currentId;
    private messages;
    private disposables;
    private emitter;
    constructor();
    destroy(): void;
    onDidUpdate(callback: TUpdateCallback): AtomTypes.Disposable;
    didUpdate(providerId: number, msgs: ResultItem[]): void;
    registerProvider(providerName: string): Provider;
    results(): IterableIterator<ResultItem>;
    filter(f: (item: ResultItem) => boolean): IterableIterator<ResultItem>;
    isEmpty(): boolean;
}
