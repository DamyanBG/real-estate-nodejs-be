import express from 'express';
import getAllHomes from '../services/homeService.js';

const router = express.Router();

//Get all homes
router.get('/', async (req, res) => {
  const homes = await getAllHomes();
  res.status(200).json(homes);
});

export default router;
