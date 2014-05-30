# Haskell IDE

Welcome to Haskell IDE plugin for amazing [Atom](http://atom.io) editor! This plugin is intended to help you in [Haskell](http://haskell.org) developing.

*Haskell IDE is currently in active development state.*

## Features

#### Cabal project autodetection

Haskell IDE works only with cabal projects. You can simply start [Atom](http://atom.io) from cabal project root or drag and drop cabal project folder on editor and plugin will be started automatically.

#### Check for errors and warnings

#### Source code linter

#### Get type at point

## Requirements

* [ghc-mod](http://www.mew.org/~kazu/proj/ghc-mod/en/)

## Installation

    $ apm install ide-haskell

## Configuration

Open `~/.atom/config.scon` by clicking **Open Your Config** in **Atom** menu. The plugin main section is `ide-haskell`.

* `ghcModPath` - path to `ghc-mod` utility
* `checkOnFileSave` - check file after save (defaut is `true`)
* `lintOnFileSave` - lint file after save  (defaut is `true`)
* `switchTabOnCheck` - switch to error tab after file check finished (defaut is `true`)

## TODO

* Jump to definition
* Who calls and vice versa
* Autocompletion
* Interactive REPL
* Cabal project management
* Code beautify
* Documentation support

## Changelog

Changelog is available [here](https://github.com/chaika2013/ide-haskell/blob/master/CHANGELOG.md).

## License

Copyright (c) 2014 Alexander Chaika

See the [LICENSE.md](https://github.com/chaika2013/ide-haskell/blob/master/LICENSE.md) for details.
