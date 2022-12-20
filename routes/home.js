const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const {
  createHome,
  getHomeById,
  deleteHome,
  updateHome,
} = require("../services/homeService");

//Create home
router.post("/", async (req, res) => {
  const home = {
    name: req.body.name,
    place: req.body.place,
    price: Number(req.body.price),
    size: req.body.size,
    year: req.body.year,
    description: req.body.description,
  };

  const newHome = await createHome(home);
  return res.status(201).json(newHome);
});

//Get home
router.get("/", async (req, res) => {
  const homeId = req.body.home_id;
  if (!isValidObjectId(homeId)) {
    res.status(400).json("Invalid home id!");
    return;
  }

  const home = await getHomeById(req.body.home_id);
  if (!home) {
    res.status(404).send("Home with this id do not exists");
    return;
  }
  res.status(200).json(home);
  return;
});

//Delete home
router.delete("/", async (req, res) => {
  const homeId = req.body.home_id;
  if (!isValidObjectId(homeId)) {
    res.status(400).json("Invalid home id!");
    return;
  }
  try {
    await deleteHome(req.body.home_id);
    res.status(200).json("Home property is delete");
  } catch (err) {
    return res.status(400).json(err);
  }
});

//Update home
router.put("/", async (req, res) => {
  const homeId = req.body.home_id;
  if (!isValidObjectId(homeId)) {
    res.status(400).json("Invalid home id!");
    return;
  }
  const home = {
    name: req.body.name,
    place: req.body.place,
    price: Number(req.body.price),
    time: req.body.time,
    size: req.body.size,
    year: req.body.year,
    description: req.body.description,
  };

  try {
    const currentHome = await updateHome(homeId, home);
    return res.status(200).json(currentHome);
  } catch (err) {
    return res.status(404).json(err);
  }
});

module.exports = router;
