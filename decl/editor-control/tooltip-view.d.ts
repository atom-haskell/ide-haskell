import { MessageObject } from '../utils';
export declare class TooltipMessage {
    private message;
    private element;
    constructor(message: MessageObject | MessageObject[]);
    render(): JSX.Element;
    update(): any;
    writeAfterUpdate(): void;
}
