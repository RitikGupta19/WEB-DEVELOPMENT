const fs = require("fs");
const chalk = require("chalk");
const notes = require("./notes");
const yargs = require("yargs");

// Registering a new command in yargs
// Adding command
yargs.command({
  command: "add",
  describe: "Add a new note!",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

// Removing command
yargs.command({
  command: "remove",
  describe: "Remove a new note!",
  builder: {
    title: {
      describe: "Title to be removed",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

// Listing command
yargs.command({
  command: "list",
  describe: "Listing notes!",
  handler: function () {
    notes.listNotes();
  },
});

// Reading command
yargs.command({
  command: "read",
  describe: "Read notes!",
  builder: {
    title: {
      describe: "Read a single note.",
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

// yargs parses the argument according to our commands config
yargs.parse();
