from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-python', methods=['POST'])
def run_python():
    data = request.get_json()
    code = data.get("code", "")

    try:
        result = subprocess.run(
            ["python3", "-c", code],
            text=True,
            capture_output=True,
            check=True,
        )
        return jsonify({"output": result.stdout})
    except subprocess.CalledProcessError as e:
        return jsonify({"output": e.stderr})

if __name__ == "__main__":
    app.run(debug=True)
