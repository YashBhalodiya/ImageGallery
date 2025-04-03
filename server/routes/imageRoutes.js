const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "image-gallery",
        format: async () => "png",
        public_id: (req, file) => file.originalname.split(".")[0],
    }
});

const upload = multer({storage});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const {title, tags} = req.body;
        const imageUrl = req.file.path;
        const newImage = new Image({title, imageUrl, tags: tags.split(",")});
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get("/", async (req, res) => {
    try {
        const tagFilter = req.query.tag;
        const query = tagFilter ? { tags : tagFilter} : {};
        const images = await Image.find(query).sort({createdAt: -1});
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;