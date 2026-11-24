import { storeMemory } from './memory.js';
const BACKEND_URL = "http://127.0.0.1:5000";

// Confirm renderer.js has been successfully loaded by index.html.
console.log("renderer is running");
function handleUserMessage() {
    // Retrieve the text currently entered by the user.
    let message = document.getElementById('userInput').value;

    // Find the message area and replace its contents with whatever the user typed.
    document.getElementById('messageArea').innerHTML = message;

    // Add user input to memory array
    storeMemory(message);

    // Debugging messages to confirm the event fired and the user's message was successfully retrieved.
    console.log("button clicked");
    console.log("Here is what user submitted: ", message);
}

function setupEventListners() {
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

sendToBackend("Hello there").then(console.log); 
setupEventListners();
