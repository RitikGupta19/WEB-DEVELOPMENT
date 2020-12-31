const fs = require("fs");
const chalk = require("chalk");
const getString = require("./notes");
const yargs = require("yargs");

// Registering a new command in yargs
// Adding command
yargs.command({
  command: "add",
  describe: "Add a new note!",
  handler: function () {
    console.log("I added a new command");
  },
});

// Removing command
yargs.command({
  command: "remove",
  describe: "Remove a new note!",
  handler: function () {
    console.log("I removed a new command");
  },
});

// Listing command
yargs.command({
  command: "list",
  describe: "Listing notes!",
  handler: function () {
    console.log("I Listed notes");
  },
});

// Reading command
yargs.command({
  command: "read",
  describe: "Read notes!",
  handler: function () {
    console.log("I read some new notes");
  },
});

console.log(yargs.argv);

// fs.writeFileSync(
//   "notes.txt",
//   "This file is created by nodejs!!, developer -> Ritik Gupta"
// );

// fs.appendFileSync("notes.txt", " This text is appended using nodejs");

// const str = getString();
// console.log(str);
// console.log(chalk.bold.red("Hello world!"));
