const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const {response} = require("express");

const packageDef = protoLoader.loadSync("todo.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure())
client.createTodo(
    {
        "id": -1,
        "text": "새로운 할일 " + new Date().toString()
    },
    (err, response) => {
        console.log(`createTodos: ${JSON.stringify(response)}`);
    }
);

client.readTodos({}, (err, response) => {
    console.log(`readTodos:${JSON.stringify(response)}`);

    response.items.forEach(todo => console.log(todo.text))
})

const call = client.readTodosStream();
call.on("data", item => {
    console.log(`Stream Receive:${JSON.stringify(item)}`)
})

call.on("end", e => console.log("Stream End"));