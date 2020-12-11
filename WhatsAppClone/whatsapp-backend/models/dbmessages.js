const mongoose = require("mongoose");

const whatsAppSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

module.exports = mongoose.model("WhatsAppSchema", whatsAppSchema);
