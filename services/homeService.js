const Homes = require('../models/Homes');
const User = require("../models/User");

async function getAllHomes() {
    return Homes.find({});
}

async function getHomeById(id) {
    const home = await Homes.findById(id);
    home.homeViews++;
    await home.save();
    const ownerId = home.owner_id.toString();
    const owner = await User.findById(ownerId);
    const ownerNames = `${owner.first_name} ${owner.last_name}`;
    const homeInfo = {
        owner_names: ownerNames,
        _id: home._id,
        ...home._doc,
    };
    return homeInfo;
}

async function createHome(home) {
    const result = new Homes(home);
    await result.save();
    return result;
}

async function updateHome(homeId, home) {
    const existing = await Homes.findById(homeId);

    existing.title = home.title;
    existing.city = home.city;
    existing.neighborhood = home.neighborhood;
    existing.address = home.address;
    existing.price = home.price;
    existing.size = home.size;
    existing.year = home.year;
    existing.description = home.description;
    existing.latitude = home.latitude;
    existing.longitude = home.longitude;

    await existing.save();
    return existing;
}

async function deleteHome(homeId) {
    await Homes.findByIdAndDelete(homeId);
}

async function addPhotoName(homeId, photoName) {
    const existing = await Homes.findById(homeId);

    existing.photo_name = photoName;
    await existing.save();
    return existing;
}

module.exports = {
    getAllHomes,
    getHomeById,
    createHome,
    updateHome,
    deleteHome,
    addPhotoName,
};
