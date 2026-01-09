const vscode = require('vscode');
const fs = require('fs');
const path = require('path');


/** A class to manage the custom webview editor for specific files or views.
 * @class WebView
 * @property {string} name - The name of the view to determine the HTML file to load.
 * @property {string} defaultTitle - The default title of the webview panel.
 * @property {string} viewType - The unique identifier for the webview panel.
 * @property {vscode.WebviewPanel|null} panel - The webview panel instance.
 * @property {function(): string} currentTitle - A function that returns the current title of the webview panel.
 * @property {function(): void} onOpen - A callback function that is called when the webview is opened.
 * @property {function(string, any): void} onMessage - A callback function that is called when a message is received from the webview.
 * @property {function(): void} onClose - A callback function that is called when the webview is closed.
 */
class WebView {
    /** Creates an instance of WebView.
     * @param {string} name - The name of the view to determine the HTML file to load.
     * @param {string} title - The title of the webview panel.
     * @param {string} viewType - The unique identifier for the webview panel.
     */
    constructor(name, title, viewType) {
        this.name = name;
        this.defaultTitle = title;
        this.viewType = viewType;
        this.panel = null;

        this.currentTitle = () => this.panel ? this.panel.title : this.defaultTitle;

        this.onOpen = () => { };
        this.onMessage = (type, data) => { };
        this.onClose = () => { };
    }

    setTitle(title) {
        if (this.panel) {
            this.panel.title = title || this.defaultTitle;
        }
    }

    /** Opens the webview as a new panel.
     * @returns {boolean} True if the panel was created successfully, false otherwise.
     */
    open(context) {
        // if the panel is already open, reveal it
        if (this.panel) {
            this.panel.reveal(vscode.ViewColumn.One);
            return true;
        }
        // create a new webview panel
        this.panel = vscode.window.createWebviewPanel(
            this.viewType,
            this.defaultTitle,
            vscode.ViewColumn.One,
            { enableScripts: true, retainContextWhenHidden: true } // Retain context to prevent content loss
        );

        // set the HTML content for the webview
        const htmlContent = this.getHtmlForWebview(context);
        this.panel.webview.html = htmlContent || '<h1>Error loading view</h1>';

        // initialize message listener
        this.panel.webview.onDidReceiveMessage((e) => {
            const { type, data } = e;
            this.onMessage(type, data);
        });

        // initialize close listener
        this.panel.onDidDispose(() => {
            this.onClose();
            this.panel = null;
        });

        // call the onOpen callback
        this.onOpen();

        return this.panel ? true : false;
    }

    /** Closes the webview panel if it is open.
     * @return {void}
     */
    close() {
        if (this.panel)
            this.panel.dispose();
    }

    /**
     * Reloads the webview content.
     * @param {vscode.ExtensionContext} context - The extension context.
     * @returns {void}
     */
    reload(context) {
        if (this.panel)
            this.close();
        this.open(context);
    }

    /**
     * Sends a message to the webview.
     * @param {string} type - The type of the message.
     * @param {any} data - The data to send with the message.
     * @returns {boolean} True if the message was sent successfully, false otherwise.
     */

    send(type, data) {
        if (!this.panel) return false;
        this.panel.webview.postMessage(JSON.stringify({ type: type, data: data }));
        return true;
    }

    /**
     * Generates the HTML content for the webview.
     * @param {vscode.ExtensionContext} context - The extension context.
     * @returns {string|null} The HTML content for the webview, or null if the file cannot be loaded.
     */
    getHtmlForWebview(context) {
        const webviewPath = context.asAbsolutePath(`./ModView/${this.name}`);
        const webviewUri = this.getWebviewUri(webviewPath);
        const htmlPath = webviewPath + '/index.html';

        try {
            let htmlContent = fs.readFileSync(htmlPath, 'utf8');
            htmlContent = htmlContent.replaceAll(`src="`, `src="${webviewUri}/`);
            htmlContent = htmlContent.replaceAll(`href="`, `href="${webviewUri}/`);
            // for debugging: write the final HTML to a log file
            //fs.writeFileSync(
            //    `C:\\Users\\gusta\\Desktop\\coding\\VSCode-Extensions\\Teardown-Modding\\logs\\webview_output.html`,
            //    htmlContent, 'utf8');

            return htmlContent;
        } catch (error) {
            console.error(`Failed to load HTML content from ${htmlPath}: ${error.message}`);
            return null;
        }
    }

    /**
     * Gets the webview URI for a given file path.
     * @param {string} filePath - The file path to convert.
     * @returns {string} The webview URI for the file.
     */
    getWebviewUri(filePath) {
        if (!this.panel) return null;
        return this.panel.webview.asWebviewUri(vscode.Uri.file(filePath));
    }
}

module.exports = WebView;