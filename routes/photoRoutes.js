const express = require("express");
const router = express.Router();
const multer = require("multer");
const Photo = require("../models/Photo");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    try {

      let descriptor = [];

      if (req.body.descriptor) {
        descriptor = JSON.parse(req.body.descriptor);
      }

      const photo = new Photo({
        imagePath: req.file.path,
        descriptor: descriptor,
      });

      await photo.save();

      res.json(photo);

    } catch (err) {
      console.log(err);
    }
  }
);
router.get("/photos", async (req, res) => {
  try {

    const photos = await Photo.find();

    res.json(photos);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;