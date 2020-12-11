const mongoose = require("mongoose");

const whatsAppSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
});

module.exports = mongoose.model("WhatsAppSchema", whatsAppSchema);
