const router = require('express').Router();
const { getAllLands } = require('../services/landService');

//Get all lands
router.get('/', async (req, res) => {
    const lands = await getAllLands();
    res.status(200).json(lands);
});

module.exports = router;
