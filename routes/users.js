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


module.exports = router;