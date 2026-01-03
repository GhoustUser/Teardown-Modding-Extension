const vscode = require("vscode");
const path = require("path");
const fs = require("fs");


const { workspaceFolders } = vscode.workspace;
const rootPath = workspaceFolders[0].uri.fsPath;

let modData = {
    name: "unknown",
    author: "unknown",
    description: "unknown",
    tags: [],
    version: -1,
}

/**
 * Entry point for the extension.
 * 
 * Initializes the extension by adding the Lua API path to the workspace library configuration.
 * Retrieves the existing workspace library paths from Lua configuration and appends the extension's
 * lua directory to the library array if it's not already included.
 * 
 * @param {vscode.ExtensionContext} context - The extension context provided by VS Code, containing extension path and other metadata
 * @returns {void}
 */

function activate(context) {

    // check project root for 'info.txt' to determine if it's a Teardown mod
    if (workspaceFolders) {
        const rootPath = workspaceFolders[0].uri.fsPath;
        const infoTxtPath = path.join(rootPath, "info.txt");
        // if info.txt exists, it's a teardown mod
        if (fs.existsSync(infoTxtPath)) {
            LoadModData();
            LoadScriptingApi(context);
            PrintModData();
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

function LoadModData() {
    const infoTxt = fs.readFileSync(path.join(rootPath, "info.txt"), "utf-8");
    const lines = infoTxt.split("\n");
    lines.forEach(line => {
        const [key, value] = line.split("=");
        if (key && value) {
            // check if key already exists in modData
            if (modData[key.trim()] !== undefined) {
                // assign the value to the modData object, trimming whitespace
                modData[key.trim()] =
                    key.trim() === "author" ?
                        value :
                        value.trim();
            }
        }
    });
}

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
}

function PrintModData() {
    // set color based on number of trailing spaces in modData.author
    const trailingSpaces = modData.author.length - modData.author.trimEnd().length;
    // create color console escape code [0-9]
    const colorCode = 30 + Math.min(trailingSpaces, 7);
    console.log(`Mod Name: ${modData.name}`);
    console.log(`Author: \x1b[${colorCode}m${modData.author}\x1b[0m`);
    console.log(`Description: ${modData.description}`);
    console.log(`Version: ${modData.version}`);
}