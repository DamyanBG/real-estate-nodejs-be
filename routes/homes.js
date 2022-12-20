const router = require("express").Router();
const { getAllHomes } = require("../services/homeService");

//Get all homes
router.get("/", async (req, res) => {
  const homes = await getAllHomes();
  res.status(200).json(homes);
});

module.exports = router;
