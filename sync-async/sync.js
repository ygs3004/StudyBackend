const fs = require("fs");

console.log("before sync");
const res = fs.readFileSync("test.txt");

console.log("file: " + res);
console.log("after sync")