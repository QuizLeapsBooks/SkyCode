const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve the static files

// C++ Code Compilation and Execution Endpoint
app.post('/run-cpp', (req, res) => {
    const code = req.body.code;

    // Save code to a file (e.g., temp.cpp)
    const fs = require('fs');
    const fileName = 'temp.cpp';
    fs.writeFileSync(fileName, code);

    // Compile the C++ code using g++
    exec(`g++ ${fileName} -o temp.out`, (compileError, stdout, stderr) => {
        if (compileError) {
            res.json({ error: `Compilation Error: ${stderr}` });
            return;
        }

        // Run the compiled C++ program
        exec('./temp.out', (runError, runStdout, runStderr) => {
            if (runError) {
                res.json({ error: `Runtime Error: ${runStderr}` });
                return;
            }

            // Send back the output
            res.json({ output: runStdout });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
