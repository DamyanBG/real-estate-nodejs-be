const Homes = require("../models/Homes");

async function getAllHomes() {
    return Homes.find({});
}

async function getHomeById(id) {
    return Homes.findById(id);
}

async function createHome(home) {
    const result = new Homes(home);
    await result.save();
    return result;
}

async function updateHome(homeId, home) {
    const existing = await Homes.findById(homeId);

    existing.name = home.name;
    existing.place = home.place;
    existing.price = home.price;
    existing.size = home.size;
    existing.year = home.year;
    existing.description = home.description;

    await existing.save();
    return existing;
}

async function deleteHome(homeId) {
    const home =  await Homes.findByIdAndDelete(homeId);   
    await home.save();
}

module.exports = {
    getAllHomes,
    getHomeById,
    createHome,
    updateHome,
    deleteHome
}