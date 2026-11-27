import { storeMemory } from './memory.js';

const BACKEND_URL = "http://127.0.0.1:5000"; // Flask server address (change here when deployed)

// Confirm renderer.js has been successfully loaded by index.html.
console.log("renderer is running");

// Adds one message to the bottom of the chat area.
// textContent so typed HTML/scripts are shown as text, not run.
function addMessage(text) {
    const p = document.createElement("p");
    p.textContent = text;
    document.getElementById("messageArea").appendChild(p);
}

async function handleUserMessage() {
    // Retrieve the text currently entered by the user.
    const message = document.getElementById('userInput').value;

    // Show the user message in the chat and add it to memory.
    addMessage(message);
    storeMemory(message);

    // Clears input box after send
    document.getElementById('userInput').value = "";

    // Send it to Flask, wait for the reply, then show the reply in the chat.
    const reply = await sendToBackend(message);
    addMessage(reply);

    // Debugging: confirm the event fired and what was sent/received.
    console.log("button clicked");
    console.log("User submitted:", message, "| Backend replied:", reply);
}

function setupEventListeners() {
    // Find the Send button and listen for click events.
    document.getElementById('sendButton').addEventListener("click", handleUserMessage);

    // Confirm the listener has been attached successfully.
    console.log("setupEventListeners running");
}

// Sends a message to the Flask backend and returns the reply
async function sendToBackend(message) { // async because any function using "await" must be marked async
    const response = await fetch(`${BACKEND_URL}/chat`, { // where it's sending to
        method: "POST", // POST because the /chat route only accepts POST

        // Headers = labels about the request (key: value)
        // Content-Type says what format the body is in -> JSON
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }) // the data, as JSON text
    });
    const data = await response.json(); // turns the JSON reply into a JS object
    return data.reply;
}

setupEventListeners();