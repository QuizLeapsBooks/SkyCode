    document.addEventListener("DOMContentLoaded", () => {
        const editor = CodeMirror.fromTextArea(document.getElementById("java-code"), {
            mode: "text/x-java",
            theme: "default",
            lineNumbers: true,
        });

        const compileButton = document.getElementById("compile-button");
        const outputDiv = document.getElementById("output");

        compileButton.addEventListener("click", () => {
            const javaCode = editor.getValue();
            outputDiv.textContent = "Compiling...";

            // Simulate compilation and execution (replace this with server-side execution for real functionality)
            setTimeout(() => {
                outputDiv.textContent = "Execution successful! (Simulated)\n\n" + javaCode;
            }, 1000);
        });
    });
