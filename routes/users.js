const router = require("express").Router();
const User = require("../models/User");

//Get all users without filters
router.get("/", async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get only users
router.get("/roleUsers",async(req,res) => { 
    try{    
        const users = await User.find({role : 'user'});
        res.status(200).json(users);
    }catch(err) 
    { 
        res.status(500).json(err);
    }
})

//GET only sellers
router.get("/roleSellers",async(req,res) => { 
    try{
        const sellers = await User.find({role : 'seller'});
        res.status(200).json(sellers);
    }catch(err) 
    { 
        res.status(500).json(err);
    }
})

//GET only admins
router.get("/roleAdmins",async(req,res) => { 
    try{
        const admins = await User.find({role : 'admin'});
        res.status(200).json(admins);
    }catch(err) 
    { 
         res.status(500).json(err);
    }
})


module.exports = router;