const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const serverUrl = `${protocol}://${window.location.host}`;
const socket = new WebSocket(serverUrl);

socket.onopen = (event) => {
  console.log("Connected to WebSocket server");
};

socket.onerror = (err) => {
  console.error("WebSocket error:", err);
};

socket.onmessage = function (event) {
  const text = JSON.parse(event.data);
  const chatBox = document.getElementById("chat-box");
  const newMsg = document.createElement("div");
  newMsg.textContent = `${text.clientId}: ${text.message}`;
  chatBox.appendChild(newMsg);
};

const sendMessage = () => {
  const input = document.getElementById("input");
  const message = input.value.trim();
  if (message) {
    socket.send(message);
    input.value = "";
  }
};

const button = document.getElementById("send");
button.addEventListener("click", sendMessage);

const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
