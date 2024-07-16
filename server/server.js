const exp = require("constants");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 3000;
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: http });

app.use(express.static("../client"));

const connectedClient = [];

wss.on("connection", (ws) => {
  console.log("New client");
  connectedClient.push(ws);
  ws.on("message", (message) => {
    console.log("Received: " + message);
    connectedClient.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

http.listen(PORT, () => {
  console.log("App running");
});
