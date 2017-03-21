export interface IMessageText {
    text: string;
    highlighter?: string;
}
export interface IMessageHTML {
    html: string;
}
export declare type TMessage = string | IMessageText | IMessageHTML | MessageObject;
export declare class MessageObject {
    private msg;
    static fromObject(message: TMessage): MessageObject;
    private htmlCache?;
    constructor(msg: string | IMessageText | IMessageHTML);
    toHtml(): string;
    raw(): string | IMessageHTML;
}
