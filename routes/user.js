import express from 'express';
import User from '../models/User.js';

const router = express.Router();
import { isValidObjectId } from 'mongoose';
import mapErrors from '../util/mapers.js';
import { body, validationResult } from 'express-validator';
import {
  updateUser,
  createUser,
  findUserById,
  updateUserProfile,
  updateUserPassword,
  updateUserEmail,
} from '../services/userService.js';

//Get user
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  if (!isValidObjectId(userId)) {
    res.status(400).send('Invalid params');
    return;
  }
  try {
    const user = await findUserById(userId);

    if (!user) {
      res.status(404).send('User with this id do not exists');
      return;
    }
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.error(err.message);
    const errors = mapErrors(err);
    res.status(400).json({ message: errors });
  }
});

//Create user
router.post(
  '/',
  body('email').isEmail().withMessage('Email must be valid'),
  body('first_name')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 charaters long')
    .isLength({ max: 50 })
    .withMessage('First name must be less 10 charaters long'),
  body('last_name')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 charaters long')
    .isLength({ max: 50 })
    .withMessage('Last name must be less 10 charaters long'),
  body('password')
    .isLength({ min: 5 })
    .withMessage(`Password must be at least 5 character long`)
    .isAlphanumeric()
    .withMessage(`Password may content only letter and number`),
  async (req, res) => {
    
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return
    }

    const user = await createUser(
      req.body.first_name.trim(),
      req.body.last_name.trim(),
      req.body.email.trim(),
      req.body.password.trim(),
      req.body.role.trim(),
      req.body.phone_number.trim()
    );

    const { password, ...other } = user._doc;
    res.status(201).json(other);
  }
);

//Delete user
router.delete('/', async (req, res) => {
  const { user_id } = req.body;

  const user = await User.findById(user_id);

  if (!user) {
    res.status(400).json('User with this id do not exists.');
    return;
  }

  const deleteUser = await User.deleteOne(user);

  if (!deleteUser) {
    res.status(400).json('something went wrong, user was not deleted');
    return;
  }

  res.status(200).json('Account has been deleted');
});

//Update
router.put(
  '/',
  body('email').isEmail().withMessage('Email must be valid'),
  body('first_name')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 charaters long')
    .isLength({ max: 50 })
    .withMessage('First name must be less 10 charaters long'),
  body('last_name')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 charaters long')
    .isLength({ max: 50 })
    .withMessage('Last name must be less 10 charaters long'),
  body('password')
    .isLength({ min: 5 })
    .withMessage(`Password must be at least 5 character long`)
    .isAlphanumeric()
    .withMessage(`Password may content only letter and number`),
  async (req, res) => {
    const userId = req.body.user_id;
    if (!isValidObjectId(userId)) {
      res.status(400).json('Invalid user id!');
      return;
    }
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      phone_number: req.body.phone_number,
    };

    const currentUser = await updateUser(userId, user);

    const { password, ...response } = currentUser._doc;
    return res.status(200).json(response);
  }
);

router.patch(
  '/profile',
  body('first_name')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 charaters long')
    .isLength({ max: 10 })
    .withMessage('First name must be less 10 charaters long'),
  body('last_name')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 charaters long')
    .isLength({ max: 10 }),
  body('phone_number').isLength({ min: 3 }),
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    const userId = req.body.user_id;
    const phoneNumber = req.body.phone_number;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    if (!isValidObjectId(userId)) {
      res.status(400).json('Invalid user id!');
      return;
    }

    const userInfo = {
      firstName,
      lastName,
      phoneNumber,
    };

    const user = await updateUserProfile(userId, userInfo);
    const { password, ...userResponse } = user._doc;
    return res.status(200).json(userResponse);
  }
);

router.patch(
  '/password',
  body('password')
    .isLength({ min: 5 })
    .withMessage(`Password must be at least 5 character long`)
    .isAlphanumeric()
    .withMessage(`Password may content only letter and number`),
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    const userId = req.body.user_id;
    const newPassword = req.body.password;
    if (!isValidObjectId(userId)) {
      res.status(400).json('Invalid user id!');
      return;
    }

    const user = await updateUserPassword(userId, newPassword);
    const { password, ...userResponse } = user._doc;
    return res.status(200).json(userResponse);
  }
);

router.patch(
  '/email',
  body('email').isEmail().withMessage('Email must be valid'),
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    const userId = req.body.user_id;
    const email = req.body.email;
    if (!isValidObjectId(userId)) {
      res.status(400).json('Invalid user id!');
      return;
    }

    const user = await updateUserEmail(userId, email);
    const { password, ...userResponse } = user._doc;
    return res.status(200).json(userResponse);
  }
);

export default router;
