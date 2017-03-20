export declare type TDirection = 'horizontal' | 'vertical';
export declare class ProgressBar {
    private direction;
    private progress;
    constructor({orientation}?: {
        orientation?: TDirection;
    });
    render(): JSX.Element;
    update({orientation}?: {
        orientation?: TDirection;
    }): any;
    setProgress(progress: number): void;
    destroy(): Promise<void>;
}
