const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update
router.put("/:id", async(req,res) => {
    if (req.body.userId === req.params.id || req.body.role.admin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.body.userId, {
                $set: req.body
            });
            res.status(200).json("Account has been updated");

        } catch (err) {
            return res.status(500).json(err);
        }
    }else{
        return res.status(401).json("You can update only your account");
    }
});

//Delete user

router.delete("/:id", async(req,res) => {
    if (req.body.userId === req.params.id || req.body.role.admin) {
        try {
            
            const user = await User.findByIdAndDelete(req.body.userId);
            res.status(200).json("Account has been deleted");

        } catch (err) {
            return res.status(500).json(err);
        }
        
    }else{
        return res.status(401).json("You can delete only your account");
    }
});

//Get user 

router.get("/:id", async (req,res) => {
    try {
        const user = await User.findById(req.body.userId);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//Create user 

router.post("/", async(req, res) => {

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        role: req.body.role,
        phone_number: req.body.phone_number,
    }

    try {
        const newUser = await new User(user);
        res.status(201).json(newUser);
    } catch (er) {
        return res.status(500).json(err);
    }
});


module.exports = router;