const vscode = acquireVsCodeApi();

// Listen for messages from the extension
window.addEventListener('message', (event) => {
    const { type, data } = JSON.parse(event.data);

    switch (type) {
        case 'infoTxt':
            loadModInfo(data);
            break;
        case 'modIconPath':
            document.getElementById('mod-icon').src = data;
            break;
    }
});

// function to parse the content into fields
function loadModInfo(content) {
    const lines = content.split('\n');
    /**
     * Fields object to hold mod info values.
     * @type {{name: string, author: string, description: string, tags: string[], version: number}}
     */
    const fields = {
        name: '',
        author: '',
        description: '',
        tags: [],
        version: 1
    };

    // iterate through each line from info.txt
    lines.forEach(line => {
        // match line with any of the field keys
        for (let key of Object.keys(fields)) {
            // if line has key, parse value accordingly
            if (line.replaceAll(' ', '').startsWith(key + '=')) {
                switch (key) {
                    // parse tags as array
                    case 'tags':
                        fields[key] = line
                            .split('=')[1]
                            .trim()
                            .split(' ')
                            .map(tag => tag.trim());
                        break;
                    // parse version as integer
                    case 'version':
                        fields[key] = parseInt(line.split('=')[1].trim()) || 1;
                        break;
                    // default case: assign string value
                    default:
                        fields[key] = line.split('=')[1].trim();
                        break;
                }
            }
        }
    });

    // set element values to fields
    for (let key of Object.keys(fields)) {
        switch (key) {
            case 'tags':
                document.getElementById('mod-tags').value = fields[key].join(' ');
                break;
            case 'version':
                document.getElementById('mod-version').value = fields[key];
                break;
            default:
                const element = document.getElementById(`mod-${key}`);
                if (element)
                    element.value = fields[key];
                break;
        }
    }

    return fields;
}