import {storeMemory} from '/memory.js'

// Confirm renderer.js has been successfully loaded by index.html.
console.log("renderer is running");
function handleUserMessage() {
    // Retrieve the text currently entered by the user.
    let message = document.getElementById('userInput').value;

    // Find the message area and replace its contents with whatever the user typed.
    document.getElementById('messageArea').innerHTML = message;

    // Add user input to memory array
    storeMemory();  

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
setupEventListners();
