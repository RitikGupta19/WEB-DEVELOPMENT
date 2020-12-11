const express = require("express");
const mongoose = require("mongoose");

const mongodbUrl =
  "mongodb+srv://admin:admin>@whatsappclone.ympqy.mongodb.net/whatsappdb>?retryWrites=true&w=majority";

mongoose.connect(mongodbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

const port = process.env.PORT || 9000;

app.get("/", (rep, res) => res.status(200).send("Hello world"));

app.listen(port, () => console.log(`Listening to port ${port}`));
