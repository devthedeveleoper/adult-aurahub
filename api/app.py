from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, origins=["https://raatrani.netlify.app", "http://localhost:5173"])

STREAMTAPE_LOGIN = os.getenv("STREAMTAPE_LOGIN")
STREAMTAPE_KEY = os.getenv("STREAMTAPE_KEY")

@app.route("/", methods=["GET"])
def Home():
    return "Welcome to the StreamTape API!"

@app.route("/api/files", methods=["GET"])
def list_files():
    folder = request.args.get("folder", "Ti1XN9WKft0")
    url = f"https://api.streamtape.com/file/listfolder?login={STREAMTAPE_LOGIN}&key={STREAMTAPE_KEY}&folder={folder}"
    try:
        r = requests.get(url)
        return jsonify(r.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/thumbnail", methods=["GET"])
def get_thumbnail():
    file_id = request.args.get("file")
    url = f"https://api.streamtape.com/file/getsplash?login={STREAMTAPE_LOGIN}&key={STREAMTAPE_KEY}&file={file_id}"
    try:
        r = requests.get(url)
        return jsonify(r.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
