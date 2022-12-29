import express from 'express';
const router = express.Router();

//Check if the app works
router.get('/', async (req, res) => {
  return res.status(200).json('works');
});

export default router;
