if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const router = express.Router();
const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("photo");
const { BlockBlobClient } = require("@azure/storage-blob");
const getStream = require("into-stream");
const { addPhotoName } = require("../services/homeService")

const CONTAINER_NAME = process.env.CONTAINER_NAME;
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
  
router.post("/", uploadStrategy, (req, res) => {
  const fileName = req.file.originalname
  const homeId = req.body.home_id

  if (!fileName || !homeId) return res.status(400).json("Bad Request!")

  const blobName = `${homeId}/${fileName}`;
  
  const blobService = new BlockBlobClient(
    AZURE_STORAGE_CONNECTION_STRING,
    CONTAINER_NAME,
    blobName
  );
  const stream = getStream(req.file.buffer);
  const streamLength = req.file.buffer.length;

  const handleError = (err) => {
    res.status(502).json(err);
  };

  const handleSucess = () => {
    addPhotoName(homeId, fileName)
    res.status(201).json("OK");
  };

  blobService
    .uploadStream(stream, streamLength)
    .then(() => {
      console.log("success");
      handleSucess();
      return;
    })
    .catch((err) => {
      console.log("error");
      if (err) {
        console.log(err);
        handleError(err);
        return;
      }
    });
});

module.exports = router;
