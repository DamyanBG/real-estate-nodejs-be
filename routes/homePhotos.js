import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express from 'express';
const router = express.Router();
import multer from 'multer';
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('photo');
import { BlockBlobClient } from '@azure/storage-blob';
import getStream from 'into-stream';

const CONTAINER_NAME = process.env.CONTAINER_NAME;
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

console.log(CONTAINER_NAME);

router.post('/', uploadStrategy, (req, res) => {
    const fileName = req.file.originalname;
    const homeId = req.body.home_id;
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
        res.status(201).json('OK');
    };

    blobService
        .uploadStream(stream, streamLength)
        .then(() => {
            console.log('success');
            handleSucess();
            return;
        })
        .catch((err) => {
            console.log('error');
            if (err) {
                console.log(err);
                handleError(err);
                return;
            }
        });
});

export default router;
