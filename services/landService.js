import Land from '../models/Land.js';

async function createLand(land) {
  const createdLand = new Land(land);
  await createdLand.save();
  return createdLand;
}

async function getLandById(landId) {
  return Land.findById(landId);
}

async function deleteLand(landId) {
    await Land.findByIdAndDelete(landId);   
}

async function updateLand(landId, land) {
  const existing = await Land.findById(landId);

  existing.name = land.name;
  existing.place = land.place;
  existing.price = land.price;
  existing.size = land.size;
  existing.description = land.description;
  existing.owner = land.owner;
  existing.longitude = land.longitude;
  existing.latitude = land.latitude;

  await existing.save();
  return existing;
}

export { createLand, getLandById, deleteLand, updateLand };
