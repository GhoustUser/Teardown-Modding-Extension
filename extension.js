const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const { LoadModData } = require("./scripts/load-mod-data.js");
const CustomEditor = require('./CustomEditors/CustomEditor');


const { workspaceFolders } = vscode.workspace;

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
    console.log("Activating Teardown API Extension...");
    // check project root for 'info.txt' to determine if it's a Teardown mod
    if (!workspaceFolders) {
        console.log("No workspace folders found.");
        return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const infoTxtPath = path.join(rootPath, "info.txt");
    // if info.txt doesn't exist, exit early
    if (!fs.existsSync(infoTxtPath)) {
        console.log("No Teardown mod detected in workspace.");
        return;
    }

    LoadModData(context, rootPath);
    console.log("Teardown API Extension activated");

    // register custom editor for info.txt files
    const customEditor = new CustomEditor(
        context,
        "info.txt",
        (html, filePath, fileContent) => html
            .replace(/<FileContent>/g, fileContent)
            .replace(/<FilePath>/g, filePath)
    ).register('customInfoEditor');
    console.log("registered custom info.txt editor");
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