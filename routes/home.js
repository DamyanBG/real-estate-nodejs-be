if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const {
    createHome,
    getHomeById,
    deleteHome,
    updateHome,
    isHomeBelongToOwner,
} = require('../services/homeService');
const { body, validationResult } = require('express-validator');

const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');
const { ROLES_ENUMS } = require('../util/enums');

const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('photo');
const { BlockBlobClient } = require('@azure/storage-blob');
const getStream = require('into-stream');
const { addPhotoName } = require('../services/homeService');

const CONTAINER_NAME = process.env.CONTAINER_NAME;
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

const reqBodyToObject = (req) => ({
    title: req.body.title,
    city: req.body.city,
    neighborhood: req.body.neighborhood,
    address: req.body.address,
    price: req.body.price,
    size: req.body.size,
    year: req.body.year,
    description: req.body.description,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    owner_id: req.body.owner_id,
});
//Get home
router.get('/:home_id', async (req, res) => {
    const homeId = req.params.home_id;

    if (!isValidObjectId(homeId)) {
        res.status(400).json('Invalid home id!');
        return;
    }

    const homeInfo = await getHomeById(homeId);

    if (!homeInfo) {
        res.status(404).send('Home with this id do not exists');
        return;
    }

    const blobStorageUrl = process.env.AZURE_FILES_STORAGE_ACCOUNT_URL;
    const CONTAINER_NAME = process.env.CONTAINER_NAME;

    const homeResponse = {
        photo_url: `${blobStorageUrl}/${CONTAINER_NAME}/${homeInfo._id}/${homeInfo.photo_name}`,
        ...homeInfo,
    };

    res.status(200).json(homeResponse);
    return;
});

//Verify token in every request
router.use(verifyToken);

//Create home
router.post(
    '/',
    uploadStrategy,
    body('title')
        .isLength({ min: 3 })
        .withMessage('Property title must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Property title must be less 100 charaters long'),
    body('city')
        .isLength({ min: 3 })
        .withMessage('City must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('City must be less 100 charaters long'),
    body('neighborhood')
        .isLength({ min: 3 })
        .withMessage('Neighborhood must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Neighborhood must be less 100 charaters long'),
    body('address')
        .isLength({ min: 3 })
        .withMessage('Address must be at least 3 charaters long')
        .isLength({ max: 255 })
        .withMessage('Address must be less 255 charaters long'),
    body('description')
        .isLength({ min: 5 })
        .withMessage(`Description must be at least 5 character long`)
        .isLength({ max: 255 })
        .withMessage(`Description must less 255 character long`),
    verifyRole([ROLES_ENUMS.Admin, ROLES_ENUMS.Seller]),
    async (req, res) => {
        const home = reqBodyToObject(req);

        if (!isValidObjectId(home.owner_id)) {
            res.status(400).json('Invalid owner!');
            return;
        }

        const { errors } = validationResult(req);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }

        const newHome = await createHome(home);

        if (req.file) {
            const fileName = req.file.originalname;
            const blobName = `${newHome._id}/${fileName}`;

            const blobService = new BlockBlobClient(
                AZURE_STORAGE_CONNECTION_STRING,
                CONTAINER_NAME,
                blobName
            );
            const stream = getStream(req.file.buffer);
            const streamLength = req.file.buffer.length;

            const handleError = () => {
                console.log('Error uploading photo!');
            };

            const handleSucess = async () => {
                await addPhotoName(newHome._id, fileName);
            };

            await blobService
                .uploadStream(stream, streamLength)
                .then(async () => {
                    console.log('success');
                    await handleSucess();
                    return;
                })
                .catch((err) => {
                    console.log('error');
                    if (err) {
                        console.log(err);
                        handleError();
                        return;
                    }
                });
        }

        return res.status(201).json(newHome);
    }
);

//Delete home
router.delete('/', verifyRole([ROLES_ENUMS.Admin, ROLES_ENUMS.Seller]), async (req, res) => {
    const homeId = req.body.home_id;
    if (!isValidObjectId(homeId)) {
        res.status(400).json('Invalid home id!');
        return;
    }

    if (!(await getHomeById(homeId))) {
        res.status(400).json('Home not found!');
        return;
    }
    if (!(await isHomeBelongToOwner(homeId, req.auth_id)) && req.auth_role !== ROLES_ENUMS.Admin) {
        res.status(403).json('You do not have permission to delete this home!');
        return;
    }

    await deleteHome(homeId);
    res.status(200).json('Home has been deleted');
});

//Update home
router.put(
    '/',
    body('title')
        .isLength({ min: 3 })
        .withMessage('Property title must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Property title must be less 100 charaters long'),
    body('city')
        .isLength({ min: 3 })
        .withMessage('City must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('City must be less 100 charaters long'),
    body('neighborhood')
        .isLength({ min: 3 })
        .withMessage('Neighborhood must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Neighborhood must be less 100 charaters long'),
    body('address')
        .isLength({ min: 3 })
        .withMessage('Address must be at least 3 charaters long')
        .isLength({ max: 255 })
        .withMessage('Address must be less 255 charaters long'),
    body('description')
        .isLength({ min: 5 })
        .withMessage(`Description must be at least 5 character long`)
        .isLength({ max: 255 })
        .withMessage(`Description must less 255 character long`),
    verifyRole([ROLES_ENUMS.Admin, ROLES_ENUMS.Seller]),
    async (req, res) => {
        const homeId = req.body.home_id;
        if (!isValidObjectId(homeId)) {
            res.status(400).json('Invalid home id!');
            return;
        }
        const home = reqBodyToObject(req);
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }

        if (
            !(await isHomeBelongToOwner(homeId, req.auth_id)) &&
            req.auth_role !== ROLES_ENUMS.Admin
        ) {
            res.status(403).json('You do not have permission to delete this home!');
            return;
        }

        const currentHome = await updateHome(homeId, home);
        return res.status(200).json(currentHome);
    }
);

module.exports = router;
