// Confirm renderer.js has been successfully loaded by index.html.
console.log("renderer is running");
function handleUserMessage() {
    // Retrieve the text currently entered by the user.
    const message = document.getElementById('userInput').value;
    console.log("button clicked");
    console.log("Here is what user submitted: ", message);
}
function setupEventListners() {
    // Find the Send button and listen for click events.
    document.getElementById('sendButton').addEventListener("click", handleUserMessage);
    console.log("setupEventListeners running");
}
// Start listening for user interactions when renderer.js loads (calling setupEventListners function).
setupEventListners();