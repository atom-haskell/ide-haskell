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
                title: 'Literal Haskell',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUseUNBQXlDO1FBQ3RELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSw2QkFBNkI7UUFDcEMsS0FBSyxFQUFFLEVBQUU7UUFDVCxVQUFVLEVBQUU7WUFDVixhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELGVBQWUsRUFBRTtnQkFDZixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUUsRUFBRTthQUNWO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsRUFBRTthQUNWO1lBQ0Qsd0JBQXdCLEVBQUU7Z0JBQ3hCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGO0tBQ0Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsR0FBRztRQUNaLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFOzs7O0tBSVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUNqRCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixXQUFXLEVBQUU7Ozs7S0FJWjtRQUNELElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7UUFDM0IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHVCQUF1QixFQUFFO1FBQ3ZCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHdCQUF3QixFQUFFO1FBQ3hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUU7NkJBQ1k7UUFDekIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsS0FBSyxFQUFFLHdCQUF3QjtRQUMvQixXQUFXLEVBQUU7O0tBRVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7UUFDM0MsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELG1CQUFtQixFQUFFO1FBQ25CLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsV0FBVyxFQUFFLDBEQUEwRDtRQUN2RSxLQUFLLEVBQUUsRUFBRTtLQUNWO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIG9uU2F2ZVByZXR0aWZ5OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnUnVuIGZpbGUgdGhyb3VnaCBwcmV0dGlmaWVyIGJlZm9yZSBzYXZlJyxcbiAgICBvcmRlcjogMjAsXG4gIH0sXG4gIG9uU2F2ZVByZXR0aWZ5Rm9ybWF0czoge1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHRpdGxlOiAnRm9ybWF0cyB0byBwcmV0dGlmeSBvbiBzYXZlJyxcbiAgICBvcmRlcjogMjEsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgJ3NvdXJjZSpjMmhzJzoge1xuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB0aXRsZTogJ0MySFMnLFxuICAgICAgICBvcmRlcjogNDAsXG4gICAgICB9LFxuICAgICAgJ3NvdXJjZSpjYWJhbCc6IHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgdGl0bGU6ICdDYWJhbCBmaWxlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVW5saWtlIG90aGVycywgd2lsbCB1c2UgYGNhYmFsIGZvcm1hdGAnLFxuICAgICAgICBvcmRlcjogMjAsXG4gICAgICB9LFxuICAgICAgJ3NvdXJjZSpoc2MyaHMnOiB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAnSFNDMkhTJyxcbiAgICAgICAgb3JkZXI6IDUwLFxuICAgICAgfSxcbiAgICAgICdzb3VyY2UqaGFza2VsbCc6IHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB0aXRsZTogJ0hhc2tlbGwnLFxuICAgICAgICBvcmRlcjogMTAsXG4gICAgICB9LFxuICAgICAgJ3RleHQqdGV4KmxhdGV4Kmhhc2tlbGwnOiB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAnTGl0ZXJhbCBIYXNrZWxsJyxcbiAgICAgICAgb3JkZXI6IDE1LFxuICAgICAgfSxcbiAgICAgICdzb3VyY2UqaHNpZyc6IHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgdGl0bGU6ICdNb2R1bGUgc2lnbmF0dXJlcyAoaHNpZyknLFxuICAgICAgICBvcmRlcjogMzAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHN3aXRjaFRhYk9uQ2hlY2s6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogJ1N3aXRjaCB0byBlcnJvciB0YWIgYWZ0ZXIgZmlsZSBjaGVjayBmaW5pc2hlZCcsXG4gICAgb3JkZXI6IDEwLFxuICB9LFxuICBleHByZXNzaW9uVHlwZUludGVydmFsOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDMwMCxcbiAgICBkZXNjcmlwdGlvbjogJ1R5cGUvSW5mbyB0b29sdGlwIHNob3cgZGVsYXksIGluIG1zJyxcbiAgICBvcmRlcjogMzAsXG4gIH0sXG4gIG9uQ3Vyc29yTW92ZToge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlc2NyaXB0aW9uOiBgXG4gICAgU2hvdyBjaGVjayByZXN1bHRzIChlcnJvciwgbGludCkgZGVzY3JpcHRpb24gdG9vbHRpcHNcbiAgICB3aGVuIHRleHQgY3Vyc29yIGlzIG5lYXIgbWFya2VyLCBjbG9zZSBvcGVuIHRvb2x0aXBzLCBvciBkb1xuICAgIG5vdGhpbmc/XG4gICAgYCxcbiAgICBlbnVtOiBbJ1Nob3cgVG9vbHRpcCcsICdIaWRlIFRvb2x0aXAnLCAnTm90aGluZyddLFxuICAgIGRlZmF1bHQ6ICdOb3RoaW5nJyxcbiAgICBvcmRlcjogNDAsXG4gIH0sXG4gIG1lc3NhZ2VEaXNwbGF5RnJvbnRlbmQ6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnYnVpbHRpbicsXG4gICAgZGVzY3JpcHRpb246IGBcbiAgICBGcm9udGVuZCB0byB1c2UgZm9yIGRpc3BsYXlpbmcgZXJyb3JzL3dhcm5pZ25zL2xpbnRzLiBCdWlsdGluXG4gICAgKGkuZS4gb3V0cHV0IHBhbmVsKSBhbmQgYXRvbS1saW50ZXIgc3VwcG9ydGVkLlxuICAgIFJlcXVpcmVzIEF0b20gcmVzdGFydC5cbiAgICBgLFxuICAgIGVudW06IFsnYnVpbHRpbicsICdsaW50ZXInXSxcbiAgICBvcmRlcjogNDUsXG4gIH0sXG4gIHN0eWxpc2hIYXNrZWxsUGF0aDoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdzdHlsaXNoLWhhc2tlbGwnLFxuICAgIHRpdGxlOiAnUHJldHRpZmllciBQYXRoJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhdGggdG8gYHN0eWxpc2gtaGFza2VsbGAgdXRpbGl0eSBvciBvdGhlciBwcmV0dGlmaWVyJyxcbiAgICBvcmRlcjogNjAsXG4gIH0sXG4gIHN0eWxpc2hIYXNrZWxsQXJndW1lbnRzOiB7XG4gICAgdHlwZTogJ2FycmF5JyxcbiAgICBkZWZhdWx0OiBbXSxcbiAgICB0aXRsZTogJ1ByZXR0aWZpZXIgQXJndW1lbnRzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0FkZGl0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gcHJldHRpZmllcjsgY29tbWEtc2VwYXJhdGVkJyxcbiAgICBpdGVtczoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBvcmRlcjogNzAsXG4gIH0sXG4gIGNhYmFsUGF0aDoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdjYWJhbCcsXG4gICAgZGVzY3JpcHRpb246ICdQYXRoIHRvIGBjYWJhbGAgdXRpbGl0eSwgZm9yIGBjYWJhbCBmb3JtYXRgJyxcbiAgICBvcmRlcjogNTAsXG4gIH0sXG4gIHN0YXJ0dXBNZXNzYWdlSWRlQmFja2VuZDoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiBgU2hvdyBpbmZvIG1lc3NhZ2UgYWJvdXQgaGFza2VsbC1pZGUtYmFja2VuZCBzZXJ2aWNlIG9uXG4gICAgICAgICAgICAgICAgICBhY3RpdmF0aW9uYCxcbiAgICBvcmRlcjogODAsXG4gIH0sXG4gIHBhbmVsUG9zaXRpb246IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnYm90dG9tJyxcbiAgICB0aXRsZTogJ0RlZmF1bHQgUGFuZWwgUG9zaXRpb24nLFxuICAgIGRlc2NyaXB0aW9uOiBgXG4gICAgRGVmYXVsdCBvdXRwdXQgcGFuZWwgcG9zaXRpb25cbiAgICBgLFxuICAgIGVudW06IFsnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAnY2VudGVyJ10sXG4gICAgb3JkZXI6IDQxLFxuICB9LFxuICBoaWRlUGFyYW1ldGVyVmFsdWVzOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnSGlkZSBhZGRpdGlvbmFsIHBsdWdpbiBwYXJhbWV0ZXIgdmFsdWVzIHVudGlsIGhvdmVyZWQnLFxuICAgIG9yZGVyOiAxMixcbiAgfSxcbiAgYXV0b0hpZGVPdXRwdXQ6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgZGVzY3JpcHRpb246ICdIaWRlIHBhbmVsIG91dHB1dCB3aGVuIHRoZXJlIGFyZSBubyBuZXcgbWVzc2FnZXMgdG8gc2hvdycsXG4gICAgb3JkZXI6IDExLFxuICB9LFxufVxuIl19