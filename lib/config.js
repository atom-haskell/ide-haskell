module.exports = {
    onSavePrettify: {
        type: 'boolean',
        default: false,
        description: 'Run file through stylish-haskell before save',
        order: 20
    },
    switchTabOnCheck: {
        type: 'boolean',
        default: true,
        description: 'Switch to error tab after file check finished',
        order: 10
    },
    expressionTypeInterval: {
        type: 'integer',
        default: 300,
        description: 'Type/Info tooltip show delay, in ms',
        order: 30
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
        order: 40
    },
    messageDisplayFrontend: {
        type: 'string',
        default: 'builtin',
        description: `,
    Frontend to use for displaying errors/warnigns/lints. Builtin,
    (i.e. output panel) and atom-linter supported.,
    Requires Atom restart.,
    `,
        enum: ['builtin', 'linter'],
        order: 45
    },
    stylishHaskellPath: {
        type: 'string',
        default: 'stylish-haskell',
        description: 'Path to `stylish-haskell` utility or other prettifier',
        order: 60
    },
    stylishHaskellArguments: {
        type: 'array',
        default: [],
        description: 'Additional arguments to pass to prettifier; comma-separated',
        items: {
            type: 'string'
        },
        order: 70
    },
    cabalPath: {
        type: 'string',
        default: 'cabal',
        description: 'Path to `cabal` utility, for `cabal format`',
        order: 50
    },
    startupMessageIdeBackend: {
        type: 'boolean',
        default: true,
        description: `Show info message about haskell-ide-backend service on
                  activation`,
        order: 80
    },
    panelPosition: {
        type: 'string',
        default: 'bottom',
        description: `,
    Output panel position
    `,
        enum: ['bottom', 'left', 'top', 'right'],
        order: 41
    },
    hideParameterValues: {
        type: 'boolean',
        default: false,
        description: 'Hide additional plugin parameter values until hovered',
        order: 12
    },
    autoHideOutput: {
        type: 'boolean',
        default: false,
        description: 'Hide panel output when there are no new messages to show',
        order: 11
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSw4Q0FBOEM7UUFDM0QsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUUsK0NBQStDO1FBQzVELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxzQkFBc0IsRUFBRTtRQUN0QixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxHQUFHO1FBQ1osV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUU7Ozs7S0FJWjtRQUNELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBQ2pELE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxzQkFBc0IsRUFBRTtRQUN0QixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFdBQVcsRUFBRTs7OztLQUlaO1FBQ0QsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztRQUMzQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHVCQUF1QixFQUFFO1FBQ3ZCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsT0FBTztRQUNoQixXQUFXLEVBQUUsNkNBQTZDO1FBQzFELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCx3QkFBd0IsRUFBRTtRQUN4QixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFOzZCQUNZO1FBQ3pCLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLFdBQVcsRUFBRTs7S0FFWjtRQUNELElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUN4QyxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsMERBQTBEO1FBQ3ZFLEtBQUssRUFBRSxFQUFFO0tBQ1Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uU2F2ZVByZXR0aWZ5OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnUnVuIGZpbGUgdGhyb3VnaCBzdHlsaXNoLWhhc2tlbGwgYmVmb3JlIHNhdmUnLFxuICAgIG9yZGVyOiAyMFxuICB9LFxuICBzd2l0Y2hUYWJPbkNoZWNrOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgZGVzY3JpcHRpb246ICdTd2l0Y2ggdG8gZXJyb3IgdGFiIGFmdGVyIGZpbGUgY2hlY2sgZmluaXNoZWQnLFxuICAgIG9yZGVyOiAxMFxuICB9LFxuICBleHByZXNzaW9uVHlwZUludGVydmFsOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDMwMCxcbiAgICBkZXNjcmlwdGlvbjogJ1R5cGUvSW5mbyB0b29sdGlwIHNob3cgZGVsYXksIGluIG1zJyxcbiAgICBvcmRlcjogMzBcbiAgfSxcbiAgb25DdXJzb3JNb3ZlOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVzY3JpcHRpb246IGBcbiAgICBTaG93IGNoZWNrIHJlc3VsdHMgKGVycm9yLCBsaW50KSBkZXNjcmlwdGlvbiB0b29sdGlwc1xuICAgIHdoZW4gdGV4dCBjdXJzb3IgaXMgbmVhciBtYXJrZXIsIGNsb3NlIG9wZW4gdG9vbHRpcHMsIG9yIGRvXG4gICAgbm90aGluZz9cbiAgICBgLFxuICAgIGVudW06IFsnU2hvdyBUb29sdGlwJywgJ0hpZGUgVG9vbHRpcCcsICdOb3RoaW5nJ10sXG4gICAgZGVmYXVsdDogJ05vdGhpbmcnLFxuICAgIG9yZGVyOiA0MFxuICB9LFxuICBtZXNzYWdlRGlzcGxheUZyb250ZW5kOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2J1aWx0aW4nLFxuICAgIGRlc2NyaXB0aW9uOiBgLFxuICAgIEZyb250ZW5kIHRvIHVzZSBmb3IgZGlzcGxheWluZyBlcnJvcnMvd2FybmlnbnMvbGludHMuIEJ1aWx0aW4sXG4gICAgKGkuZS4gb3V0cHV0IHBhbmVsKSBhbmQgYXRvbS1saW50ZXIgc3VwcG9ydGVkLixcbiAgICBSZXF1aXJlcyBBdG9tIHJlc3RhcnQuLFxuICAgIGAsXG4gICAgZW51bTogWydidWlsdGluJywgJ2xpbnRlciddLFxuICAgIG9yZGVyOiA0NVxuICB9LFxuICBzdHlsaXNoSGFza2VsbFBhdGg6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnc3R5bGlzaC1oYXNrZWxsJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhdGggdG8gYHN0eWxpc2gtaGFza2VsbGAgdXRpbGl0eSBvciBvdGhlciBwcmV0dGlmaWVyJyxcbiAgICBvcmRlcjogNjBcbiAgfSxcbiAgc3R5bGlzaEhhc2tlbGxBcmd1bWVudHM6IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGRlZmF1bHQ6IFtdLFxuICAgIGRlc2NyaXB0aW9uOiAnQWRkaXRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byBwcmV0dGlmaWVyOyBjb21tYS1zZXBhcmF0ZWQnLFxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH0sXG4gICAgb3JkZXI6IDcwXG4gIH0sXG4gIGNhYmFsUGF0aDoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdjYWJhbCcsXG4gICAgZGVzY3JpcHRpb246ICdQYXRoIHRvIGBjYWJhbGAgdXRpbGl0eSwgZm9yIGBjYWJhbCBmb3JtYXRgJyxcbiAgICBvcmRlcjogNTBcbiAgfSxcbiAgc3RhcnR1cE1lc3NhZ2VJZGVCYWNrZW5kOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgZGVzY3JpcHRpb246IGBTaG93IGluZm8gbWVzc2FnZSBhYm91dCBoYXNrZWxsLWlkZS1iYWNrZW5kIHNlcnZpY2Ugb25cbiAgICAgICAgICAgICAgICAgIGFjdGl2YXRpb25gLFxuICAgIG9yZGVyOiA4MFxuICB9LFxuICBwYW5lbFBvc2l0aW9uOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2JvdHRvbScsXG4gICAgZGVzY3JpcHRpb246IGAsXG4gICAgT3V0cHV0IHBhbmVsIHBvc2l0aW9uXG4gICAgYCxcbiAgICBlbnVtOiBbJ2JvdHRvbScsICdsZWZ0JywgJ3RvcCcsICdyaWdodCddLFxuICAgIG9yZGVyOiA0MVxuICB9LFxuICBoaWRlUGFyYW1ldGVyVmFsdWVzOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnSGlkZSBhZGRpdGlvbmFsIHBsdWdpbiBwYXJhbWV0ZXIgdmFsdWVzIHVudGlsIGhvdmVyZWQnLFxuICAgIG9yZGVyOiAxMlxuICB9LFxuICBhdXRvSGlkZU91dHB1dDoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBkZXNjcmlwdGlvbjogJ0hpZGUgcGFuZWwgb3V0cHV0IHdoZW4gdGhlcmUgYXJlIG5vIG5ldyBtZXNzYWdlcyB0byBzaG93JyxcbiAgICBvcmRlcjogMTFcbiAgfVxufVxuIl19