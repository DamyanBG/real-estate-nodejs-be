const router = require("express").Router();
const Homes = require("../models/Homes");
const { createHome, getHomeById, deleteHome, updateHome } = require("../services/homeService");

//Create home
router.post("/", async (req, res) => {
    const home = {
      name: req.body.name,
      place: req.body.place,
      price: Number(req.body.price),
      size: req.body.size,
      year: req.body.year,
      description: req.body.description,
    };
  
    try {
      const newHome = await createHome(home);
      return res.status(201).json(newHome);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

//Get home
router.get("/", async (req, res) => {
    if (req.body.home_id) {
        try {
            const home = await getHomeById(req.body.home_id);
            const { password, updatedAt,createdAt, ...other } = home._doc;
            res.status(200).json(other);
          } catch (err) {
            return res.status(500).json(err);
          }
    }else{
        return res.status(500).json("Home with this id is dosen't existing");
    }    
  });

  //Delete home
router.delete("/", async (req, res) => {
    if (req.body.home_id) {
        try {
            await deleteHome(req.body.home_id);
            res.status(200).json("Home property is delete");
          } catch (err) {
            return res.status(500).json(err);
          }
    }else{
        return res.status(500).json("You can delete not existing home");
    }
  });

  //Update home
router.put("/", async (req, res) => {
    const homeId = req.body.home_id;
    const home = {       
            name: req.body.name,
            place: req.body.place,
            price: Number(req.body.price),
            time: req.body.time,
            size: req.body.size,
            year: req.body.year,
            description: req.body.description,    
    }


    try {
      const currentHome = await updateHome(homeId, home);
      return res.status(200).json(currentHome);
    } catch (err) {
      return res.status(500).json(err);
    }
});


module.exports = router;