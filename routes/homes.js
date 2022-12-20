const router = require("express").Router();
const Homes = require("../models/Homes");
const { getAllHomes } = require("../services/homeService");

//Get all homes
router.get("/", async (req,res) => {
    try {
        const homes = await getAllHomes();
        res.status(200).json(homes);
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router;