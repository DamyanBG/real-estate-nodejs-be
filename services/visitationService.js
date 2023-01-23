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

module.exports = {
    getvisitationById,
    createVisitation,
    deletedVisitation,
    updateVisitation
}