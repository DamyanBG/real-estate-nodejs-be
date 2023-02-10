const {
  createVisitation,
  getvisitationById,
  deletedVisitation,
  updateVisitation,
  queryVisitationsByLandId,
} = require("../services/visitationService");
const { isValidObjectId } = require("mongoose");

const router = require("express").Router();

const reqBodyToObject = (req) => ({
  start_hour: req.body.start_hour,
  end_hour: req.body.end_hour,
  date: req.body.date,
  address: req.body.address,
  organizator_id: req.body.organizator_id,
  home_id: req.body.home_id,
  land_id: req.body.land_id,
});

router.post("/", async (req, res) => {
  const visitationInfo = reqBodyToObject(req);

  if (!isValidObjectId(visitationInfo.organizator_id)) {
    res.status(400).json("Invalid organizator id!");
    return;
  }

  if (!isValidObjectId(visitationInfo.home_id) && !isValidObjectId(visitationInfo.land_id)) {
    res.status(400).json("Invalid property id!");
    return;
  }

  const newVisitation = await createVisitation(visitationInfo);
  return res.status(201).json(newVisitation);
});

router.get("/", async (req, res) => {
  const visitationId = req.params.visitation_id;
  if (!isValidObjectId(visitationId)) {
    res.status(400).json("Invalid visitation id!");
    return;
  }

  const visitation = await getvisitationById(visitationId);
  if (!visitation) {
    res.status(404).send("Visitation with this id do not exists");
    return;
  }
  res.status(200).json(visitation);
  return;
});

router.delete("/", async (req, res) => {
  const visitationId = req.body.visitation_id;
  if (!isValidObjectId(visitationId)) {
    res.status(400).json("Invalid visitation id!");
    return;
  }
  try {
    await deletedVisitation(req.body.visitation_id);
    res.status(200).json("Visitation is deleted");
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put("/", async (req, res) => {
  const visitationId = req.body.visitation_id;

  if (!isValidObjectId(visitationId)) {
    res.status(400).json("Invalid visitation id!");
    return;
  }

  const visitationInfo = reqBodyToObject(req);

  if (!isValidObjectId(visitationInfo.organizator_id)) {
    res.status(400).json("Invalid organizator id!");
    return;
  }

  const newVisitation = await updateVisitation(visitationId, visitationInfo);
  return res.status(200).json(newVisitation);
});

router.get("/land/:landId", async (req, res) => {
  const landId = req.params.landId;
  if (!isValidObjectId(landId)) {
    res.status(400).json("Invalid land id!");
    return;
  }

  const visitations = await queryVisitationsByLandId(landId);
  res.status(200).json(visitations);
  return;
});


module.exports = router;
