const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const { body, validationResult } = require('express-validator');
const { createLand, getLandById, deleteLand, updateLand } = require('../services/landService');

const reqBodyToObject = (req) => ({
    name: req.body.name,
    place: req.body.place,
    price: req.body.price,
    size: req.body.size,
    description: req.body.description,
    owner: req.body.owner,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
});

router.post(
    '/',
    body('name')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Name must be less 100 charaters long'),
    body('place')
        .isLength({ min: 3 })
        .withMessage('Place name must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Place name must be less 12 charaters long'),
    body('price').isNumeric().withMessage('Price have to be number'),
    body('size').isLength({ min: 1 }).withMessage('Please, provide size!'),
    body('description')
        .isLength({ min: 5 })
        .withMessage(`Description must be at least 5 character long`)
        .isLength({ max: 150 })
        .withMessage(`Description must less 150 character long`),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const landInfo = reqBodyToObject(req);

        if (landInfo.owner) {
            if (!isValidObjectId(landInfo.owner)) {
                res.status(400).json('Invalid owner id!');
                return;
            }
        }

        const newLand = await createLand(landInfo);
        return res.status(201).json(newLand);
    }
);

router.get('/:land_id', async (req, res) => {
    const landId = req.params.land_id;
    if (!isValidObjectId(landId)) {
        res.status(400).json('Invalid land id!');
        return;
    }

    const land = await getLandById(landId);
    if (!land) {
        res.status(404).send('Land with this id do not exists');
        return;
    }
    res.status(200).json(land);
    return;
});

router.delete('/', async (req, res) => {
    const landId = req.body.land_id;
    if (!isValidObjectId(landId)) {
        res.status(400).json('Invalid land id!');
        return;
    }
    try {
        await deleteLand(landId);
        res.status(200).json('Land has been deleted');
    } catch (err) {
        return res.status(400).json(err);
    }
});

router.put(
    '/',
    body('name')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Name must be less 100 charaters long'),
    body('place')
        .isLength({ min: 3 })
        .withMessage('Place name must be at least 3 charaters long')
        .isLength({ max: 100 })
        .withMessage('Place name must be less 12 charaters long'),
    body('price').isNumeric().withMessage('Price have to be number'),
    body('size').isLength({ min: 1 }).withMessage('Please, provide size!'),
    body('description')
        .isLength({ min: 5 })
        .withMessage(`Description must be at least 5 character long`)
        .isLength({ max: 150 })
        .withMessage(`Description must less 150 character long`),
    async (req, res) => {
        const landId = req.body.land_id;
        if (!isValidObjectId(landId)) {
            res.status(400).json('Invalid land id!');
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const landInfo = reqBodyToObject(req);

        if (!isValidObjectId(landInfo.owner)) {
            res.status(400).json('Invalid owner id!');
            return;
        }

        const newLand = await updateLand(landId, landInfo);
        return res.status(200).json(newLand);
    }
);

module.exports = router;
