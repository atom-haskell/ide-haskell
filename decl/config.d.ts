export declare const config: {
    onSavePrettify: {
        type: string;
        default: boolean;
        description: string;
        order: number;
    };
    switchTabOnCheck: {
        type: string;
        default: boolean;
        description: string;
        order: number;
    };
    expressionTypeInterval: {
        type: string;
        default: number;
        description: string;
        order: number;
    };
    onCursorMove: {
        type: string;
        description: string;
        enum: string[];
        default: string;
        order: number;
    };
    messageDisplayFrontend: {
        type: string;
        default: string;
        description: string;
        enum: string[];
        order: number;
    };
    stylishHaskellPath: {
        type: string;
        default: string;
        description: string;
        order: number;
    };
    stylishHaskellArguments: {
        type: string;
        default: never[];
        description: string;
        items: {
            type: string;
        };
        order: number;
    };
    cabalPath: {
        type: string;
        default: string;
        description: string;
        order: number;
    };
    startupMessageIdeBackend: {
        type: string;
        default: boolean;
        description: string;
        order: number;
    };
    panelPosition: {
        type: string;
        default: string;
        description: string;
        enum: string[];
        order: number;
    };
    hideParameterValues: {
        type: string;
        default: boolean;
        description: string;
        order: number;
    };
    autoHideOutput: {
        type: string;
        default: boolean;
        description: string;
        order: number;
    };
};
