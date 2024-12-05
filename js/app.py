from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

@app.route("http://127.0.0.1:5500/templates/python_runner.html", methods=["POST"])
def run_code():
    try:
        data = request.json
        code = data.get("code", "").strip()

        if not code:
            logging.error("No code provided in the request.")
            return jsonify({"error": "No code provided"}), 400

        logging.info(f"Executing code: {code}")

        result = subprocess.run(
            ["python3", "-c", code],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=5
        )

        logging.info(f"Execution complete. Output: {result.stdout}, Error: {result.stderr}")
        return jsonify({"output": result.stdout, "error": result.stderr})
    except subprocess.TimeoutExpired:
        logging.error("Execution timed out.")
        return jsonify({"error": "Execution timed out."}), 408
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
