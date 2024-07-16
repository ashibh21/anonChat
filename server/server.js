const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 3000;
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: http });

app.use(express.static("../client")); 

const connectedClients = [];

const generateClientId = () => {
  return `user${Math.random().toString(36).substr(2, 9)}`;
};

wss.on("connection", (ws) => {
  const clientId = generateClientId();
  console.log(`${clientId} has entered the discussion`);

  connectedClients.push({ clientId, ws });

  ws.on("message", (message) => {
    console.log(`${clientId} sent: ${message}`);

    const data = JSON.stringify({ clientId, message: message.toString() });
    connectedClients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log(`${clientId} has left the discussion`);
    const index = connectedClients.findIndex(
      (client) => client.clientId === clientId
    );
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
});

http.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
