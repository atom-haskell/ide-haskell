# IDE-Haskell [![Join the chat at https://gitter.im/atom-haskell/ide-haskell](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/atom-haskell/ide-haskell?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Welcome to IDE-Haskell plugin for amazing [Atom](http://atom.io) editor! This
plugin is intended to help you with development in
[Haskell](http://haskell.org).

## Implemented features

#### Haskell project autodetection

IDE-Haskell works only with Haskell projects. When you open Cabal project in
Atom, or simply open a Haskell source file, IDE-Haskell will start
automatically.

#### Errors, warnings and linter

After saving the current file the check and linter processes will be executed.
After processes are finished the results can be seen in output panel. You can
see different kind of results by switching `Errors`, `Warnings` and `Lints` tab
buttons. If you click on message's file name in output panel, Atom will open
this file and put cursor near problem that triggered output message.

Check results can also be seen in left editor gutter (near line numbers) as
icons. If you hover mouse pointer over such an icon, a tooltip will be shown
with problem description. Results are highlighted inside editor as well, so you
can easily determine where the problem is.

![Errors, warnings and linter](http://atom-haskell.github.io/ide-haskell/images/check.gif)

#### Get type/info

You can get type of any expression and get info on any symbol.

There are two options to do so.

First one is to hover mouse pointer over any Haskell source in editor, or any
selection. By default, this will show type for expression/selecton under cursor.
You can change this behavior to show info for symbol, or disable it completely
in IDE-Haskell settings.

Another option is to use keyboard to get type/info under cursor. No default
bindings are specified, but you can specify them in IDE-Haskell settings.

See [Configuration](#configuration) for more information.

![Get type at point](http://atom-haskell.github.io/ide-haskell/images/types.gif)

#### Autocompletion

Autocompletion facilities have been moved to
[autocomplete-haskell](https://atom.io/packages/autocomplete-haskell) package.

Please install it if you want autocompletion.

#### Code beautify

You can use `stylish-haskell` utility to indent pragmas, imports and data type
definitions. Simply select `Prettify` from Haskel IDE menu to apply
`stylish-haskell` to current file.

![Code beautify](http://atom-haskell.github.io/ide-haskell/images/beautify.gif)

## Requirements

Atom packages:
* [haskell-ghc-mod](https://atom.io/packages/haskell-ghc-mod)
* [language-haskell](https://atom.io/packages/language-haskell)
* [autocomplete-haskell](https://atom.io/packages/autocomplete-haskell) (optional, recommended)

Binaries:
* [stylish-haskell](https://github.com/jaspervdj/stylish-haskell)

## Installation

```
$ apm install language-haskell haskell-ghc-mod ide-haskell autocomplete-haskell
```

## Configuration

Package is fully configurable via **Edit → Preferences → Packages → ide-haskell
→ Settings**

You will likely need to specify full paths to `stylish-haskell`, if it is not in
your `PATH`, at the very least.

You might also want look into configuring haskell-ghc-mod: [haskell-ghc-mod README](https://github.com/atom-haskell/haskell-ghc-mod#haskell-ghc-mod-atom-package)

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

Changelog is available [here][CHANGELOG].

## License

Copyright © 2015 Alexander Chaika, Nikolay Yakimov

Contributors:
* Daniel Beskin
* John Quigley
* Luka Horvat
* Ondřej Janošík

See the [LICENSE.md][LICENSE] for details.

[CHANGELOG]: https://github.com/atom-haskell/ide-haskell/blob/master/CHANGELOG.md
[LICENSE]: https://github.com/atom-haskell/ide-haskell/blob/master/LICENSE.md
