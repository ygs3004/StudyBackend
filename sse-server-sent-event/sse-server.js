const app = require("express")();

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
})

const port = 8080;

let i = 0;
const send = (res) => {
    res.write("data: " + `hello from server ----[${i++}]\n\n`);
    setTimeout(() => send(res), 1000);
}

app.listen(port, () => console.log(`Listening on ${port}`));

// 브라우져
// const sse = new EventSource("http://localhost:8080/stream");
// sse.onmessage = console.log