import os
import json  
import anthropic
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("ANTHROPIC_API_KEY")
MODEL = os.getenv("CLAUDE_MODEL")

# Confirms which character to load: the file name comes from .env
CHARACTER_FILE = os.getenv("CHARACTER_FILE", "max.json")

# Builds the path from this file's folder, so it works no matter where Flask is run from
CHARACTER_PATH = os.path.join(os.path.dirname(__file__), "characters", CHARACTER_FILE)

# Opens the JSON file and turn it into a Python dict
with open(CHARACTER_PATH, encoding="utf-8") as f:
    character = json.load(f)

# System_prompt is a description of the character and how it will speak from /characters folder
SYSTEM_PROMPT = "\n\n".join(character["system_prompt"])

client = anthropic.Anthropic(api_key=API_KEY)
print("Key loaded:", API_KEY is not None, "| Model:", MODEL, "| Character:", character["name"])

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend running"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data["message"]

    response = client.messages.create(
        model=MODEL,
        max_tokens=300,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": message}]
    )
    reply = "".join(block.text for block in response.content if block.type == "text")
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, port=5000)