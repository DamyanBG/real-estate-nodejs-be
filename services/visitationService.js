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
    const visitation = await Visitation.findByIdAndDelete(visitationId);   
    await visitation.save();
}

async function updateVisitation(visitationId, visitation) {
    const existing = await Visitation.findById(visitationId);

    existing.start_date = visitation.start_date;
    existing.end_date = visitation.end_date;
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