"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    onSavePrettify: {
        type: 'boolean',
        default: false,
        description: 'Run file through prettifier before save',
        order: 20,
    },
    onSavePrettifyFormats: {
        type: 'object',
        title: 'Formats to prettify on save',
        order: 21,
        properties: {
            'source*c2hs': {
                type: 'boolean',
                default: false,
                title: 'C2HS',
                order: 40,
            },
            'source*cabal': {
                type: 'boolean',
                default: false,
                title: 'Cabal files',
                description: 'Unlike others, will use `cabal format`',
                order: 20,
            },
            'source*hsc2hs': {
                type: 'boolean',
                default: false,
                title: 'HSC2HS',
                order: 50,
            },
            'source*haskell': {
                type: 'boolean',
                default: true,
                title: 'Haskell',
                order: 10,
            },
            'text*tex*latex*haskell': {
                type: 'boolean',
                default: false,
                title: 'Literate Haskell',
                order: 15,
            },
            'source*hsig': {
                type: 'boolean',
                default: false,
                title: 'Module signatures (hsig)',
                order: 30,
            },
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUseUNBQXlDO1FBQ3RELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSw2QkFBNkI7UUFDcEMsS0FBSyxFQUFFLEVBQUU7UUFDVCxVQUFVLEVBQUU7WUFDVixhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELGVBQWUsRUFBRTtnQkFDZixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUUsRUFBRTthQUNWO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsRUFBRTthQUNWO1lBQ0Qsd0JBQXdCLEVBQUU7Z0JBQ3hCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxrQkFBa0I7Z0JBQ3pCLEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGO0tBQ0Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsR0FBRztRQUNaLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFOzs7O0tBSVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUNqRCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixXQUFXLEVBQUU7Ozs7S0FJWjtRQUNELElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7UUFDM0IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHVCQUF1QixFQUFFO1FBQ3ZCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHdCQUF3QixFQUFFO1FBQ3hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUU7NkJBQ1k7UUFDekIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsS0FBSyxFQUFFLHdCQUF3QjtRQUMvQixXQUFXLEVBQUU7O0tBRVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7UUFDM0MsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsV0FBVyxFQUFFLDBEQUEwRDtRQUN2RSxLQUFLLEVBQUUsRUFBRTtLQUNWO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIG9uU2F2ZVByZXR0aWZ5OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnUnVuIGZpbGUgdGhyb3VnaCBwcmV0dGlmaWVyIGJlZm9yZSBzYXZlJyxcbiAgICBvcmRlcjogMjAsXG4gIH0sXG4gIG9uU2F2ZVByZXR0aWZ5Rm9ybWF0czoge1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHRpdGxlOiAnRm9ybWF0cyB0byBwcmV0dGlmeSBvbiBzYXZlJyxcbiAgICBvcmRlcjogMjEsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgJ3NvdXJjZSpjMmhzJzoge1xuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB0aXRsZTogJ0MySFMnLFxuICAgICAgICBvcmRlcjogNDAsXG4gICAgICB9LFxuICAgICAgJ3NvdXJjZSpjYWJhbCc6IHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgdGl0bGU6ICdDYWJhbCBmaWxlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVW5saWtlIG90aGVycywgd2lsbCB1c2UgYGNhYmFsIGZvcm1hdGAnLFxuICAgICAgICBvcmRlcjogMjAsXG4gICAgICB9LFxuICAgICAgJ3NvdXJjZSpoc2MyaHMnOiB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAnSFNDMkhTJyxcbiAgICAgICAgb3JkZXI6IDUwLFxuICAgICAgfSxcbiAgICAgICdzb3VyY2UqaGFza2VsbCc6IHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB0aXRsZTogJ0hhc2tlbGwnLFxuICAgICAgICBvcmRlcjogMTAsXG4gICAgICB9LFxuICAgICAgJ3RleHQqdGV4KmxhdGV4Kmhhc2tlbGwnOiB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAnTGl0ZXJhdGUgSGFza2VsbCcsXG4gICAgICAgIG9yZGVyOiAxNSxcbiAgICAgIH0sXG4gICAgICAnc291cmNlKmhzaWcnOiB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAnTW9kdWxlIHNpZ25hdHVyZXMgKGhzaWcpJyxcbiAgICAgICAgb3JkZXI6IDMwLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzd2l0Y2hUYWJPbkNoZWNrOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgZGVzY3JpcHRpb246ICdTd2l0Y2ggdG8gZXJyb3IgdGFiIGFmdGVyIGZpbGUgY2hlY2sgZmluaXNoZWQnLFxuICAgIG9yZGVyOiAxMCxcbiAgfSxcbiAgZXhwcmVzc2lvblR5cGVJbnRlcnZhbDoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAzMDAsXG4gICAgZGVzY3JpcHRpb246ICdUeXBlL0luZm8gdG9vbHRpcCBzaG93IGRlbGF5LCBpbiBtcycsXG4gICAgb3JkZXI6IDMwLFxuICB9LFxuICBvbkN1cnNvck1vdmU6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZXNjcmlwdGlvbjogYFxuICAgIFNob3cgY2hlY2sgcmVzdWx0cyAoZXJyb3IsIGxpbnQpIGRlc2NyaXB0aW9uIHRvb2x0aXBzXG4gICAgd2hlbiB0ZXh0IGN1cnNvciBpcyBuZWFyIG1hcmtlciwgY2xvc2Ugb3BlbiB0b29sdGlwcywgb3IgZG9cbiAgICBub3RoaW5nP1xuICAgIGAsXG4gICAgZW51bTogWydTaG93IFRvb2x0aXAnLCAnSGlkZSBUb29sdGlwJywgJ05vdGhpbmcnXSxcbiAgICBkZWZhdWx0OiAnTm90aGluZycsXG4gICAgb3JkZXI6IDQwLFxuICB9LFxuICBtZXNzYWdlRGlzcGxheUZyb250ZW5kOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2J1aWx0aW4nLFxuICAgIGRlc2NyaXB0aW9uOiBgXG4gICAgRnJvbnRlbmQgdG8gdXNlIGZvciBkaXNwbGF5aW5nIGVycm9ycy93YXJuaWducy9saW50cy4gQnVpbHRpblxuICAgIChpLmUuIG91dHB1dCBwYW5lbCkgYW5kIGF0b20tbGludGVyIHN1cHBvcnRlZC5cbiAgICBSZXF1aXJlcyBBdG9tIHJlc3RhcnQuXG4gICAgYCxcbiAgICBlbnVtOiBbJ2J1aWx0aW4nLCAnbGludGVyJ10sXG4gICAgb3JkZXI6IDQ1LFxuICB9LFxuICBzdHlsaXNoSGFza2VsbFBhdGg6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnc3R5bGlzaC1oYXNrZWxsJyxcbiAgICB0aXRsZTogJ1ByZXR0aWZpZXIgUGF0aCcsXG4gICAgZGVzY3JpcHRpb246ICdQYXRoIHRvIGBzdHlsaXNoLWhhc2tlbGxgIHV0aWxpdHkgb3Igb3RoZXIgcHJldHRpZmllcicsXG4gICAgb3JkZXI6IDYwLFxuICB9LFxuICBzdHlsaXNoSGFza2VsbEFyZ3VtZW50czoge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgZGVmYXVsdDogW10sXG4gICAgdGl0bGU6ICdQcmV0dGlmaWVyIEFyZ3VtZW50cycsXG4gICAgZGVzY3JpcHRpb246ICdBZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHByZXR0aWZpZXI7IGNvbW1hLXNlcGFyYXRlZCcsXG4gICAgaXRlbXM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgb3JkZXI6IDcwLFxuICB9LFxuICBjYWJhbFBhdGg6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnY2FiYWwnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGF0aCB0byBgY2FiYWxgIHV0aWxpdHksIGZvciBgY2FiYWwgZm9ybWF0YCcsXG4gICAgb3JkZXI6IDUwLFxuICB9LFxuICBzdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQ6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogYFNob3cgaW5mbyBtZXNzYWdlIGFib3V0IGhhc2tlbGwtaWRlLWJhY2tlbmQgc2VydmljZSBvblxuICAgICAgICAgICAgICAgICAgYWN0aXZhdGlvbmAsXG4gICAgb3JkZXI6IDgwLFxuICB9LFxuICBwYW5lbFBvc2l0aW9uOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2JvdHRvbScsXG4gICAgdGl0bGU6ICdEZWZhdWx0IFBhbmVsIFBvc2l0aW9uJyxcbiAgICBkZXNjcmlwdGlvbjogYFxuICAgIERlZmF1bHQgb3V0cHV0IHBhbmVsIHBvc2l0aW9uXG4gICAgYCxcbiAgICBlbnVtOiBbJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JywgJ2NlbnRlciddLFxuICAgIG9yZGVyOiA0MSxcbiAgfSxcbiAgaGlkZVBhcmFtZXRlclZhbHVlczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBkZXNjcmlwdGlvbjogJ0hpZGUgYWRkaXRpb25hbCBwbHVnaW4gcGFyYW1ldGVyIHZhbHVlcyB1bnRpbCBob3ZlcmVkJyxcbiAgICBvcmRlcjogMTIsXG4gIH0sXG4gIGF1dG9IaWRlT3V0cHV0OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnSGlkZSBwYW5lbCBvdXRwdXQgd2hlbiB0aGVyZSBhcmUgbm8gbmV3IG1lc3NhZ2VzIHRvIHNob3cnLFxuICAgIG9yZGVyOiAxMSxcbiAgfSxcbn1cbiJdfQ==