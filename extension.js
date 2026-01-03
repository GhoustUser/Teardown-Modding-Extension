const vscode = require("vscode");
const path = require("path");


/**
 * @fileoverview Extension entry point for the Teardown API Extension.
 * Activates the Teardown API Extension.
 * 
 * Initializes the extension by adding the Lua API path to the workspace library configuration.
 * Retrieves the existing workspace library paths from Lua configuration and appends the extension's
 * lua directory to the library array if it's not already included.
 * 
 * @param {vscode.ExtensionContext} context - The extension context provided by VS Code, containing extension path and other metadata
 * @returns {void}
 */

function activate(context) {
    // Construct the path to the Lua API directory within the extension
    const luaApiPath = path.join(context.extensionPath, "lua");
    // Access the Lua configuration
    const luaConfig = vscode.workspace.getConfiguration("Lua");
    // Get existing library paths
    const existing = luaConfig.get("workspace.library") || [];
    // Add the Lua API path if not already present
    if (!existing.includes(luaApiPath)) {
        luaConfig.update(
            "workspace.library",
            [...existing, luaApiPath],
            vscode.ConfigurationTarget.Workspace
        );
    }

    // check project root for 'info.txt' to determine if it's a Teardown mod
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const fs = require("fs");
        const rootPath = workspaceFolders[0].uri.fsPath;
        const infoTxtPath = path.join(rootPath, "info.txt");
        if (fs.existsSync(infoTxtPath)) {
            console.log("Teardown mod detected in workspace.");
        } else {
            console.log("No Teardown mod detected in workspace.");
        }
    }

    // Call AddGlobals in activate function
    //AddGlobals(config, ["server","client"]);

    console.log("Teardown API Extension activated");
    console.log(context.extensionPath);
}


/**
 * Cleanup function called when the extension is deactivated.
 * @returns {void}
 */
function deactivate() { }

module.exports = {
    activate,
    deactivate
};

/**
 * Adds global variable names to the Lua diagnostics configuration to prevent undefined-global warnings.
 * @param {*} config - VS Code configuration object
 * @param {String[]} globals - Array of global variable names to add
 */
function AddGlobals(config, globals) {
    // Add to globals to prevent undefined-global
    const existingGlobals = config.get("diagnostics.globals") || [];
    globals.forEach(global => {
        if (!existingGlobals.includes(global)) {
            existingGlobals.push(global);
        }
    });
    config.update(
        "diagnostics.globals",
        existingGlobals,
        vscode.ConfigurationTarget.Workspace
    );
}