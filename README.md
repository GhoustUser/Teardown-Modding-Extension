# Teardown Lua API

A Visual Studio Code extension for Teardown modding. Includes type definitions for the [Teardown scripting API](https://teardowngame.com/experimental/api.html), and a custom interface for getting an overview of your mod and managing settings.

### Note:
This is my first VS Code extension and public coding project, so any help, advice or feedback is appreciated.

## What it does

- Adds intellisense for the Teardown Lua scripting api (must be toggled on for each workspace).
- Adds a custom interface that shows your mod info, lets you edit it, and lets you change some workspace-specific settings.
- The extension only turns on when it finds an `info.txt` file in the root folder, the only requirement for a Teardown mod.

## Installation

I will try to get this on the VSCode extension marketplace for easier installing, but for now you can install it using the included `.vsix` file.
> Open the **extensions** tab, then click on the three dots in the top right `⋯`, then select **`Install from VSIX...`**

You can of course modify and package it yourself too.

## Usage

With the extension enabled, open a project with an open folder containing an `info.txt` file, and the extension will automatically activate. You'll get a popup with a button to open the Mod View, which can also be opened at any time from the command palette: 
> `Ctrl + Shift + p` > `Open Teardown Mod View`

This opens a custom interface where you can view and change info about your mod, as well as change some settings.
I'm planning on adding more info for a better overview, like whether it's a global or content mod, a list of any included player characters, and more.

## Settings:
- **`Open Mod View by default`** : Whether or not the mod view should open whenever you open the project.
- **`Enable Teardown Lua API`** : Enables or disables the Teardown scripting API intellisense for this project.

Will probably add more settings at some point, feel free to leave suggestions.

## How it works

The extension adds `.meta.lua` files into the Lua Language Server's workspace library, enabling intellisense for Teardown's scripting API. This does not add, modify or remove any files from your project, it just tells VS Code that the type definitions are part of the workspace.

The custom interface is implemented as a VS Code webview.

The Lua type definitions are located in files under `teardown-scripting-api/*.meta.lua`, with one file for each category.

## Links
- [Teardown Game](https://teardowngame.com) - The game this is for
- [Teardown API (Experimental)](https://teardowngame.com/experimental/api.html) - docs for the scripting API

See `TODO.md` for planned changes and additions.