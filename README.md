# IDE-Haskell

Welcome to IDE-Haskell plugin for amazing [Atom](http://atom.io) editor! This
plugin is intended to help you with development in
[Haskell](http://haskell.org).

**NOTE:** You must install dependencies in addition to
installing the package itself. Refer to documentation site https://atom-haskell.github.io/ for setup and usage instructions.

## IRC Chat

You can join #atom-haskell on FreeNode, and devs can usually be found there. Bear in mind that if someone's on the channel, it doesn't necessarily mean they aren't AFK.

If you're not familiar with IRC, you can use [FreeNode's webchat](https://webchat.freenode.net/?channels=#atom-haskell)

## Features

Here is a brief and incomplete overview. Visit https://atom-haskell.github.io/ for more details.

#### Errors, warnings and linter

![errors](https://cloud.githubusercontent.com/assets/7275622/9705079/52b38f7c-54c1-11e5-9b23-6b932100e876.gif)

#### Get type/info

![typeinfo](https://cloud.githubusercontent.com/assets/7275622/9705082/52daa81e-54c1-11e5-88a8-99c8029eb14e.gif)

#### Insert type

![typeins](https://cloud.githubusercontent.com/assets/7275622/9705080/52cd7e64-54c1-11e5-8ee3-120641da2f85.gif)

#### Code prettify/format

![prettify](https://cloud.githubusercontent.com/assets/7275622/9705081/52d97cf0-54c1-11e5-94f0-96f09e43ada3.gif)

#### Build and test project

If you have `ide-haskell-cabal` or similar package installed, you can build,
clean and test your project from ide-haskell (stack and cabal supported)

#### Autocompletion

![autocompletion](https://cloud.githubusercontent.com/assets/7275622/9704861/e4474ec4-54bc-11e5-92f4-84a3995e45cb.gif)

## API

Ide-haskell provides service-hub API with `ide-haskell-upi` service.

More information is available in [lib/upi.coffee][upi] source file

[upi]: https://github.com/atom-haskell/ide-haskell/blob/master/lib/upi.coffee

## TODO

- [x] Cabal project autodetection (via language-haskell)
- [x] Errors, warnings and linter (via haskell-ghc-mod)
- [x] Get type at point (via haskell-ghc-mod)
- [x] Autocompletion (via haskell-ghc-mod and autocomplete-haskell)
- [x] Code beautify
- [x] Cabal project management (with ide-haskell-cabal)
- [x] Jump to definition (since haskell-ghc-mod 1.3.0, or with ide-haskell-hasktags)
- [x] Interactive REPL (alpha, with ide-haskell-repl)
- [x] Stack project management (with ide-haskell-cabal)
- [ ] Who calls and vice versa
- [ ] Documentation support

## Changelog

Changelog is available [here][CHANGELOG].

## License

Copyright © 2015 Atom-Haskell

Contributors:
* Nikolay Yakimov
* Alexander Chaika
* John Quigley
* Ondřej Janošík
* Luka Horvat
* Gabriel Gonzalez
* Daniel Beskin
* Gabor Greif
* Daniel Gröber

See the [LICENSE.md][LICENSE] for details.

[CHANGELOG]: https://github.com/atom-haskell/ide-haskell/blob/master/CHANGELOG.md
[LICENSE]: https://github.com/atom-haskell/ide-haskell/blob/master/LICENSE.md
