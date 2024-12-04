from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/run", methods=["POST"])
def run_code():
    try:
        data = request.json
        code = data.get("code", "").strip()

        if not code:
            return jsonify({"error": "No code provided"}), 400

        result = subprocess.run(
            ["python3", "-c", code],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=5
        )
        return jsonify({"output": result.stdout, "error": result.stderr})
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out."}), 408
    except Exception as e:
        return jsonify({"error": f"Error: {str(e)}"}), 500

@app.route("/")
def home():
    return "Python Code Runner API is up and running!"

if __name__ == "__main__":
    app.run(debug=True)
