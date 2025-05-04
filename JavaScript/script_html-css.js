document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const htmlEditor = document.getElementById("html-code");
    const cssEditor = document.getElementById("css-code");
    const jsEditor = document.getElementById("js-code");
    const outputFrame = document.getElementById("output");

    // Tab switching logic
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            htmlEditor.classList.add("hidden");
            cssEditor.classList.add("hidden");
            jsEditor.classList.add("hidden");
            outputFrame.classList.add("hidden");

            const tabType = tab.dataset.tab;
            if (tabType === "html") {
                htmlEditor.classList.remove("hidden");
            } else if (tabType === "css") {
                cssEditor.classList.remove("hidden");
            } else if (tabType === "js") {
                jsEditor.classList.remove("hidden");
            } else if (tabType === "output") {
                outputFrame.classList.remove("hidden");
                const htmlContent = htmlEditor.value;
                const cssContent = `<style>${cssEditor.value}</style>`;
                const jsContent = `<script>${jsEditor.value}</script>`;
                outputFrame.srcdoc = cssContent + htmlContent + jsContent;
            }
        });
    });

    // Run button logic
    document.getElementById("run-btn").addEventListener("click", () => {
        const htmlContent = htmlEditor.value;
        const cssContent = `<style>${cssEditor.value}</style>`;
        const jsContent = `<script>${jsEditor.value}</script>`;
        outputFrame.srcdoc = cssContent + htmlContent + jsContent;
    });

    // Function to parse example code into HTML and CSS
    function parseExampleCode(code) {
        const htmlMatch = code.match(/^(?![\s\S]*\.[\s\S]*\{[\s\S]*\})[\s\S]*?(?=\n\n|$)/m);
        const cssMatch = code.match(/\.[\s\S]*\{[\s\S]*\}/m);
        
        const htmlCode = htmlMatch ? htmlMatch[0].trim() : "";
        const cssCode = cssMatch ? cssMatch[0].trim() : "";
        
        return { htmlCode, cssCode };
    }

    // Handle all "Try It Yourself" buttons
    document.querySelectorAll(".try-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const codeBlock = btn.previousElementSibling.querySelector("code");
            const code = codeBlock.innerText;

            // Clear editors
            htmlEditor.value = "";
            cssEditor.value = "";
            jsEditor.value = "";

            // Parse and load code
            const { htmlCode, cssCode } = parseExampleCode(code);
            
            if (htmlCode) {
                htmlEditor.value = htmlCode;
            }
            if (cssCode) {
                cssEditor.value = cssCode;
            }

            // Auto-run output
            const htmlContent = htmlEditor.value;
            const cssContent = `<style>${cssEditor.value}</style>`;
            const jsContent = `<script>${jsEditor.value}</script>`;
            outputFrame.srcdoc = cssContent + htmlContent + jsContent;
        });
    });
});