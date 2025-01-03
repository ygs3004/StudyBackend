const http = require("http");
const WebSocketServer = require("websocket").server;
let connections = [];

const httpServer = http.createServer();
const websocket = new WebSocketServer({"httpServer": httpServer})

httpServer.listen(8080, () => console.log("Server listening on port 8080"));

websocket.on("request", request => {

    const connection = request.accept(null, request.origin);
    connection.on("message", message => {
        connections.forEach(c => c.send(`User ${connection.socket.remotePort} says: ${message.utf8Data}`));
    })

    connections.push(connection);
    connections.forEach(c => c.send(`User${connection.socket.remotePort} just connected.`));
})




// client
// let ws = new WebSocket("ws://localhost:8080");
// ws.onmessage = message => console.log(`Received: ${message.data()}`);
// ws.send("Hello I'm client")