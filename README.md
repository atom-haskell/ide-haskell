# Haskell IDE

[![Join the chat at https://gitter.im/atom-haskell/ide-haskell](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/atom-haskell/ide-haskell?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Welcome to Haskell IDE plugin for amazing [Atom](http://atom.io) editor! This plugin is intended to help you in [Haskell](http://haskell.org) developing.

*Haskell IDE is currently in active development state.*

## Implemented features

#### Cabal project autodetection

Haskell IDE works only with cabal projects. You can simply start [Atom](http://atom.io) from cabal project root or drag and drop cabal project folder on editor and plugin will be started automatically.

#### Errors, warnings and linter

After saving the current file the check and linter processes will be executed. After processes are finished the results can be seen in plugin output panel. You can see different kind of results by switching `Errors`, `Warnings` and `Lints` tab buttons. By pressing with mouse button on any result inside output panel the Atom editor will open the appropriate file with cursor already at the position of this result.

Also all the results can be seen near the line numbers if you position the mouse cursor over the handsome icon. And of course the results are highlighted inside editor view so you can easily locate where the problem is.

![Errors, warnings and linter](http://atom-haskell.github.io/ide-haskell/images/check.gif)

#### Get type at point

Just position your mouse cursor above expression you want to know the type of and wait for some time. Tooltip will appear with everything you want to know.

![Get type at point](http://atom-haskell.github.io/ide-haskell/images/types.gif)

#### Autocompletion

Remember that you need [autocomplete-plus](https://atom.io/packages/autocomplete-plus) package to be installed to use Haskell IDE autocompletion feature.

Autocompletion feature works for pragmas like `LANGUAGE` and `OPTIONS_GHC`. Also autocompletion works for `import` keyword.

![Autocompletion](http://atom-haskell.github.io/ide-haskell/images/complete1.gif)

And of course autocompletion feature works inside functions to make your Haskelling happier.

![Autocompletion](http://atom-haskell.github.io/ide-haskell/images/complete2.gif)

*Not all the things I wanted from this feature was implemented. That is why autocompletion is subject to change the way you want! So you are welcome with suggestions how this feature can be changed to make your work with Haskell code more comfortable. Pelease, write issues with enhancement of autocompletion [here](https://github.com/atom-haskell/ide-haskell/issues).*

#### Code beautify

Now you can use `stylish-haskell` utility to indent pragmas, imports and data type definitions. Simply select `Prettify` from Haskel IDE menu or press magic combination of buttons to apply `stylish-haskell` to current file.

![Code beautify](http://atom-haskell.github.io/ide-haskell/images/beautify.gif)

## Requirements

* [ghc-mod](https://github.com/kazu-yamamoto/ghc-mod)
* [stylish-haskell](https://github.com/jaspervdj/stylish-haskell)
* [autocomplete-plus](https://atom.io/packages/autocomplete-plus)
* [language-haskell](https://atom.io/packages/language-haskell)

## Installation

    $ apm install ide-haskell

## Configuration

Package is fully configurable via **Edit → Preferences → Packages → ide-haskell
→ Settings**

You will likely need to specify full paths to `ghc-mod` and `stylish-haskell`, if those are not in `PATH`, at the very least.

## TODO

- [x] Cabal project autodetection
- [x] Errors, warnings and linter
- [x] Get type at point
- [x] Autocompletion
- [x] Code beautify
- [ ] Jump to definition
- [ ] Who calls and vice versa
- [ ] Interactive REPL
- [ ] Cabal project management
- [ ] Documentation support

## Changelog

Changelog is available [here](https://github.com/atom-haskell/ide-haskell/blob/master/CHANGELOG.md).

## License

Copyright © 2015 Alexander Chaika

Contributors:
* Daniel Beskin
* John Quigley
* Luka Horvat
* Nikolay Yakimov

See the [LICENSE.md](https://github.com/atom-haskell/ide-haskell/blob/master/LICENSE.md) for details.
