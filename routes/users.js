const router = require("express").Router();
const User = require("../models/User");

//Get all users
router.get("/", async (req,res) => {
    return res.status(200).json("works")
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router;