// Initialize CodeMirror for C++ code editing
const editor = CodeMirror.fromTextArea(document.getElementById('cpp-code'), {
    mode: 'text/x-c++src',
    lineNumbers: true,
    theme: 'default'
});

// Run Button Event Listener
document.getElementById('run-btn').addEventListener('click', () => {
    const cppCode = editor.getValue(); // Get the code from the editor

    // Call API to run C++ code
    fetch('/run-cpp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: cppCode })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = data.output || data.error;
    })
    .catch(error => {
        document.getElementById('output').textContent = 'Error: ' + error.message;
    });
});
