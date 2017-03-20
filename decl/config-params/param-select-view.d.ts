export interface ISelectListParams<T> {
    items: T[] | Promise<T[]>;
    heading?: string;
    itemTemplate?: (item: T) => string;
    itemFilterKey?: string | ((item: T) => string);
    itemElement?: (item: T) => HTMLElement;
}
export declare function selectListView<T>({items, heading, itemTemplate, itemFilterKey, itemElement}: ISelectListParams<T>): Promise<T | undefined>;
