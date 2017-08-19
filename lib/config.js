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
        description: `,
    Frontend to use for displaying errors/warnigns/lints. Builtin,
    (i.e. output panel) and atom-linter supported.,
    Requires Atom restart.,
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
        description: `,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsOENBQThDO1FBQzNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsR0FBRztRQUNaLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFOzs7O0tBSVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUNqRCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixXQUFXLEVBQUU7Ozs7S0FJWjtRQUNELElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7UUFDM0IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHVCQUF1QixFQUFFO1FBQ3ZCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHdCQUF3QixFQUFFO1FBQ3hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUU7NkJBQ1k7UUFDekIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsV0FBVyxFQUFFOztLQUVaO1FBQ0QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQzNDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSwwREFBMEQ7UUFDdkUsS0FBSyxFQUFFLEVBQUU7S0FDVjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBvblNhdmVQcmV0dGlmeToge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBkZXNjcmlwdGlvbjogJ1J1biBmaWxlIHRocm91Z2ggc3R5bGlzaC1oYXNrZWxsIGJlZm9yZSBzYXZlJyxcbiAgICBvcmRlcjogMjAsXG4gIH0sXG4gIHN3aXRjaFRhYk9uQ2hlY2s6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogJ1N3aXRjaCB0byBlcnJvciB0YWIgYWZ0ZXIgZmlsZSBjaGVjayBmaW5pc2hlZCcsXG4gICAgb3JkZXI6IDEwLFxuICB9LFxuICBleHByZXNzaW9uVHlwZUludGVydmFsOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDMwMCxcbiAgICBkZXNjcmlwdGlvbjogJ1R5cGUvSW5mbyB0b29sdGlwIHNob3cgZGVsYXksIGluIG1zJyxcbiAgICBvcmRlcjogMzAsXG4gIH0sXG4gIG9uQ3Vyc29yTW92ZToge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlc2NyaXB0aW9uOiBgXG4gICAgU2hvdyBjaGVjayByZXN1bHRzIChlcnJvciwgbGludCkgZGVzY3JpcHRpb24gdG9vbHRpcHNcbiAgICB3aGVuIHRleHQgY3Vyc29yIGlzIG5lYXIgbWFya2VyLCBjbG9zZSBvcGVuIHRvb2x0aXBzLCBvciBkb1xuICAgIG5vdGhpbmc/XG4gICAgYCxcbiAgICBlbnVtOiBbJ1Nob3cgVG9vbHRpcCcsICdIaWRlIFRvb2x0aXAnLCAnTm90aGluZyddLFxuICAgIGRlZmF1bHQ6ICdOb3RoaW5nJyxcbiAgICBvcmRlcjogNDAsXG4gIH0sXG4gIG1lc3NhZ2VEaXNwbGF5RnJvbnRlbmQ6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnYnVpbHRpbicsXG4gICAgZGVzY3JpcHRpb246IGAsXG4gICAgRnJvbnRlbmQgdG8gdXNlIGZvciBkaXNwbGF5aW5nIGVycm9ycy93YXJuaWducy9saW50cy4gQnVpbHRpbixcbiAgICAoaS5lLiBvdXRwdXQgcGFuZWwpIGFuZCBhdG9tLWxpbnRlciBzdXBwb3J0ZWQuLFxuICAgIFJlcXVpcmVzIEF0b20gcmVzdGFydC4sXG4gICAgYCxcbiAgICBlbnVtOiBbJ2J1aWx0aW4nLCAnbGludGVyJ10sXG4gICAgb3JkZXI6IDQ1LFxuICB9LFxuICBzdHlsaXNoSGFza2VsbFBhdGg6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnc3R5bGlzaC1oYXNrZWxsJyxcbiAgICB0aXRsZTogJ1ByZXR0aWZpZXIgUGF0aCcsXG4gICAgZGVzY3JpcHRpb246ICdQYXRoIHRvIGBzdHlsaXNoLWhhc2tlbGxgIHV0aWxpdHkgb3Igb3RoZXIgcHJldHRpZmllcicsXG4gICAgb3JkZXI6IDYwLFxuICB9LFxuICBzdHlsaXNoSGFza2VsbEFyZ3VtZW50czoge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgZGVmYXVsdDogW10sXG4gICAgdGl0bGU6ICdQcmV0dGlmaWVyIEFyZ3VtZW50cycsXG4gICAgZGVzY3JpcHRpb246ICdBZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHByZXR0aWZpZXI7IGNvbW1hLXNlcGFyYXRlZCcsXG4gICAgaXRlbXM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgb3JkZXI6IDcwLFxuICB9LFxuICBjYWJhbFBhdGg6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnY2FiYWwnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGF0aCB0byBgY2FiYWxgIHV0aWxpdHksIGZvciBgY2FiYWwgZm9ybWF0YCcsXG4gICAgb3JkZXI6IDUwLFxuICB9LFxuICBzdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQ6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogYFNob3cgaW5mbyBtZXNzYWdlIGFib3V0IGhhc2tlbGwtaWRlLWJhY2tlbmQgc2VydmljZSBvblxuICAgICAgICAgICAgICAgICAgYWN0aXZhdGlvbmAsXG4gICAgb3JkZXI6IDgwLFxuICB9LFxuICBwYW5lbFBvc2l0aW9uOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2JvdHRvbScsXG4gICAgZGVzY3JpcHRpb246IGAsXG4gICAgRGVmYXVsdCBvdXRwdXQgcGFuZWwgcG9zaXRpb25cbiAgICBgLFxuICAgIGVudW06IFsnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAnY2VudGVyJ10sXG4gICAgb3JkZXI6IDQxLFxuICB9LFxuICBoaWRlUGFyYW1ldGVyVmFsdWVzOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGRlc2NyaXB0aW9uOiAnSGlkZSBhZGRpdGlvbmFsIHBsdWdpbiBwYXJhbWV0ZXIgdmFsdWVzIHVudGlsIGhvdmVyZWQnLFxuICAgIG9yZGVyOiAxMixcbiAgfSxcbiAgYXV0b0hpZGVPdXRwdXQ6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgZGVzY3JpcHRpb246ICdIaWRlIHBhbmVsIG91dHB1dCB3aGVuIHRoZXJlIGFyZSBubyBuZXcgbWVzc2FnZXMgdG8gc2hvdycsXG4gICAgb3JkZXI6IDExLFxuICB9LFxufVxuIl19