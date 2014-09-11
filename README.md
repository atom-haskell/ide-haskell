# Haskell IDE

Welcome to Haskell IDE plugin for amazing [Atom](http://atom.io) editor! This plugin is intended to help you in [Haskell](http://haskell.org) developing.

*Haskell IDE is currently in active development state.*

## Implemented features

#### Cabal project autodetection

Haskell IDE works only with cabal projects. You can simply start [Atom](http://atom.io) from cabal project root or drag and drop cabal project folder on editor and plugin will be started automatically.

#### Errors, warnings and linter

After saving the current file the check and linter processes will be executed. After processes are finished the results can be seen in plugin output panel. You can see different kind of results by switching `Errors`, `Warnings` and `Lints` tab buttons. By pressing with mouse button on any result inside output panel the Atom editor will open the appropriate file with cursor already at the position of this result.

Also all the results can be seen near the line numbers if you position the mouse cursor over the handsome icon. And of course the results are highlighted inside editor view so you can easily locate where the problem is.

<!-- ![Errors, warnings and linter](https://github.com/chaika2013/ide-haskell/raw/master/img/check.png) -->

#### Get type at point

Just position your mouse cursor above expression you want to know the type of and wait for some time. Tooltip will appear with everything you want to know.

<!-- ![Get type at point](https://github.com/chaika2013/ide-haskell/raw/master/img/check.png) -->

#### Autocompletion

Remember that you need [autocomplete-plus](https://atom.io/packages/autocomplete-plus) package to be installed to use Haskell IDE autocompletion feature.

<!-- ![Autocompletion](https://github.com/chaika2013/ide-haskell/raw/master/img/check.png) -->

## Requirements

* [ghc-mod](https://github.com/kazu-yamamoto/ghc-mod)
* [autocomplete-plus](https://atom.io/packages/autocomplete-plus)

## Installation

    $ apm install ide-haskell

## Configuration

Open `~/.atom/config.cson` by clicking **Open Your Config** in **Atom** menu. Manually add `ide-haskell` plugin section as in example below.

    'ide-haskell':
      'ghcModPath': '/path/to/ghc-mod'

Following entries are also customizable in `ide-haskell` section

- `ghcModPath` - path to `ghc-mod` utility
- `checkOnFileSave` - check file after save (defaut is `true`)
- `lintOnFileSave` - lint file after save  (defaut is `true`)
- `switchTabOnCheck` - switch to error tab after file check finished (defaut is `true`)
- `expressionTypeInterval` - after this period of time the process of getting the expression type will be started (milliseconds, default is `300`)

## TODO

- [x] Cabal project autodetection
- [x] Errors, warnings and linter
- [x] Get type at point
- [x] Autocompletion
- [ ] Jump to definition
- [ ] Who calls and vice versa
- [ ] Interactive REPL
- [ ] Cabal project management
- [ ] Code beautify
- [ ] Documentation support

## Changelog

Changelog is available [here](https://github.com/chaika2013/ide-haskell/blob/master/CHANGELOG.md).

## License

Copyright (c) 2014 Alexander Chaika

See the [LICENSE.md](https://github.com/chaika2013/ide-haskell/blob/master/LICENSE.md) for details.
