const fs = require("fs");
const chalk = require("chalk");

const getString = () => {
  return "It is returned.";
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataString = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataString);
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => {
    return note.title === title;
  });
  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note Added!"));
  } else console.log(chalk.red.inverse("Note Title already taken!"));
};

const removeNote = (title) => {
  const notes = loadNotes();
  const afterRemoveNotes = notes.filter((note) => {
    return note.title !== title;
  });
  if (afterRemoveNotes.length !== notes.length) {
    saveNotes(afterRemoveNotes);
    console.log(chalk.green.inverse("Note Removed!"));
  } else console.log(chalk.red.inverse("Note not found!"));
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    console.log(chalk.yellow.inverse("Your NOTES!!"));
    notes.map((note) => {
      console.log("Title: ", note.title);
      console.log("Body: ", note.body);
    });
  } else console.log(chalk.blue.inverse("YEAHH, No task to complete"));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => {
    return note.title === title;
  });
  if (note) {
    console.log(chalk.yellow.inverse("Title: ", note.title));
    console.log("Body: ", note.body);
  } else console.log(chalk.red.inverse("No such Note found"));
};

module.exports = {
  getString,
  addNotes,
  removeNote,
  listNotes,
  readNote,
};
