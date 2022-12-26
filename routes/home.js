const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const {
  createHome,
  getHomeById,
  deleteHome,
  updateHome,
} = require("../services/homeService");
const { body, validationResult } = require("express-validator");

//Create home
router.post(
  "/",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Property name must be at least 3 charaters long")
    .isLength({ max: 100 })
    .withMessage("Property name must be less 10 charaters long"),
  body("place")
    .isLength({ min: 3 })
    .withMessage("Place name must be at least 3 charaters long")
    .isLength({ max: 100 })
    .withMessage("Place name must be less 12 charaters long"),
  body("description")
    .isLength({ min: 5 })
    .withMessage(`Description must be at least 5 character long`)
    .isLength({ max: 100 })
    .withMessage(`Description must less 50 character long`),
  async (req, res) => {
    const home = {
      name: req.body.name,
      place: req.body.place,
      price: Number(req.body.price),
      size: req.body.size,
      year: req.body.year,
      description: req.body.description,
    };

    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw errors;
      }

      const newHome = await createHome(home);
      return res.status(201).json(newHome);
    } catch (err) {
      console.error(err.message);
      console.log(err)
      res.status(400).json({ error: err });
    }
  }
);

//Get home
router.get("/", async (req, res) => {
  const homeId = req.params.home_id;
  if (!isValidObjectId(homeId)) {
    res.status(400).json("Invalid home id!");
    return;
  }

  const home = await getHomeById(homeId);
  
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
router.put(
  "/",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Property name must be at least 3 charaters long")
    .isLength({ max: 10 })
    .withMessage("Property name must be less 10 charaters long"),
  body("place")
    .isLength({ min: 3 })
    .withMessage("Place name must be at least 3 charaters long")
    .isLength({ max: 12 })
    .withMessage("Place name must be less 12 charaters long"),
  body("description")
    .isLength({ min: 5 })
    .withMessage(`Description must be at least 5 character long`)
    .isLength({ max: 50 })
    .withMessage(`Description must less 50 character long`),
  async (req, res) => {
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
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw errors;
      }

      const currentHome = await updateHome(homeId, home);
      return res.status(200).json(currentHome);
    } catch (err) {
      return res.status(404).json(err);
    }
  }
);

module.exports = router;
