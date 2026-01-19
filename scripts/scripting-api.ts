import path from "path";
import VscManager from "./vsc-manager";

/** Checks if the Teardown Lua API is enabled in the VSCode Lua workspace configuration.
 * @param {VscManager} vscManager - The VscManager instance
 * @returns {boolean} True if the Lua API is loaded, false otherwise
 */
function isScriptingApiEnabled(vscManager: VscManager): boolean {
    const luaApiPath = path.join(vscManager.context.extensionPath, "teardown-scripting-api");
    const workspaceLibrary = vscManager.getSetting("Lua.workspace.library", []);
    return workspaceLibrary.includes(luaApiPath);
}

/** Enables or disables the Teardown Lua API in the VSCode Lua workspace configuration.
 * @param {boolean} enable - Whether to enable or disable the scripting API
 * @param {VscManager} vscManager - The VscManager instance
 * @returns {void}
 */
function enableScriptingApi(enable: boolean, vscManager: VscManager): void {
    if (isScriptingApiEnabled(vscManager) === enable) {
        return;
    }

    const luaApiPath = path.join(vscManager.context.extensionPath, "teardown-scripting-api");
    const workspaceLibrary = vscManager.getSetting("Lua.workspace.library", []);

    // add the new path and update setting
    const updatedLibrary = enable ?
        // add path if enabling
        [...workspaceLibrary, luaApiPath] :
        // remove path if disabling
        workspaceLibrary.filter((libPath: string) => !libPath.endsWith("teardown-scripting-api")
        );
    // if updatedLibrary is empty, remove the setting completely
    if (updatedLibrary.length === 0)
        vscManager.updateSetting("Lua.workspace.library", undefined);
    // otherwise update the setting normally
    else
        vscManager.updateSetting("Lua.workspace.library", updatedLibrary);

    // if enabling, disable duplicate-set-field diagnostic
    const diagnostics = vscManager.getSetting("Lua.diagnostics.disable", []);
    if (enable && !diagnostics.includes("duplicate-set-field")) {
        vscManager.updateSetting("Lua.diagnostics.disable", [...diagnostics, "duplicate-set-field"]);
    }
    // if disabling, re-enable duplicate-set-field diagnostic
    else if (!enable) {
        const filteredDiagnostics = diagnostics.filter((diagnostic: string) =>
            diagnostic !== "duplicate-set-field"
        );
        // if filteredDiagnostics is empty, remove the setting completely
        if (filteredDiagnostics.length === 0)
            vscManager.updateSetting("Lua.diagnostics.disable", undefined);
        // otherwise update the setting normally
        else
            vscManager.updateSetting("Lua.diagnostics.disable", filteredDiagnostics);
    }
}

export { isScriptingApiEnabled, enableScriptingApi };