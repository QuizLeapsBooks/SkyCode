document.getElementById("run-btn").addEventListener("click", () => {
    const code = editor.getValue();

    fetch("http://127.0.0.1:5000/run", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
    })
        .then((response) => response.json())
        .then((data) => {
            const iframe = document.getElementById("output");
            iframe.contentDocument.body.innerText = data.output || data.error;
        })
        .catch((error) => console.error("Error:", error));
});

document.addEventListener("keydown", function (event) {
    // Check if the user presses Ctrl + Enter
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault(); // Prevent default browser action if any
        document.getElementById("run-btn").click(); // Trigger the Run button
    }
});
