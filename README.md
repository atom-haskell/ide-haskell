# IDE-Haskell

Welcome to IDE-Haskell plugin for amazing [Atom](http://atom.io) editor! This
plugin is intended to help you with development in
[Haskell](http://haskell.org).

**NOTE:** You must install all this plugin's dependencies in addition to
installing this plugin.  Jump to the [Requirements section](#requirements) below
and follow all setup instructions.

## Implemented features

#### Haskell project autodetection

IDE-Haskell works only with Haskell projects. When you open a Haskell source file, IDE-Haskell will start automatically.

#### Errors, warnings and linter

After saving the current file the check and linter processes will be executed.
After processes are finished, the results can be seen in output panel. You can
see different kind of results by switching `Errors`, `Warnings` and `Lints` tab
buttons. If you click on message's file name in output panel, Atom will open
this file and put cursor near problem that triggered output message.

Check results can also be seen in left editor gutter (near line numbers) as
icons. If you hover mouse pointer over such an icon, a tooltip will be shown
with problem description. Results are highlighted inside editor as well, so you
can easily determine where the problem is.


![errors](https://cloud.githubusercontent.com/assets/7275622/9705079/52b38f7c-54c1-11e5-9b23-6b932100e876.gif)

#### Get type/info

If you have `haskell-ghc-mod` or similar package installed, you can get type of any expression and get info on any symbol.

There are two options to do so.

First one is to hover mouse pointer over any Haskell source in editor, or any
selection. By default, this will show type for expression/selecton under cursor.
You can change this behavior to show info for symbol, or disable it completely
in IDE-Haskell settings.

Another option is to use keyboard to get type/info under cursor. No default
bindings are specified, but you can specify them in your Atom keymap.

See [Configuration](#configuration) for more information.

![typeinfo](https://cloud.githubusercontent.com/assets/7275622/9705082/52daa81e-54c1-11e5-88a8-99c8029eb14e.gif)

![typeins](https://cloud.githubusercontent.com/assets/7275622/9705080/52cd7e64-54c1-11e5-8ee3-120641da2f85.gif)

#### Autocompletion

Autocompletion facilities have been moved to
[autocomplete-haskell](https://atom.io/packages/autocomplete-haskell) package.

Please install it if you want autocompletion.

#### Code beautify

You can use `stylish-haskell` utility to indent pragmas, imports and data type
definitions. Simply select `Prettify` from Haskel IDE menu to apply
`stylish-haskell` to current file.

![prettify](https://cloud.githubusercontent.com/assets/7275622/9705081/52d97cf0-54c1-11e5-94f0-96f09e43ada3.gif)

#### Build and test project

If you have `ide-haskell-cabal` or similar package installed, you can build,
clean and test your project from ide-haskell (stack and cabal supported)

## Requirements

The `ide-haskell` plugin assumes that you have a minimal Haskell toolchain
installed on your system.  You can install this toolchain by following the
instructions here:

* [Minimal Haskell installers](https://www.haskell.org/downloads#minimal)

Atom plugin dependencies:

Only the `language-haskell` plugin is strictly required, but you will probably
also want to install one of these other plugins as well:

* [`language-haskell`](https://atom.io/packages/language-haskell) - **ABSOLUTELY
  REQUIRED!**
* [`ide-haskell-cabal`](https://atom.io/packages/ide-haskell-cabal) - Use this
  plugin to build and launch Haskell projects
* [`haskell-ghc-mod`](https://atom.io/packages/haskell-ghc-mod) - Use this plugin
  to type-check your code on save and add type highlights on mouseover
* [`autocomplete-haskell`](https://atom.io/packages/autocomplete-haskell) - Use
  this plugin to autocomplete code.  This plugin depends on `haskell-ghc-mod`

Binary dependencies:

* [`stylish-haskell`](https://github.com/jaspervdj/stylish-haskell) - Required by
  `ide-haskell` plugin
* [`ghc-mod` / `ghc-modi`](https://github.com/kazu-yamamoto/ghc-mod) and
  [`hlint`](https://github.com/ndmitchell/hlint) - Required by `haskell-ghc-mod`
  if you choose to install that plugin

### Installing binary dependencies with stack

The most reliable way to build these executable binaries is to use
`stack install`.

Run the following commands from a command line terminal after you finish
installing the minimal Haskell toolchain:

```bash
$ stack install stylish-haskell
...
Copied executables to {STACK_INSTALL_PATH}:
- stylish-haskell
$ stack install ghc-mod
...
Copied executables to {STACK_INSTALL_PATH}:
- ghc-mod
- ghc-modi
$ stack install hlint
...
Copied executables to {STACK_INSTALL_PATH}:
- hlint
```

... where `STACK_INSTALL_PATH` depends on your operating system.  For example,
on OS X or Linux this path will usually be `~/.local/bin/`.

First, make sure that `STACK_INSTALL_PATH` is on your executable search path
(i.e. `$PATH` for OS X and Linux).  However, this alone might not be enough for
Atom to find your installed executables since Atom in
[some cases](https://github.com/atom-community/linter/issues/150) Atom does not
correctly pick up the search path upon launch.

If Atom fails to find a required executable (such as `stylish-haskell`) you will
get an error that reads something like this:

> Ide-haskell could not spawn stylish-haskell
>
> Error: spawn stylish-haskell ENOENT

If this happens, you will need to modify this package's settings to point to the
absolute path to where you installed `stylish-haskell` executable.  For example,
if your `STACK_INSTALL_PATH` were `/home/johndoe/.local/bin/` then the
absolute path to the executable would be
`/home/johndoe/.local/bin/stylish-haskell`.

### Installing binary dependencies with cabal

***NOTE:*** You do not need to do this if you already installed with stack.

Alternatively, you can use cabal-install if you don't want to use stack for some reason.

It is advisable to first create a cabal sandbox for the installation to avoid global package database pollution and conflicts. This will also make updating easy.

To create a sandbox, create a directory, f.ex.

```bash
mkdir $HOME/ghc-mod-sandbox
```

***NOTE:*** Windows command line shell uses different syntax for environment variables, and there is usually no `HOME` defined anyway. I sincerely hope you can figure this out.

Then, `cd` into int:

```bash
cd $HOME/ghc-mod-sandbox
```

And run the following command

```bash
cabal sandbox init --sandbox=.
```

The last `--sandbox=.` part is to simplify paths.

Now you can install ghc-mod and stylish-haskell. *In the same directory* run

```bash
cabal install ghc-mod stylish-haskell
```
*Note:* hlint will be pulled in as ghc-mod dependency.

Now you have ghc-mod and stylish-haskell installed. Binary files are in `$HOME/ghc-mod-sandbox/bin`. You can add this path to PATH, or put full path to **executables** in relevant ide-haskell and haskell-ghc-mod settings.

**Don't forget to replace `$HOME` with actual path to home directory** for the latter option. On Linux, you can run

```bash
echo $HOME/ghc-mod-sandbox/bin/*
```

in the terminal to get actual paths to all executables, if not sure what those should look like. ***NOTE:*** Bear in mind this trick probably won't work on Windows.

For example, assuming your `HOME` is `/home/user`:

* In ide-haskell settings, set 'Stylish Haskell Path' to `/home/user/ghc-mod-sandbox/bin/stylish-haskell`
* In haskell-ghc-mod settings, set 'Ghc Mod Path' to `/home/user/ghc-mod-sandbox/bin/ghc-mod`

## Known conflicts

This package relies on grammar defined by `language-haskell`. Any other Haskell grammar packages (such as `haskell-grammar`) may conflict with it.

## Installation

```
$ apm install language-haskell haskell-ghc-mod ide-haskell-cabal ide-haskell autocomplete-haskell
```

## Configuration

Package is fully configurable via **Edit → Preferences → Packages → ide-haskell
→ Settings**

You will likely need to specify full paths to `stylish-haskell`, if it is not in
your `PATH`, at the very least.

You might also want to look into configuring haskell-ghc-mod ([haskell-ghc-mod README](https://github.com/atom-haskell/haskell-ghc-mod#haskell-ghc-mod-atom-package)) and ide-haskell-cabal ([ide-haskell-cabal README](https://github.com/atom-haskell/ide-haskell-cabal#ide-haskell-cabal-package))

***NOTE***: Since version 1.0.0, some configuration options have been moved to
backends, in particular, haskell-ghc-mod. Migration should be automatic, but
please check if your configuration is correct just in case.

### Keyboard shortcuts

***NOTE***: Since version 1.0.0, most commands are provided by
backends, in particular, haskell-ghc-mod and ide-haskell-cabal. Please revise
your keymap accordingly. Refer to ([haskell-ghc-mod README](https://github.com/atom-haskell/haskell-ghc-mod#haskell-ghc-mod-atom-package)) and ([ide-haskell-cabal README](https://github.com/atom-haskell/ide-haskell-cabal#ide-haskell-cabal-package)) for details

Ide-Haskell comes with little pre-specified keybindings, so you will need to specify your own, if you want those.

You can edit Atom keybindings by opening 'Edit → Open Your Keymap'. Here is a template for all commands, provided by ide-haskell:

```cson
'atom-text-editor[data-grammar~="haskell"]':
  'escape': 'ide-haskell:close-tooltip' #this is set by default
  '':'ide-haskell:prettify-file'
  '':'ide-haskell:next-error'
  '':'ide-haskell:prev-error'

'atom-text-editor[data-grammar~="cabal"]':
  '': 'ide-haskell:prettify-file'

'atom-workspace':
  '': 'ide-haskell:toggle-output'
```

### Changing output panel look

Changing output panel look can be achieved with Atom stylesheets. You can open your stylesheet with Edit → Stylesheet...

Syntax is [Less](http://lesscss.org/). You can use the following selectors:

* `ide-haskell-panel` -- whole panel
* `ide-haskell-panel-heading` -- panel heading (control elements)
* `ide-hashell-panel-items` -- output area
* `ide-haskell-item-position` -- file/line/column of individual message
* `ide-haskell-item-description` -- message itself

Please note, that to change font face in `ide-haskell-item-description`, you need to target it specifically, or use `!important` specifier.

For example, to change font size in whole panel:

```less
ide-haskell-panel {
  font-size: 18pt;
}
```

Or only in output area:

```less
ide-haskell-panel-items {
  font-size: 18pt;
}
```

To change font face in panel heading:

```less
ide-haskell-panel-heading {
  font-family: "Comic Sans MS";
}
```

To change font face in messages themselves:

```less
ide-haskell-item-description {
  font-family: "Fira Mono";
}
```

You are free to write any CSS, of course. Bear in mind, however, that any selectors not listed above are subject to sudden change.

## API

Ide-haskell provides service-hub API with `ide-haskell-upi` service.

More information is available in [lib/upi.coffee][upi] source file

[upi]: https://github.com/atom-haskell/ide-haskell/blob/master/lib/upi.coffee

## TODO

- [x] Cabal project autodetection
- [x] Errors, warnings and linter
- [x] Get type at point
- [x] Autocompletion
- [x] Code beautify
- [x] Cabal project management (with ide-haskell-cabal)
- [x] Jump to definition (since haskell-ghc-mod 1.3.0, or with ide-haskell-hasktags)
- [x] Interactive REPL (alpha, with ide-haskell-repl)
- [x] Stack project management (with ide-haskell-cabal)
- [ ] Who calls and vice versa
- [ ] Documentation support

## Changelog

Changelog is available [here][CHANGELOG].

## IRC Chat

You can join #atom-haskell on FreeNode, and devs can usually be found there. Bear in mind that if someone's on the channel, it doesn't necessarily mean they aren't AFK.

If you're not familiar with IRC, you can use [FreeNode's webchat](https://webchat.freenode.net/?channels=#atom-haskell)

## License

Copyright © 2015 Alexander Chaika, Nikolay Yakimov

Contributors:
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
