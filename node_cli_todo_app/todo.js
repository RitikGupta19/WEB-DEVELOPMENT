const fs = require("fs");

const todoFilePath = `${__dirname}\\todo.txt`;
const doneFilePath = `${__dirname}\\done.txt`;

// MANAGING FILES -> todo.txt and done.txt

// Show Help Menu to users
var showUsage = () => {
  let usage = `
Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics`;

  console.log(usage);
};

// Fetches all todos from 'todo.txt'
var fetchData = (file) => {
  try {
    let todoArray = [];
    // read contents of the file
    const data = fs.readFileSync(file, "UTF-8");

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // add all lines to array
    lines.forEach((line) => {
      if (line !== "") todoArray.push(line);
    });
    return todoArray;
  } catch (err) {
    console.log(err);
  }
};

// Read all pending todos in reverse order
var showTodos = () => {
  try {
    if (!fs.existsSync(todoFilePath)) throw "There are no pending todos!";
    todos = fetchData(todoFilePath);

    if (todos.length === 0) throw "There are no pending todos!";

    for (var i = todos.length - 1; i >= 0; i--)
      console.log(`[${i + 1}] ${todos[i]}`);
  } catch (error) {
    console.log(error);
  }
};

// Read all completed todos from 'done.txt'
var showMarkedTodos = () => {
  try {
    if (!fs.existsSync(doneFilePath)) throw "done.txt does not exists";

    let doneTodos = fetchData(doneFilePath);
    if (doneTodos.length === 0) throw "Empty";

    for (var i = 0; i < doneTodos.length; i++) console.log(doneTodos[i]);
  } catch (error) {
    console.log(error);
  }
};

// Append todo in 'todo.txt'
var addTodo = (args) => {
  try {
    let task = args.join(" ");
    if (task === "") throw "Error: Missing todo string. Nothing added!";
    fs.appendFile(todoFilePath, task + "\r\n", function (err) {
      if (err) {
        throw err;
      }
      console.log(`Added todo: "${task}"`);
    });
  } catch (error) {
    console.log(error);
  }
};

// Modify 'todo.txt' -> after deleting or completing todo
// replace old content with new content in 'todo.txt'
var modifyTodoTxt = (todos) => {
  try {
    var file = fs.createWriteStream(todoFilePath);
    file.on("error", function (err) {
      throw err;
    });

    todos.forEach((todo) => {
      file.write(todo + "\n");
    });
    file.end();
  } catch (error) {
    console.log(error);
  }
};

// Delete a todo from 'todo.txt' and sends to 'done.txt'
var deleteTodo = (args) => {
  try {
    if (args.toString() === "")
      throw "Error: Missing NUMBER for deleting todo.";

    let todoId = Number(args.toString());
    let todos = fetchData(todoFilePath);
    if (todoId <= 0 || todoId > todos.length)
      throw `Error: todo #${todoId} does not exist. Nothing deleted.`;

    todos.splice(todoId - 1, 1);
    modifyTodoTxt(todos);
    console.log(`Deleted todo #${todoId}`);
  } catch (error) {
    console.log(error);
  }
};

// Mark Todo as complete
var markTodo = (args) => {
  try {
    if (args.toString() === "")
      throw "Error: Missing NUMBER for marking todo as done.";

    let todoId = Number(args.toString());
    let todos = fetchData(todoFilePath);
    if (todoId <= 0 || todoId > todos.length)
      throw `Error: todo #${todoId} does not exist.`;

    let markedTodo = todos.splice(todoId - 1, 1);
    modifyTodoTxt(todos);

    let d = new Date();
    let date = d.toISOString().slice(0, 10);

    let done = `x ${date} ${markedTodo}`;
    fs.appendFile(doneFilePath, done + "\r\n", function (err) {
      if (err) {
        throw err;
      }
      console.log(`Marked todo #${todoId} as done.`);
    });
  } catch (error) {
    console.log(error);
  }
};

// Generate a report of completed and pending todos
var showReport = () => {
  try {
    if (!fs.existsSync(todoFilePath)) throw "todo.txt does not exists";
    if (!fs.existsSync(doneFilePath)) throw "done.txt does not exists";

    let d = new Date();
    let date = d.toISOString().slice(0, 10);

    let pending = fetchData(todoFilePath).length;
    let completed = fetchData(doneFilePath).length;

    console.log(`${date} Pending : ${pending} Completed : ${completed}`);
  } catch (error) {
    console.log(error);
  }
};

// READING CLI COMMANDS

const option = process.argv.slice(2, 3).toString();
const args = process.argv.slice(3);

if (option.length === 0) showUsage();

switch (option) {
  case "help":
    showUsage();
    break;
  case "report":
    showReport();
    break;
  case "ls":
    showTodos();
    break;
  case "add":
    addTodo(args);
    break;
  case "done":
    markTodo(args);
    break;
  case "del":
    deleteTodo(args);
    break;
  // EXTRA : shows completed todos, command  -> ""./todo marked"
  case "marked":
    showMarkedTodos();
    break;
  default:
    break;
}
