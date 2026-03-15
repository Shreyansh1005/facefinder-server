const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  imagePath: String,
  descriptor: [Number],
});

module.exports = mongoose.model("Photo", photoSchema);