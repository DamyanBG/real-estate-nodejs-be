const router = require("express").Router();

//Check if the app works
router.get("/", async (req,res) => {
    return res.status(200).json("works")
});


module.exports = router;