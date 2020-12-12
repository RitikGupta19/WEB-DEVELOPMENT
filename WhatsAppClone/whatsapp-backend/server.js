const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const WhatsAppSchema = require("./models/dbmessages");
const Pusher = require("pusher");

const app = express();
app.use(express.json());

const port = process.env.PORT || 9000;

// Connections and Configurations
const mongodbUrl = process.env.MONGO_URL;

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
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: proces.env.PUSHER_CLUSTER,
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
