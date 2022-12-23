const router = require("express").Router();
const { main } = require("../email-service/send-email")

//Check if the email service works
router.get("/", async (req,res) => {
    main()
    return res.status(200).json("works")
});


module.exports = router;