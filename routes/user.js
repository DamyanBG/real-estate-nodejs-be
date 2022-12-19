const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Get user
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
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
    return res.status(500).json(err);
  }
});

//Delete user

router.delete("/", async (req, res) => {
  // || req.body.role.admin --> add later
  try {
    const user = await User.findByIdAndDelete(req.body.user_id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Update
router.put("/", async (req, res) => {
 
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.body.user_id, {
        $set: req.body,
      });
      user.save();
      return res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
});

module.exports = router;
