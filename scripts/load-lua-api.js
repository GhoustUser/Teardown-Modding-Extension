const vscode = require("vscode");
const path = require("path");

/**
 * Checks if the Teardown Lua API is already loaded in the VSCode Lua workspace configuration.
 * @param {vscode.ExtensionContext} context - The extension context provided by VS Code
 * @returns {boolean} True if the Lua API is loaded, false otherwise
 */
function IsScriptingApiLoaded(context) {
    const luaApiPath = path.join(context.extensionPath, "teardown-lua-api");
    const luaConfig = vscode.workspace.getConfiguration("Lua");
    const existing = luaConfig.get("workspace.library") || [];
    return existing.includes(luaApiPath);
}

/**
 * Loads the Teardown Lua API into the VSCode Lua workspace configuration.
 * @param {*} context 
 */
function LoadScriptingApi(context) {
    // Construct the path to the Lua API directory within the extension
    const luaApiPath = path.join(context.extensionPath, "teardown-lua-api");

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

    // Disable Lua duplicate definition warnings
    luaConfig.update(
        "diagnostics.disable",
        ["duplicate-set-field"],
        vscode.ConfigurationTarget.Workspace
    );
}

module.exports = {
    IsScriptingApiLoaded,
    LoadScriptingApi
};