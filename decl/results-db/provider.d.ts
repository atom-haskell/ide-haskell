import { IResultItem } from './result-item';
import { ResultsDB } from './';
export declare type TMessageProviderFunction = (pushMessages: (messages: IResultItem[]) => void) => void;
export declare class Provider {
    private parent;
    readonly id: number;
    private name;
    private disposed;
    constructor(parent: ResultsDB, id: number, name: string);
    dispose(): void;
    setMessages(messages: IResultItem[]): void;
}
