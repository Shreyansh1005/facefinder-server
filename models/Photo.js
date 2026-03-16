const mongoose =
  require("mongoose");

const PhotoSchema =
  new mongoose.Schema({

    imageUrl: String,
    descriptor: [Number]

  });

module.exports =
  mongoose.model(
    "Photo",
    PhotoSchema
  );