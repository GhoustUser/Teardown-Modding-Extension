import vscode from 'vscode';
import fs from 'fs';


class WebView {

    /** The name / view type identifier. */
    private _name: string;
    /** The default title of the webview panel. */
    private _defaultTitle: string;
    /** The webview panel instance. */
    private _panel: vscode.WebviewPanel | null = null;

    /**
     * @returns {string} The current title of the webview panel.
     */
    public get currentTitle(): string {
        return this._panel ? this._panel.title : this._defaultTitle;
    }
    /**
     * @returns {string} The default title of the webview panel.
     */
    public get defaultTitle(): string {
        return this._defaultTitle;
    }

    /** Event emitter for when the webview is opened. */
    private _onOpenEmitter = new vscode.EventEmitter<void>();
    /** Event emitter for when a message is received from the webview. */
    private _onMessageEmitter = new vscode.EventEmitter<{ type: string, data: any }>();
    /** Event emitter for when the webview is closed. */
    private _onCloseEmitter = new vscode.EventEmitter<void>();

    /** Event for when the webview is opened. */
    public onOpen: vscode.Event<void> = this._onOpenEmitter.event;
    /** Event for when a message is received from the webview. */
    public onMessage: vscode.Event<{ type: string, data: any }> = this._onMessageEmitter.event;
    /** Event for when the webview is closed. */
    public onClose: vscode.Event<void> = this._onCloseEmitter.event;

    /** Creates an instance of WebView.
     * @param {string} name - The name / view type identifier.
     * @param {string} title - The title of the webview panel.
     */
    constructor(name: string, title: string) {
        this._name = name;
        this._defaultTitle = title;
    }

    /** Sets the title of the webview panel.
     * @param {string | null} title - The new title for the webview panel. If null, resets to default title.
     * @returns {void}
     */
    setTitle(title: string | null): void {
        if (this._panel) {
            this._panel.title = title || this._defaultTitle;
        }
    }

    /** Opens the webview as a new panel.
     * @param {vscode.ExtensionContext} context - The extension context.
     * @returns {boolean} True if the panel was created successfully, false otherwise.
     */
    open(context: vscode.ExtensionContext): boolean {
        // if the panel is already open, reveal it
        if (this._panel) {
            this._panel.reveal(vscode.ViewColumn.One);
            return true;
        }
        // create a new webview panel
        this._panel = vscode.window.createWebviewPanel(
            this._name,
            this._defaultTitle,
            vscode.ViewColumn.One,
            { enableScripts: true, retainContextWhenHidden: true } // Retain context to prevent content loss
        );

        // set the HTML content for the webview
        const htmlContent = this.getHtmlForWebview(context);
        this._panel.webview.html = htmlContent || '<h1>Error loading view</h1>';

        // initialize message listener
        this._panel.webview.onDidReceiveMessage((e) => {
            const { type, data } = e;
            // fire the onMessage event
            this._onMessageEmitter.fire({ type, data });
        });

        // initialize close listener
        this._panel.onDidDispose(() => {
            // fire the onClose event
            this._onCloseEmitter.fire();
            // clear the panel reference
            this._panel = null;
        });

        // fire the onOpen event
        this._onOpenEmitter.fire();

        // return success
        return this._panel ? true : false;
    }

    /** Closes the webview panel if it is open.
     * @return {void}
     */
    close(): void {
        // if panel exists, dispose it
        if (this._panel)
            this._panel.dispose();
    }

    /** Reloads the webview content.
     * @param {vscode.ExtensionContext} context - The extension context.
     * @returns {void}
     */
    reload(context: vscode.ExtensionContext): void {
        // if panel exists, close and reopen it
        if (this._panel)
            this.close();
        this.open(context);
    }

    /** Sends a message to the webview.
     * @param {string} type - The type of the message.
     * @param {any} data - The data to send with the message.
     * @returns {boolean} True if the message was sent successfully, false otherwise.
     */

    send(type: string, data: any): boolean {
        if (!this._panel) return false;
        this._panel.webview.postMessage(JSON.stringify({ type: type, data: data }));
        return true;
    }

    /** Generates the HTML content for the webview.
     * @param {vscode.ExtensionContext} context - The extension context.
     * @returns {string|null} The HTML content for the webview, or null if the file cannot be loaded.
     */
    getHtmlForWebview(context: vscode.ExtensionContext): string | null {
        const webviewPath = context.asAbsolutePath(`./ModView/${this._name}`);
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
        } catch (error: any) {
            console.error(`Failed to load HTML content from ${htmlPath}: ${error.message}`);
            return null;
        }
    }

    /** Gets the webview URI for a given file path.
     * @param {string} filePath - The file path to convert.
     * @returns {vscode.Uri} The webview URI for the file.
     */
    getWebviewUri(filePath: string): vscode.Uri {
        if (!this._panel) return vscode.Uri.file(filePath);
        return this._panel.webview.asWebviewUri(vscode.Uri.file(filePath));
    }
}

export default WebView;