let ws = new WebSocket("ws://localhost:8080");
ws.onmessage = message => console.log(`${message.data}`);

ws.send("hello")