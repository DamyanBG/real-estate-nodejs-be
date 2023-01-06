if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const router = require('express').Router();
const { getAllHomes } = require('../services/homeService');

//Get all homes
router.get('/', async (req, res) => {
    const homeResponse = [];
    const homes = await getAllHomes();
    for (const home of homes) {
        const homeInfo = home._doc;
        const blobStorageUrl = process.env.AZURE_FILES_STORAGE_ACCOUNT_URL;
        const CONTAINER_NAME = process.env.CONTAINER_NAME;

        homeResponse.push({
            photo_url: `${blobStorageUrl}/${CONTAINER_NAME}/${homeInfo._id}/${homeInfo.photo_name}`,
            ...homeInfo,
        });
    }
    res.status(200).json(homeResponse);
});

module.exports = router;
