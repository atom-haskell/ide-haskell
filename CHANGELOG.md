## 0.5.7
* Run context menu commands on last mouse position

## 0.5.6
* Tooltip behavior updates (#62):
    - Don't hide tooltip unless new is
      ready, or none is expected
    - Show tooltip at the start of expression,
      and not at mouse position (only when invoked
      by mouse)
    - Set pointer-events:none on atom-overlay
    - Disable fade-in to reduce flicker

## 0.5.5
* Show warning state in outputView on fail to get info/type
* Bump to haskell-ide-backend-0.1.1

## 0.5.4
* Preserve cursor position on prettify (#58)

## 0.5.3
* Make closeTooltipsOnCursorMove matter
* More accurate fix for error on close (#56)

## 0.5.2
* Fix error on file close (#56)

## 0.5.1
* Fix error when hovering mouse over selection

## 0.5.0
* Specify Atom version according to docs
* Migration to haskell-ide-backend service
* Autocompletion delegated to autocomplete-haskell
* Stop backend menu option
* Hotkeys configurable from settings window
* Most commands are bound to haskell grammar editors
* Option to prettify file on save (some problems exist)
* Command to insert type
* Now works on standalone Haskell files!

## 0.4.2
* Allowing text selection in bottom pane (Daniel Beskin)
* Fixing a missing resize cursor on Windows (Daniel Beskin)

## 0.4.1
* Somewhat better error-reporting on ghc-mod errors
* Options descriptions

## 0.4.0
* Fixed main file deprecations
* Fixed #50

## 0.3.6
* Fixed #48

## 0.3.5
* Fixed ghc-mod newline compatibility on Windows (Luka Horvat)

## 0.3.4
* Fixed #44

## 0.3.3
* Fixed #26, #37, #40
* Added a hack, which should hopefully fix #29

## 0.3.2
* Fixed #16
* Fixed #25

## 0.3.1
* Fixed: Upgrade to atom 1.0 api.  Upgrade autocomplete (John Quigley)
* Fixed: Fix issue requiring package to be manually deactivated/reactivated (John Quigley)

## 0.3.0
* New: Code prettify by `stylish-haskell`.

## 0.2.0
* New: Autocompletion feature added (issue #4).
* Fixed: Types and errors tooltips were not showed if `Soft Wrap` was turned on.

## 0.1.2
* Fixed: #3, #8, #9, #10, #11, #13.
* Fixed: After multiple package enable-disable actions multiple `ghc-mod` utilities started in concurrent with the same task.

## 0.1.1
* Fixed: Package disable and uninstall works now.

## 0.1.0
* First release.
