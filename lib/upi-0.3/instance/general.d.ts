import { Point } from 'atom';
export interface IUPIMessageText {
    text: string;
    highlighter?: string;
}
export interface IUPIMessageHTML {
    html: string;
}
export declare type TPosition = Point | [number, number] | {
    row: number;
    column: number;
};
export declare type TUPIText = String | IUPIMessageText | IUPIMessageHTML;
export declare type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection';
