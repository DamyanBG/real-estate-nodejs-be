import {
  createVisitation,
  getvisitationById,
  deletedVisitation,
  updateVisitation,
} from '../services/visitationService.js';
import { isValidObjectId } from 'mongoose';

import express from 'express';
const router = express.Router();

const reqBodyToObject = (req) => ({
  start_date: req.body.start_date,
  end_date: req.body.end_date,
  address: req.body.address,
  organizator_id: req.body.organizator_id,
});

router.post('/', async (req, res) => {
  const visitationInfo = reqBodyToObject(req);

  if (!isValidObjectId(visitationInfo.organizator_id)) {
    res.status(400).json('Invalid organizator id!');
    return;
  }

  const newVisitation = await createVisitation(visitationInfo);
  return res.status(201).json(newVisitation);
});

router.get('/', async (req, res) => {
  const visitationId = req.params.visitation_id;
  if (!isValidObjectId(visitationId)) {
    res.status(400).json('Invalid visitation id!');
    return;
  }

  const visitation = await getvisitationById(visitationId);
  if (!visitation) {
    res.status(404).send('Visitation with this id do not exists');
    return;
  }
  res.status(200).json(visitation);
  return;
});

router.delete('/', async (req, res) => {
  const visitationId = req.body.visitation_id;
  if (!isValidObjectId(visitationId)) {
    res.status(400).json('Invalid visitation id!');
    return;
  }
  try {
    await deletedVisitation(req.body.visitation_id);
    res.status(200).json('Visitation is deleted');
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/', async (req, res) => {
  const visitationId = req.body.visitation_id;

  if (!isValidObjectId(visitationId)) {
    res.status(400).json('Invalid visitation id!');
    return;
  }

  const visitationInfo = reqBodyToObject(req);

  if (!isValidObjectId(visitationInfo.organizator_id)) {
    res.status(400).json('Invalid organizator id!');
    return;
  }

  const newVisitation = await updateVisitation(visitationId, visitationInfo);
  return res.status(200).json(newVisitation);
});

export default router;
