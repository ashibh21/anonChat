const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const serverUrl = `${protocol}://${window.location.host}`;
const socket = new WebSocket(serverUrl);

socket.onopen = (event) => {
  console.log("connected to ws server");
  console.log("hi");
};

socket.onerror = (err) => {
  console.log(err);
};
socket.onmessage = async function (event) {
  console.log(event);
  const text = await event.data.text();
  const chatBox = document.getElementById("chat-box");
  const newmsg = document.createElement("div");
  newmsg.textContent = text;
  chatBox.appendChild(newmsg);
};

const button = document.getElementById("send");
button.addEventListener("click", () => {
  const input = document.getElementById("input");
  const message = input.value.trim();
  if (message) {
    socket.send(message);
    input.value = "";
  }
});
