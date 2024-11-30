// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
    mode: "htmlmixed", // Syntax highlighting mode
    theme: "default", // Theme for CodeMirror
    lineNumbers: true, // Show line numbers
    matchBrackets: true, // Highlight matching brackets
    autoCloseTags: true, // Automatically close HTML tags
});

// Selecting elements
const runButton = document.getElementById("run-btn");
const output = document.getElementById("output");

// Add event listener to the "Run" button
runButton.addEventListener("click", () => {
    const code = editor.getValue(); // Get the HTML code from CodeMirror
    output.srcdoc = code; // Set it as the iframe's content
});
