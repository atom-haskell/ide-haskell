import { Point } from 'atom';
import { TMessage, MessageObject } from '../utils';
export declare type TSeverity = 'error' | 'warning' | 'lint' | string;
export declare type TPosition = Point | [number, number];
export interface IResultItem {
    uri?: string;
    position?: TPosition;
    message: TMessage;
    severity: TSeverity;
}
export declare class ResultItem {
    readonly providerId: number;
    readonly uri?: string;
    readonly position?: Point;
    readonly message: MessageObject;
    readonly severity: TSeverity;
    private _isValid;
    constructor(providerId: number, {uri, message, severity, position}: IResultItem);
    isValid(): boolean;
    setValid(isValid: boolean): void;
}
