const express = require("express");
const mongoose = require("mongoose");
const WhatsAppSchema = require("./models/dbmessages");
const Pusher = require("pusher");

const app = express();
app.use(express.json());

const port = process.env.PORT || 9000;

// Connections and Configurations
const mongodbUrl =
  "mongodb+srv://admin:admin@whatsappclone.ympqy.mongodb.net/WhatsappClone?retryWrites=true&w=majority";

mongoose.connect(mongodbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// initialised mongoose connection
const db = mongoose.connection;

// once the connections is opened, then will console
db.once("open", () => {
  console.log("DB CONNECTED");

  const messageCollectionToBeChecked = db.collection("whatsappschemas");
  const changeStream = messageCollectionToBeChecked.watch();

  // applying change handler when change occurs
  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("Error Triggering Pusher");
    }
  });
});

const pusher = new Pusher({
  appId: "1121846",
  key: "48df40e2181cc2294e52",
  secret: "7f15fb934f39ad1f379f",
  cluster: "ap2",
  useTLS: true,
});

// Routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.get("/messages/sync", (req, res) => {
  WhatsAppSchema.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const message = req.body;
  WhatsAppSchema.create(message, (err, data) => {
    if (err) {
      res.status(500).send("##########", err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`Listening to port ${port}`));
