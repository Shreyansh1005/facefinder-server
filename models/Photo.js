const mongoose =
  require("mongoose");

const PhotoSchema =
  new mongoose.Schema({

    imageUrl: String,
    descriptor: {
      type: [Number],
      default: []
    }

  });

module.exports =
  mongoose.model(
    "Photo",
    PhotoSchema
  );