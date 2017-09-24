"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    onSavePrettify: {
        type: 'boolean',
        default: false,
        description: 'Run file through stylish-haskell before save',
        order: 20,
    },
    switchTabOnCheck: {
        type: 'boolean',
        default: true,
        description: 'Switch to error tab after file check finished',
        order: 10,
    },
    expressionTypeInterval: {
        type: 'integer',
        default: 300,
        description: 'Type/Info tooltip show delay, in ms',
        order: 30,
    },
    onCursorMove: {
        type: 'string',
        description: `
    Show check results (error, lint) description tooltips
    when text cursor is near marker, close open tooltips, or do
    nothing?
    `,
        enum: ['Show Tooltip', 'Hide Tooltip', 'Nothing'],
        default: 'Nothing',
        order: 40,
    },
    messageDisplayFrontend: {
        type: 'string',
        default: 'builtin',
        description: `
    Frontend to use for displaying errors/warnigns/lints. Builtin
    (i.e. output panel) and atom-linter supported.
    Requires Atom restart.
    `,
        enum: ['builtin', 'linter'],
        order: 45,
    },
    stylishHaskellPath: {
        type: 'string',
        default: 'stylish-haskell',
        title: 'Prettifier Path',
        description: 'Path to `stylish-haskell` utility or other prettifier',
        order: 60,
    },
    stylishHaskellArguments: {
        type: 'array',
        default: [],
        title: 'Prettifier Arguments',
        description: 'Additional arguments to pass to prettifier; comma-separated',
        items: {
            type: 'string',
        },
        order: 70,
    },
    cabalPath: {
        type: 'string',
        default: 'cabal',
        description: 'Path to `cabal` utility, for `cabal format`',
        order: 50,
    },
    startupMessageIdeBackend: {
        type: 'boolean',
        default: true,
        description: `Show info message about haskell-ide-backend service on
                  activation`,
        order: 80,
    },
    panelPosition: {
        type: 'string',
        default: 'bottom',
        title: 'Default Panel Position',
        description: `
    Default output panel position
    `,
        enum: ['bottom', 'left', 'right', 'center'],
        order: 41,
    },
    hideParameterValues: {
        type: 'boolean',
        default: false,
        description: 'Hide additional plugin parameter values until hovered',
        order: 12,
    },
    autoHideOutput: {
        type: 'boolean',
        default: false,
        description: 'Hide panel output when there are no new messages to show',
        order: 11,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsOENBQThDO1FBQzNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsR0FBRztRQUNaLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFOzs7O0tBSVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUNqRCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixXQUFXLEVBQUU7Ozs7S0FJWjtRQUNELElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7UUFDM0IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHVCQUF1QixFQUFFO1FBQ3ZCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHdCQUF3QixFQUFFO1FBQ3hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUU7NkJBQ1k7UUFDekIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsS0FBSyxFQUFFLHdCQUF3QjtRQUMvQixXQUFXLEVBQUU7O0tBRVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7UUFDM0MsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsV0FBVyxFQUFFLDBEQUEwRDtRQUN2RSxLQUFLLEVBQUUsRUFBRTtLQUNWO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIG9uU2F2ZVByZXR0aWZ5OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnUnVuIGZpbGUgdGhyb3VnaCBzdHlsaXNoLWhhc2tlbGwgYmVmb3JlIHNhdmUnLFxuICAgIG9yZGVyOiAyMCxcbiAgfSxcbiAgc3dpdGNoVGFiT25DaGVjazoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiAnU3dpdGNoIHRvIGVycm9yIHRhYiBhZnRlciBmaWxlIGNoZWNrIGZpbmlzaGVkJyxcbiAgICBvcmRlcjogMTAsXG4gIH0sXG4gIGV4cHJlc3Npb25UeXBlSW50ZXJ2YWw6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMzAwLFxuICAgIGRlc2NyaXB0aW9uOiAnVHlwZS9JbmZvIHRvb2x0aXAgc2hvdyBkZWxheSwgaW4gbXMnLFxuICAgIG9yZGVyOiAzMCxcbiAgfSxcbiAgb25DdXJzb3JNb3ZlOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVzY3JpcHRpb246IGBcbiAgICBTaG93IGNoZWNrIHJlc3VsdHMgKGVycm9yLCBsaW50KSBkZXNjcmlwdGlvbiB0b29sdGlwc1xuICAgIHdoZW4gdGV4dCBjdXJzb3IgaXMgbmVhciBtYXJrZXIsIGNsb3NlIG9wZW4gdG9vbHRpcHMsIG9yIGRvXG4gICAgbm90aGluZz9cbiAgICBgLFxuICAgIGVudW06IFsnU2hvdyBUb29sdGlwJywgJ0hpZGUgVG9vbHRpcCcsICdOb3RoaW5nJ10sXG4gICAgZGVmYXVsdDogJ05vdGhpbmcnLFxuICAgIG9yZGVyOiA0MCxcbiAgfSxcbiAgbWVzc2FnZURpc3BsYXlGcm9udGVuZDoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdidWlsdGluJyxcbiAgICBkZXNjcmlwdGlvbjogYFxuICAgIEZyb250ZW5kIHRvIHVzZSBmb3IgZGlzcGxheWluZyBlcnJvcnMvd2FybmlnbnMvbGludHMuIEJ1aWx0aW5cbiAgICAoaS5lLiBvdXRwdXQgcGFuZWwpIGFuZCBhdG9tLWxpbnRlciBzdXBwb3J0ZWQuXG4gICAgUmVxdWlyZXMgQXRvbSByZXN0YXJ0LlxuICAgIGAsXG4gICAgZW51bTogWydidWlsdGluJywgJ2xpbnRlciddLFxuICAgIG9yZGVyOiA0NSxcbiAgfSxcbiAgc3R5bGlzaEhhc2tlbGxQYXRoOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ3N0eWxpc2gtaGFza2VsbCcsXG4gICAgdGl0bGU6ICdQcmV0dGlmaWVyIFBhdGgnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGF0aCB0byBgc3R5bGlzaC1oYXNrZWxsYCB1dGlsaXR5IG9yIG90aGVyIHByZXR0aWZpZXInLFxuICAgIG9yZGVyOiA2MCxcbiAgfSxcbiAgc3R5bGlzaEhhc2tlbGxBcmd1bWVudHM6IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGRlZmF1bHQ6IFtdLFxuICAgIHRpdGxlOiAnUHJldHRpZmllciBBcmd1bWVudHMnLFxuICAgIGRlc2NyaXB0aW9uOiAnQWRkaXRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byBwcmV0dGlmaWVyOyBjb21tYS1zZXBhcmF0ZWQnLFxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIG9yZGVyOiA3MCxcbiAgfSxcbiAgY2FiYWxQYXRoOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2NhYmFsJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhdGggdG8gYGNhYmFsYCB1dGlsaXR5LCBmb3IgYGNhYmFsIGZvcm1hdGAnLFxuICAgIG9yZGVyOiA1MCxcbiAgfSxcbiAgc3RhcnR1cE1lc3NhZ2VJZGVCYWNrZW5kOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgZGVzY3JpcHRpb246IGBTaG93IGluZm8gbWVzc2FnZSBhYm91dCBoYXNrZWxsLWlkZS1iYWNrZW5kIHNlcnZpY2Ugb25cbiAgICAgICAgICAgICAgICAgIGFjdGl2YXRpb25gLFxuICAgIG9yZGVyOiA4MCxcbiAgfSxcbiAgcGFuZWxQb3NpdGlvbjoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdib3R0b20nLFxuICAgIHRpdGxlOiAnRGVmYXVsdCBQYW5lbCBQb3NpdGlvbicsXG4gICAgZGVzY3JpcHRpb246IGBcbiAgICBEZWZhdWx0IG91dHB1dCBwYW5lbCBwb3NpdGlvblxuICAgIGAsXG4gICAgZW51bTogWydib3R0b20nLCAnbGVmdCcsICdyaWdodCcsICdjZW50ZXInXSxcbiAgICBvcmRlcjogNDEsXG4gIH0sXG4gIGhpZGVQYXJhbWV0ZXJWYWx1ZXM6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgZGVzY3JpcHRpb246ICdIaWRlIGFkZGl0aW9uYWwgcGx1Z2luIHBhcmFtZXRlciB2YWx1ZXMgdW50aWwgaG92ZXJlZCcsXG4gICAgb3JkZXI6IDEyLFxuICB9LFxuICBhdXRvSGlkZU91dHB1dDoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBkZXNjcmlwdGlvbjogJ0hpZGUgcGFuZWwgb3V0cHV0IHdoZW4gdGhlcmUgYXJlIG5vIG5ldyBtZXNzYWdlcyB0byBzaG93JyxcbiAgICBvcmRlcjogMTEsXG4gIH0sXG59XG4iXX0=