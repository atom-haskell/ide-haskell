import { Emitter } from 'atom';
export interface IProps {
    active: boolean;
    ref: string;
    count: number;
    emitter: Emitter;
}
export declare class Button {
    props: IProps;
    constructor(props: IProps);
    render(): JSX.Element;
    update(props?: IProps): any;
    destroy(): Promise<void>;
    toggleActive(): void;
    deactivate(): void;
    activate(): void;
    setCount(count: number): void;
    getCount(): number;
    private didClick();
}
