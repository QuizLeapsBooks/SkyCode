document.addEventListener("DOMContentLoaded", () => {
    const codeEditor = CodeMirror.fromTextArea(document.getElementById("python-code"), {
        mode: "python",
        theme: "default",
        lineNumbers: true,
    });

    const runButton = document.getElementById("run-btn");
    const outputFrame = document.getElementById("output");

    runButton.addEventListener("click", () => {
        const pythonCode = codeEditor.getValue();
        fetch("/run-python", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: pythonCode }),
        })
        .then(response => response.json())
        .then(data => {
            outputFrame.srcdoc = `<pre>${data.output}</pre>`;
        })
        .catch(error => {
            console.error("Error:", error);
            outputFrame.srcdoc = `<pre>Error running the code!</pre>`;
        });
    });
});
