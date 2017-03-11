module.exports = {
  config: require('./config'),

  cleanConfig: function () {},

  activate: function (state) {
    this.cleanConfig()

    atom.views.getView(atom.workspace).classList.add('ide-haskell')

    this.upiProvided = false

    if (atom.config.get('ide-haskell.startupMessageIdeBackend')) {
      setTimeout(() => {
        if (!this.upiProvided) {
          atom.notifications.addWarning(`
            Ide-Haskell needs backends that provide most of functionality.
            Please refer to README for details
            `, {dismissable: true})
        }
      }, 5000)
    }

    let {CompositeDisposable} = require('atom')
    this.disposables = new CompositeDisposable()

    let PluginManager = require('./plugin-manager')
    this.pluginManager = new PluginManager(state)

    // global commands
    this.disposables.add(atom.commands.add('atom-workspace', {
      'ide-haskell:toggle-output': () =>
        this.pluginManager.togglePanel()
    }))

    let {prettifyFile} = require('./prettify')

    this.disposables.add(
      atom.commands.add('atom-text-editor[data-grammar~="haskell"]', {
        'ide-haskell:prettify-file': ({currentTarget}) =>
          prettifyFile(currentTarget.getModel()),
        'ide-haskell:close-tooltip': ({currentTarget, abortKeyBinding}) => {
          let controller = this.pluginManager.controller(currentTarget.getModel())
          if (!controller) return
          if (controller.hasTooltips && controller.hasTooltips()) {
            controller.hideTooltip()
          } else if (abortKeyBinding) {
            abortKeyBinding()
          }
        },
        'ide-haskell:next-error': () => this.pluginManager.nextError(),
        'ide-haskell:prev-error': () => this.pluginManager.prevError()
      }))

    this.disposables.add(
      atom.commands.add('atom-text-editor[data-grammar~="cabal"]', {
        'ide-haskell:prettify-file': ({currentTarget}) =>
          prettifyFile(currentTarget.getModel(), 'cabal')
      }))

    atom.keymaps.add('ide-haskell', {
      'atom-text-editor[data-grammar~="haskell"]':
        {'escape': 'ide-haskell:close-tooltip'}
    })

    let {MainMenuLabel} = require('./utils')
    this.menu = new CompositeDisposable()
    this.menu.add(atom.menu.add([{
      label: MainMenuLabel,
      submenu: [
        {label: 'Prettify', command: 'ide-haskell:prettify-file'},
        {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'}
      ]}]))

    let UPI = require('./upi-0.3')
    this.upi3 = new UPI(this.pluginManager)
  },

  deactivate: function () {
    this.pluginManager.deactivate()
    this.pluginManager = null
    this.upi3.dispose()
    this.upi3 = null

    atom.keymaps.removeBindingsFromSource('ide-haskell')

    // clear commands
    this.disposables.dispose()
    this.disposables = null

    this.menu.dispose()
    this.menu = null
    atom.menu.update()
  },

  serialize: function () {
    if (this.pluginManager) return this.pluginManager.serialize()
  },

  provideUpi: function () {
    this.upiProvided = true
    const UPI = require('./upi')
    return new UPI(this.pluginManager)
  },

  provideUpi3: function () {
    this.upiProvided = true
    return this.upi3
  },

  consumeLinter: function (indieRegistry) {
    let linter = indieRegistry.register({name: 'IDE-Haskell'})
    this.disposables.add(linter)
    this.pluginManager.setLinter(linter)
    return linter
  }
}
