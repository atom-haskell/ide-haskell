"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
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
        title: 'Prettifier Path',
        description: 'Path to `stylish-haskell` utility or other prettifier',
        order: 60
    },
    stylishHaskellArguments: {
        type: 'array',
        default: [],
        title: 'Prettifier Arguments',
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
    Default output panel position
    `,
        enum: ['bottom', 'left', 'right', 'center'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsOENBQThDO1FBQzNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsR0FBRztRQUNaLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFOzs7O0tBSVo7UUFDRCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUNqRCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixXQUFXLEVBQUU7Ozs7S0FJWjtRQUNELElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7UUFDM0IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHVCQUF1QixFQUFFO1FBQ3ZCLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELHdCQUF3QixFQUFFO1FBQ3hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUU7NkJBQ1k7UUFDekIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsV0FBVyxFQUFFOztLQUVaO1FBQ0QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQzNDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSwwREFBMEQ7UUFDdkUsS0FBSyxFQUFFLEVBQUU7S0FDVjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBvblNhdmVQcmV0dGlmeToge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBkZXNjcmlwdGlvbjogJ1J1biBmaWxlIHRocm91Z2ggc3R5bGlzaC1oYXNrZWxsIGJlZm9yZSBzYXZlJyxcbiAgICBvcmRlcjogMjBcbiAgfSxcbiAgc3dpdGNoVGFiT25DaGVjazoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiAnU3dpdGNoIHRvIGVycm9yIHRhYiBhZnRlciBmaWxlIGNoZWNrIGZpbmlzaGVkJyxcbiAgICBvcmRlcjogMTBcbiAgfSxcbiAgZXhwcmVzc2lvblR5cGVJbnRlcnZhbDoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAzMDAsXG4gICAgZGVzY3JpcHRpb246ICdUeXBlL0luZm8gdG9vbHRpcCBzaG93IGRlbGF5LCBpbiBtcycsXG4gICAgb3JkZXI6IDMwXG4gIH0sXG4gIG9uQ3Vyc29yTW92ZToge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlc2NyaXB0aW9uOiBgXG4gICAgU2hvdyBjaGVjayByZXN1bHRzIChlcnJvciwgbGludCkgZGVzY3JpcHRpb24gdG9vbHRpcHNcbiAgICB3aGVuIHRleHQgY3Vyc29yIGlzIG5lYXIgbWFya2VyLCBjbG9zZSBvcGVuIHRvb2x0aXBzLCBvciBkb1xuICAgIG5vdGhpbmc/XG4gICAgYCxcbiAgICBlbnVtOiBbJ1Nob3cgVG9vbHRpcCcsICdIaWRlIFRvb2x0aXAnLCAnTm90aGluZyddLFxuICAgIGRlZmF1bHQ6ICdOb3RoaW5nJyxcbiAgICBvcmRlcjogNDBcbiAgfSxcbiAgbWVzc2FnZURpc3BsYXlGcm9udGVuZDoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdidWlsdGluJyxcbiAgICBkZXNjcmlwdGlvbjogYCxcbiAgICBGcm9udGVuZCB0byB1c2UgZm9yIGRpc3BsYXlpbmcgZXJyb3JzL3dhcm5pZ25zL2xpbnRzLiBCdWlsdGluLFxuICAgIChpLmUuIG91dHB1dCBwYW5lbCkgYW5kIGF0b20tbGludGVyIHN1cHBvcnRlZC4sXG4gICAgUmVxdWlyZXMgQXRvbSByZXN0YXJ0LixcbiAgICBgLFxuICAgIGVudW06IFsnYnVpbHRpbicsICdsaW50ZXInXSxcbiAgICBvcmRlcjogNDVcbiAgfSxcbiAgc3R5bGlzaEhhc2tlbGxQYXRoOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ3N0eWxpc2gtaGFza2VsbCcsXG4gICAgdGl0bGU6ICdQcmV0dGlmaWVyIFBhdGgnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGF0aCB0byBgc3R5bGlzaC1oYXNrZWxsYCB1dGlsaXR5IG9yIG90aGVyIHByZXR0aWZpZXInLFxuICAgIG9yZGVyOiA2MFxuICB9LFxuICBzdHlsaXNoSGFza2VsbEFyZ3VtZW50czoge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgZGVmYXVsdDogW10sXG4gICAgdGl0bGU6ICdQcmV0dGlmaWVyIEFyZ3VtZW50cycsXG4gICAgZGVzY3JpcHRpb246ICdBZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHByZXR0aWZpZXI7IGNvbW1hLXNlcGFyYXRlZCcsXG4gICAgaXRlbXM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBvcmRlcjogNzBcbiAgfSxcbiAgY2FiYWxQYXRoOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2NhYmFsJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhdGggdG8gYGNhYmFsYCB1dGlsaXR5LCBmb3IgYGNhYmFsIGZvcm1hdGAnLFxuICAgIG9yZGVyOiA1MFxuICB9LFxuICBzdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQ6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogYFNob3cgaW5mbyBtZXNzYWdlIGFib3V0IGhhc2tlbGwtaWRlLWJhY2tlbmQgc2VydmljZSBvblxuICAgICAgICAgICAgICAgICAgYWN0aXZhdGlvbmAsXG4gICAgb3JkZXI6IDgwXG4gIH0sXG4gIHBhbmVsUG9zaXRpb246IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnYm90dG9tJyxcbiAgICBkZXNjcmlwdGlvbjogYCxcbiAgICBEZWZhdWx0IG91dHB1dCBwYW5lbCBwb3NpdGlvblxuICAgIGAsXG4gICAgZW51bTogWydib3R0b20nLCAnbGVmdCcsICdyaWdodCcsICdjZW50ZXInXSxcbiAgICBvcmRlcjogNDFcbiAgfSxcbiAgaGlkZVBhcmFtZXRlclZhbHVlczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBkZXNjcmlwdGlvbjogJ0hpZGUgYWRkaXRpb25hbCBwbHVnaW4gcGFyYW1ldGVyIHZhbHVlcyB1bnRpbCBob3ZlcmVkJyxcbiAgICBvcmRlcjogMTJcbiAgfSxcbiAgYXV0b0hpZGVPdXRwdXQ6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgZGVzY3JpcHRpb246ICdIaWRlIHBhbmVsIG91dHB1dCB3aGVuIHRoZXJlIGFyZSBubyBuZXcgbWVzc2FnZXMgdG8gc2hvdycsXG4gICAgb3JkZXI6IDExXG4gIH1cbn1cbiJdfQ==