const Visitation = require("../models/Visitations");

async function createVisitation(visitation) {
    const newVisitation = new Visitation(visitation)
    await newVisitation.save()
    return newVisitation
}

async function getvisitationById(visitationId) {
    return Visitation.findById(visitationId)
}

async function deletedVisitation(visitationId) {
    await Visitation.findByIdAndDelete(visitationId);   
}

async function updateVisitation(visitationId, visitation) {
    const existing = await Visitation.findById(visitationId);

    existing.start_hour = visitation.start_hour;
    existing.end_hour = visitation.end_hour;
    existing.date = visitation.date
    existing.address = visitation.address;

    await existing.save();
    return existing;
}

async function queryVisitationsByLandId(landId) {
    const visitations = await Visitation.find({ land_id: landId })
    return visitations
}

async function queryVisitationsByHomeId(homeId) {
    const visitations = await Visitation.find({ home_id: homeId })
    return visitations
}

module.exports = {
    getvisitationById,
    createVisitation,
    deletedVisitation,
    updateVisitation,
    queryVisitationsByLandId,
    queryVisitationsByHomeId,
}