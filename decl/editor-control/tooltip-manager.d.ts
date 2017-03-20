import { Range, TextEditor } from 'atom';
import { MessageObject } from '../utils';
import { TEventRangeType } from './event-table';
export { TEventRangeType };
export interface IMarkerProperties {
    persistOnCursorMove: boolean;
}
export declare class TooltipManager {
    private editor;
    private markers;
    constructor(editor: TextEditor);
    dispose(): void;
    show(range: Range, text: MessageObject | MessageObject[], type: TEventRangeType, source: string, detail: IMarkerProperties): void;
    hide(type?: TEventRangeType, source?: string, template?: IMarkerProperties): void;
    has(type?: TEventRangeType, source?: string, template?: IMarkerProperties): number | boolean;
    private decorate(marker, tooltipView);
}
