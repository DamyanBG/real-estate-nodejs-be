import Homes from '../models/Homes.js';

export default async function getAllHomes() {
  return Homes.find({});
}

async function getHomeById(id) {
  const home = await Homes.findById(id);
  home.homeViews++;
  await home.save();
  return home;
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
  existing.latitude = home.latitude;
  existing.longitude = home.longitude;

  await existing.save();
  return existing;
}

async function deleteHome(homeId) {
  const home = await Homes.findByIdAndDelete(homeId);
  await home.save();
}

export { getHomeById, createHome, updateHome, deleteHome };
