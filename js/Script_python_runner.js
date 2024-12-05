document.getElementById('run-btn').addEventListener('click', () => {
    const code = window.codeEditor.getValue(); // Get code from CodeMirror editor

    // Call the Flask backend with the Python code
    fetch('http://127.0.0.1:5500/templates/python_runner.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const outputFrame = document.getElementById('output'); // Target iframe
            const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

            // Write to the iframe (either output or error)
            outputDoc.open();
            if (data.output) {
                outputDoc.write(`<pre>${data.output}</pre>`);
            } else if (data.error) {
                outputDoc.write(`<pre style="color: red;">${data.error}</pre>`);
            } else {
                outputDoc.write("<pre>No output produced.</pre>");
            }
            outputDoc.close();
        })
        .catch((error) => {
            const outputFrame = document.getElementById('output'); // Target iframe
            const outputDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;

            // Show fetch errors in the iframe
            outputDoc.open();
            outputDoc.write(`<pre style="color: red;">Error: ${error.message}</pre>`);
            outputDoc.close();
        });
});
