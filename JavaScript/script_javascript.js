
const editor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
    mode: "javascript",
    lineNumbers: true, 
    theme: "default", 
});

(function () {
    const originalConsoleLog = console.log; 
    const outputElement = document.getElementById("output");

    console.log = function (...args) {

        args.forEach(arg => {
            outputElement.textContent += arg + "\n";
        });
        originalConsoleLog.apply(console, args);
    };
})();


document.getElementById("run-button").addEventListener("click", () => {
    const userCode = editor.getValue(); 
    const outputElement = document.getElementById("output");

  
    outputElement.textContent = "";

    try {
        const result = eval(userCode); 

        if (result !== undefined) {
            outputElement.textContent += result;
        }
    } catch (error) {

        outputElement.textContent = `Error: ${error.message}`;
    }
});
