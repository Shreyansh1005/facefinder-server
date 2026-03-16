const express = require("express");
const router = express.Router();
const multer = require("multer");

const cloudinary =
  require("../config/cloudinary");

const { CloudinaryStorage } =
  require("multer-storage-cloudinary");

const Photo = require("../models/Photo");


// ---------- storage ----------

const storage =
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "facefinder",
      allowed_formats: ["jpg","png","jpeg"],
    },
  });

const upload =
  multer({ storage });


// ---------- upload ----------

router.post(
  "/upload",
  upload.single("image"),
  async (req,res)=>{

    try{

      const imageUrl =
        req.file.path;

      const descriptor =
        JSON.parse(
          req.body.descriptor
        );

      const photo =
        await Photo.create({
          imageUrl,
          descriptor
        });

      res.json(photo);

    }catch(err){

      res.status(500).json(err);

    }

  }
);


// ---------- get ----------

router.get(
  "/photos",
  async (req,res)=>{

    const photos =
      await Photo.find();

    res.json(photos);

  }
);

module.exports = router;