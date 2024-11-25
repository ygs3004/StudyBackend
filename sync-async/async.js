const fs = require("fs");

console.log("before async");
fs.readFile("test.txt", (err, data) => console.log(data.toString()));
console.log("after async")