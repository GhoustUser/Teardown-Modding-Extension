const vscode = require('vscode');
const fs = require('fs');
const path = require('path');


/**
 * A class to manage the custom webview editor for specific files or views.
 */
class WebView {
    /**
     * @param {vscode.ExtensionContext} context - The extension context.
     * @param {string} viewName - The name of the view to determine the HTML file to load.
     * @param {function(html: string, filePath: string, fileContent: string): string} htmlProcessor - A function to process the HTML content before displaying.
     */
    constructor(context, viewName, htmlProcessor = (html) => html) {
        this.context = context;
        this.viewName = viewName;
        this.htmlProcessor = htmlProcessor;
    }

    /**
     * Opens the webview as a new panel.
     * @param {string} title - The title of the webview panel.
     * @param {string} viewType - The unique identifier for the webview.
     */
    open(title, viewType) {
        const panel = vscode.window.createWebviewPanel(
            viewType,
            title,
            vscode.ViewColumn.One,
            { enableScripts: true, retainContextWhenHidden: true } // Retain context to prevent content loss
        );

        const htmlContent = this.getHtmlForWebview(panel);
        panel.webview.html = htmlContent || '<h1>Error loading view</h1>';

        const previewImagePath = this.getPreviewImagePath(panel);
        panel.webview.postMessage({ type: 'initialize', previewImagePath });

        // Send the 'update' message after initialization
        const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const infoTxtPath = path.join(rootPath, 'info.txt');
        if (fs.existsSync(infoTxtPath)) {
            const infoTxtContent = fs.readFileSync(infoTxtPath, 'utf8');
            panel.webview.postMessage({
                type: 'update',
                text: infoTxtContent
            });
        }

        panel.webview.onDidReceiveMessage((e) => {
            if (e.type === 'save') {
                this.saveFile(e.filePath, e.content);
            } else if (e.type === 'selectIcon') {
                vscode.window.showOpenDialog({
                    canSelectMany: false,
                    openLabel: 'Select Icon',
                    filters: {
                        Images: ['png', 'jpg', 'jpeg']
                    }
                }).then(fileUri => {
                    if (fileUri && fileUri[0]) {
                        const selectedPath = fileUri[0].fsPath;
                        const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
                        const targetPath = path.join(rootPath, 'preview.jpg');

                        fs.copyFile(selectedPath, targetPath, (err) => {
                            if (err) {
                                vscode.window.showErrorMessage(`Failed to set new icon: ${err.message}`);
                            } else {
                                vscode.window.showInformationMessage('Icon updated successfully!');

                                // Dynamically update the icon in the webview
                                panel.webview.postMessage({
                                    type: 'updateIcon',
                                    previewImagePath: panel.webview.asWebviewUri(vscode.Uri.file(targetPath)).toString()
                                });
                            }
                        });
                    }
                });
            }
        });

        return panel;
    }

    /**
     * Resolves the preview image path.
     * @param {vscode.WebviewPanel} panel - The webview panel.
     * @returns {string} The URI of the preview image or an empty string if not found.
     */
    getPreviewImagePath(panel) {
        const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const previewFiles = ['preview.jpg', 'preview.png'];

        for (const file of previewFiles) {
            const filePath = path.join(rootPath, file);
            if (fs.existsSync(filePath)) {
                return panel.webview.asWebviewUri(vscode.Uri.file(filePath)).toString();
            }
        }
        return '';
    }

    /**
     * Saves content to a file.
     * @param {string} filePath - The path of the file to save.
     * @param {string} content - The content to save to the file.
     */
    saveFile(filePath, content) {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                vscode.window.showErrorMessage(`Failed to save file: ${err.message}`);
            } else {
                vscode.window.showInformationMessage(`File saved: ${filePath}`);
            }
        });
    }

    /**
     * Generates the HTML content for the webview.
     * @param {vscode.WebviewPanel} webviewPanel - The webview panel to display the content.
     * @returns {string|null} The HTML content for the webview, or null if the file cannot be loaded.
     */
    getHtmlForWebview(webviewPanel) {
        const htmlPath = this.context.asAbsolutePath(`./ModView/${this.viewName}/index.html`);
        const cssPath = this.context.asAbsolutePath(`./ModView/${this.viewName}/style.css`);

        try {
            let htmlContent = fs.readFileSync(htmlPath, 'utf8');
            const cssUri = webviewPanel.webview.asWebviewUri(vscode.Uri.file(cssPath));
            const nonce = this.getNonce();

            htmlContent = htmlContent
                .replace('<link rel="stylesheet" href="style.css">', `<link rel="stylesheet" href="${cssUri}">`)
                .replace(/<Nonce>/g, nonce);

            return this.htmlProcessor(htmlContent);
        } catch (error) {
            console.error(`Failed to load HTML content from ${htmlPath}: ${error.message}`);
            return null;
        }
    }

    /**
     * Generates a nonce for securing the webview content.
     * @returns {string} A random nonce string.
     */
    getNonce() {
        return Array.from({ length: 32 }, () =>
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
                Math.floor(Math.random() * 62)
            )
        ).join('');
    }
}

module.exports = WebView;