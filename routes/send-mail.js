import express from 'express';
const router = express.Router();
import { main } from '../email-service/send-email.js';

//Check if the email service works
router.get('/', async (req, res) => {
    main();
    return res.status(200).json('works');
});

export default router;
