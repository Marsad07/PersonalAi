from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend running"

@app.route("/chat", methods=["POST"])                   # only accepts POST requests
def chat():
    data = request.get_json()                           # reads the JSON Electron sends: {"message": "Hello"}
    message = data["message"]                           # pulls out the message text
    return jsonify({"reply": f"You said: {message}"})   # sends JSON back

if __name__ == "__main__":
    app.run(debug=True, port=5000)