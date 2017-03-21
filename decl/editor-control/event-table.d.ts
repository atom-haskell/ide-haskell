import { TextEditor, DisplayMarkerLayer } from 'atom';
export declare const TEventRangeType: {
    keyboard: "keyboard";
    context: "context";
    mouse: "mouse";
    selection: "selection";
};
export declare function isTEventRangeType(x: Object): x is TEventRangeType;
export declare type TEventRangeType = keyof typeof TEventRangeType;
export declare type IMarkerGroup = Array<{
    type: TEventRangeType;
    source?: string;
}>;
export declare class EventTable {
    private editor;
    private table;
    private layers;
    constructor(editor: TextEditor, groups: IMarkerGroup[]);
    destroy(): void;
    get(type: TEventRangeType, source?: string): DisplayMarkerLayer;
    clear(): void;
    getMarkerCount(): number;
    keys(): string[];
    values(): IterableIterator<any>;
    entries(): IterableIterator<any[]>;
}
