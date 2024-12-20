// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
    mode: "javascript", // Syntax highlighting for JavaScript
    lineNumbers: true,  // Show line numbers
    theme: "default",   // Default theme, can be changed
});

// Redirect console.log to display output in the UI
(function () {
    const originalConsoleLog = console.log; // Save the original console.log
    const outputElement = document.getElementById("output");

    console.log = function (...args) {
        // Display log messages in the output container
        args.forEach(arg => {
            outputElement.textContent += arg + "\n";
        });
        originalConsoleLog.apply(console, args); // Call the original console.log
    };
})();

// Add event listener to the Run button
document.getElementById("run-button").addEventListener("click", () => {
    const userCode = editor.getValue(); // Get the code from CodeMirror
    const outputElement = document.getElementById("output");

    // Clear the previous output
    outputElement.textContent = "";

    try {
        const result = eval(userCode); // Run the user's JavaScript code

        // Display the result if it's not undefined
        if (result !== undefined) {
            outputElement.textContent += result;
        }
    } catch (error) {
        // Show any error that occurs during code execution
        outputElement.textContent = `Error: ${error.message}`;
    }
});
