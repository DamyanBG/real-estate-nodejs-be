import express from 'express';
const router = express.Router();
import { main } from '../latest-news/get-latest-news.js';

//Get latest news
router.get('/', async (req, res) => {
    main(res);
});

export default router;
