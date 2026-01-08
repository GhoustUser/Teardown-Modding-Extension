const vscode = acquireVsCodeApi();



// handle the save button click
document.getElementById('saveButton').addEventListener('click', () => {
    const fields = {
        name: document.getElementById('mod-title').value,
        description: document.getElementById('mod-description').value,
        tags: document.getElementById('tags_field').value,
        version: document.getElementById('version_field').value
    };

    const saveString = mergeContent(fields);

    vscode.postMessage({
        type: 'edit',
        text: saveString
    });
});

// function to merge fields into content
function mergeContent(fields) {
    let content = '';
    if (fields.name) content += `name = ${fields.name}\n`;
    if (fields.description) content += `description = ${fields.description}\n`;
    if (fields.tags) content += `tags = ${fields.tags}\n`;
    if (fields.version) content += `version = ${fields.version}\n`;
    return content.trim();
}

// handle mod icon click to refresh icon
document.getElementById('mod-icon').addEventListener('click', () => {
    vscode.postMessage({ type: 'refreshIcon' });
});