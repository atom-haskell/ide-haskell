import { TextEditor, Disposable, Range } from 'atom';
import { TMessage } from '../utils';
import { PluginManager } from '../plugin-manager';
import { TEventRangeType } from '../editor-control/tooltip-manager';
import { TPosition } from '../results-db';
export declare type TTooltipFunction = (crange: Range) => ITooltipData | Promise<ITooltipData>;
export declare type TRange = Range | [TPosition, TPosition];
export interface ITooltipData {
    range: TRange;
    text: TMessage | TMessage[];
    persistOnCursorMove?: boolean;
}
export declare type TTooltipHandler = (editor: TextEditor, crange: Range, type: TEventRangeType) => ITooltipData | undefined | Promise<ITooltipData | undefined>;
export declare type TTooltipHandlerSpec = {
    priority: number;
    handler: TTooltipHandler;
};
export declare type TTooltipSpec = {
    pluginName: string;
    tooltip: TTooltipFunction;
};
export declare class TooltipRegistry {
    private pluginManager;
    private providers;
    constructor(pluginManager: PluginManager);
    dispose(): void;
    register(pluginName: string, provider: TTooltipHandlerSpec): Disposable;
    showTooltip(editor: TextEditor, type: TEventRangeType, spec?: TTooltipSpec): Promise<void>;
    private defaultTooltipFunction(editor, type, crange);
}
