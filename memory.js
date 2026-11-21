// Array to store the memory
const chatMemory = new Array();

function storeMemory(message) {
    console.log("storeMemory is running mate");
    chatMemory.push(message);
    console.log(chatMemory);
}

export { storeMemory };