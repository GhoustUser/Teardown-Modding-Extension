// import necessary modules
const path = require("path");
const fs = require("fs");


/**
 * The type of mod currently opened
 * @type {"unknown"|"content"|"global"|"character"}
 */
let modType = "unknown";

/**
 * Entry function for loading info about the currently opened mod.
 * @param {vscode.ExtensionContext} context - The extension context provided by VS Code
 * @param {string} rootPath - The root path of the currently opened mod
 * @returns {void}
 */
function LoadModData(context, rootPath) {
    // determine mod type based on presence of specific files
    if (fs.existsSync(path.join(rootPath, "main.xml"))) {
        // content mod
        modType = "content";
        require("./mod-types/content.js").LoadContentModData(rootPath, context);
    } else if (fs.existsSync(path.join(rootPath, "main.lua"))) {
        // global mod
        modType = "global";
        require("./mod-types/global.js").LoadGlobalModData(rootPath, context);
    } else if (fs.existsSync(path.join(rootPath, "characters.txt"))) {
        // character mod
        modType = "character";
    } else {
        modType = "unknown";
    }
    console.log(`Detected mod type: ${modType}`);
}

module.exports = {
    LoadModData,
    modType
};