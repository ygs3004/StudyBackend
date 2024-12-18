const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("todo.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(),() => console.log("bind"));
server.addService(todoPackage.Todo.service,{
    "createTodo": createTodo,
    "readTodos": readTodos,
    "readTodosStream": readTodosStream
});

//  @deprecate(
//     'Calling start() is no longer necessary. It can be safely omitted.'
// )
// server.start();

const todos = [];

function createTodo(call, callback) {
    const todoItem = {
        id: todos.length + 1,
        text: call.request.text
    }
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodosStream(call, callback) {
    todos.forEach(t => call.write(t));
    setTimeout(() => {
        call.end();
    }, 1000);
}

function readTodos(call, callback) {
    callback(null, {
        items: todos
    });
}
