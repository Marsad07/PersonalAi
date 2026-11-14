console.log("renderer is running");
function handleUserMessage() {
    const message = document.getElementById('userInput').value;
    console.log("button clicked");

    console.log("Here is what user submitted: ", message);
}

function setupEventListners() {
    document.getElementById('sendButton').addEventListener("click", handleUserMessage);
    console.log("setupEventListeners running");
}


setupEventListners();
