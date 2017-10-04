export const config = {
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
}
