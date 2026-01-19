import vscode from "vscode";
import path from "path";
import fs from "fs";

import WebView from "../../scripts/web-view";
import VscManager from "../../scripts/vsc-manager";
import { isScriptingApiEnabled, enableScriptingApi} from "../../scripts/scripting-api";

function initializeModViewMain(modview: WebView, vscManager: VscManager): void {
    modview.onOpen(() => {
        // read and send info.txt content to webview
        const infoTxtPath = path.join(vscManager.projectPath, "info.txt");
        if (fs.existsSync(infoTxtPath)) {
            const infoTxtContent = fs.readFileSync(infoTxtPath, "utf8");
            modview.send("infoTxt", infoTxtContent);
        }

        // send mod icon path if it exists (try .png first, then .jpg)
        const iconExtensions = ["png", "jpg", "jpeg"];
        let iconFound = false;
        for (const iconExtension of iconExtensions) {
            const modIconPath = path.join(vscManager.projectPath, `preview.${iconExtension}`);
            if (fs.existsSync(modIconPath)) {
                const modIconUri = modview.getWebviewUri(modIconPath);
                modview.send("modIconPath", modIconUri.toString());
                iconFound = true;
                break;
            }
        }

        // send workspace settings to webview
        const settings = {
            openByDefault: vscManager.getSetting("teardownModding.openModViewByDefault", false),
            enableScriptingApi: isScriptingApiEnabled(vscManager)
        };
        modview.send("workspaceSettings", settings);
    });

    modview.onMessage(({ type, data }) => {
        switch (type) {
            case "reload":
                modview.reload(vscManager.context);
                modview.setTitle(modview.defaultTitle);
                break;

            case "unsavedChanges":
                const title = data ? `${modview.defaultTitle} (unsaved)` : modview.defaultTitle;
                modview.setTitle(title);
                break;

            case "saveModInfo":
                const infoTxtPath = path.join(vscManager.projectPath, "info.txt");
                fs.writeFileSync(infoTxtPath, data, "utf8");
                vscode.window.showInformationMessage("Mod info saved successfully.");
                modview.setTitle(modview.defaultTitle);
                break;

            default:
                console.warn(`\x1b[93mUnhandled message type: \x1b[35m${type}\x1b[93m with data: \x1b[96m${data}\x1b[0m`);
                break;
        }
    });

    modview.onClose(() => {
        
    });
}

export default initializeModViewMain;