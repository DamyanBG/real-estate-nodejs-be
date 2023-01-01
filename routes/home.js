const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const { createHome, getHomeById, deleteHome, updateHome } = require('../services/homeService');
const { body, validationResult } = require('express-validator');

const reqBodyToObject = (req) => ({
  title: req.body.title,
  city: req.body.city,
  neighborhood: req.body.neighborhood,
  address: req.body.address,
  price: req.body.price,
  size: req.body.size,
  year: req.body.year,
  description: req.body.description,
  longitude: req.body.longitude,
  latitude: req.body.latitude,
  owner: req.body.owner
});

//Create home
router.post(
  '/',
  body('title')
    .isLength({ min: 3 })
    .withMessage('Property title must be at least 3 charaters long')
    .isLength({ max: 100 })
    .withMessage('Property title must be less 100 charaters long'),
  body('city')
    .isLength({ min: 3 })
    .withMessage('City must be at least 3 charaters long')
    .isLength({ max: 100 })
    .withMessage('City must be less 100 charaters long'),
  body('neighborhood')
    .isLength({ min: 3 })
    .withMessage('Neighborhood must be at least 3 charaters long')
    .isLength({ max: 100 })
    .withMessage('Neighborhood must be less 100 charaters long'),
  body('address')
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 charaters long')
    .isLength({ max: 255 })
    .withMessage('Address must be less 255 charaters long'),
  body('description')
    .isLength({ min: 5 })
    .withMessage(`Description must be at least 5 character long`)
    .isLength({ max: 255 })
    .withMessage(`Description must less 255 character long`),
  async (req, res) => {
    const home = reqBodyToObject(req)

    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    const newHome = await createHome(home);
    return res.status(201).json(newHome);
  }
);

//Get home
router.get('/:home_id', async (req, res) => {
  const homeId = req.params.home_id;
  console.log(homeId, "homeId from router")
  if (!isValidObjectId(homeId)) {
    res.status(400).json('Invalid home id!');
    return;
  }

  const home = await getHomeById(homeId);

  if (!home) {
    res.status(404).send('Home with this id do not exists');
    return;
  }

  res.status(200).json(home);
  return;
});

//Delete home
router.delete('/', async (req, res) => {
  const homeId = req.body.home_id;
  if (!isValidObjectId(homeId)) {
    res.status(400).json('Invalid home id!');
    return;
  }
  
  await deleteHome(homeId);
  res.status(200).json('Home has been deleted');
});

//Update home
router.put(
  '/',
  body('title')
    .isLength({ min: 3 })
    .withMessage('Property title must be at least 3 charaters long')
    .isLength({ max: 100 })
    .withMessage('Property title must be less 100 charaters long'),
  body('city')
    .isLength({ min: 3 })
    .withMessage('City must be at least 3 charaters long')
    .isLength({ max: 100 })
    .withMessage('City must be less 100 charaters long'),
  body('neighborhood')
    .isLength({ min: 3 })
    .withMessage('Neighborhood must be at least 3 charaters long')
    .isLength({ max: 100 })
    .withMessage('Neighborhood must be less 100 charaters long'),
  body('address')
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 charaters long')
    .isLength({ max: 255 })
    .withMessage('Address must be less 255 charaters long'),
  body('description')
    .isLength({ min: 5 })
    .withMessage(`Description must be at least 5 character long`)
    .isLength({ max: 255 })
    .withMessage(`Description must less 255 character long`),
  async (req, res) => {
    const homeId = req.body.home_id;
    if (!isValidObjectId(homeId)) {
      res.status(400).json('Invalid home id!');
      return;
    }
    const home = reqBodyToObject(req)
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    const currentHome = await updateHome(homeId, home);
    return res.status(200).json(currentHome);
  }
);

module.exports = router;
