import express from 'express';
import User from '../models/User.js';

const router = express.Router();

//Get all users without filters
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get only users
router.get('/roleUsers', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET only brokers
router.get('/roleBrokers', async (req, res) => {
  try {
    const brokers = await User.find({ role: 'broker' });
    res.status(200).json(brokers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET only admins
router.get('/roleAdmins', async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
