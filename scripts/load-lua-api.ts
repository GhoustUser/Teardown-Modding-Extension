import vscode from "vscode";
import path from "path";
import VscManager from "./classes/vsc-manager";

/** Checks if the Teardown Lua API is already loaded in the VSCode Lua workspace configuration.
 * @param {VscManager} vscm - The VscManager instance
 * @returns {boolean} True if the Lua API is loaded, false otherwise
 */
function IsScriptingApiLoaded(vscm: VscManager): boolean {
    return vscm.getSetting("Lua.workspace.library", []).includes(
        path.join(vscm.context.extensionPath, "teardown-lua-api")
    );
}

/**
 * Loads the Teardown Lua API into the VSCode Lua workspace configuration.
 * @param {VscManager} vscm - The VscManager instance
 */
function LoadScriptingApi(vscm: VscManager) {
    // if already loaded, do nothing
    if (IsScriptingApiLoaded(vscm))
        return;

    // Construct the path to the Lua API directory within the extension
    const luaApiPath = path.join(vscm.context.extensionPath, "teardown-lua-api");
    
    // Get the Lua library configuration for the workspace
    const workspaceLibrary = vscm.getSetting("Lua.workspace.library", []);

    // check if the Lua API path is already included
    if (workspaceLibrary.includes(luaApiPath)) 
        return;

    // check for and remove any old paths that might exist (for older versions of the extension)
    const filteredLibrary = workspaceLibrary.filter((libPath: string) => {
        return !libPath.endsWith("teardown-lua-api");
    });

    // Add the Lua API path to the workspace library array
    vscm.updateSetting(
        "Lua.workspace.library",
        [...filteredLibrary, luaApiPath],
    );

    console.log("Teardown Lua API loaded into workspace.");
}

module.exports = {
    IsScriptingApiLoaded,
    LoadScriptingApi
};