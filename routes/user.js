const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mapErrors = require("../util/mapers");

//Get user
router.get("/", async (req, res) => {
  const userId = req.body.user_id;
  if(!isValidObjectId(userId))
  { 
    res.status(400).send("Invalid params");
    return;
  }
  try {
    const user = await User.findById(userId);
    if(!user)
    { 
      res.status(404).send("User with this id do not exists");
      return;
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
      console.error(err.message);
      const errors = mapErrors(err);
      res.status(400).json({ message: errors });
  }
});

//Create user
router.post("/", async (req, res) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    hashedPassword: req.body.hashedPassword,
    role: req.body.role,
    phone_number: req.body.phone_number,
  };

  try {
    const newUser = new User(user);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
      console.error(err.message);
      const errors = mapErrors(err);
      res.status(400).json({ message: errors });
  }
});

//Delete user
router.delete("/", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.user_id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
      console.error(err.message);
      const errors = mapErrors(err);
      res.status(400).json({ message: errors });
  }
});

//Update
router.put("/", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body.user_id, {
        $set: req.body,
      });
      user.save();
      return res.status(200).json("Account has been updated");
    } catch (err) {
      console.log(err);
      console.error(err.message);
      const errors = mapErrors(err);
      res.status(400).json({ message: errors });
    }
});

module.exports = router;
