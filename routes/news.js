const router = require("express").Router();
const { main } = require("../latest-news/get-latest-news")

//Get latest news
router.get("/", async (req,res) => {
    main(res)
});


module.exports = router;