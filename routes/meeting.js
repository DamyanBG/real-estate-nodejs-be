const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const {
  createMeeting,
  getMeetingById,
  deleteMeeting,
  updateMeeting,
  updateStatusMeetings,
} = require('../services/meetingsService');
const { STATUS_ENUMS } = require("../util/enums")
 
const reqBodyToObject = (req) => ({
  start_date: req.body.start_date,
  end_date: req.body.end_date,
  invitor_id: req.body.invitor_id,
  invited_id: req.body.invited_id,
  status: req.body.status,
});

router.post('/', async (req, res) => {
  const meetingInfo = reqBodyToObject(req);

  if (!isValidObjectId(meetingInfo.invitor_id)) {
    res.status(400).json('Invalid invitor id!');
    return;
  }
  if (!isValidObjectId(meetingInfo.invited_id)) {
    res.status(400).json('Invalid invited id!');
    return;
  }

  const newMeeting = await createMeeting(meetingInfo);
  return res.status(201).json(newMeeting);
});

router.get('/', async (req, res) => {
  const meetingId = req.params.meeting_id;
  if (!isValidObjectId(meetingId)) {
    res.status(400).json('Invalid meeting id!');
    return;
  }

  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    res.status(404).send('Meeting with this id do not exists');
    return;
  }
  res.status(200).json(meeting);
  return;
});

router.delete('/', async (req, res) => {
  const meetingId = req.body.meeting_id;
  if (!isValidObjectId(meetingId)) {
    res.status(400).json('Invalid meeting id!');
    return;
  }
  try {
    await deleteMeeting(req.body.meeting_id);
    res.status(200).json('Meeting is deleted');
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/', async (req, res) => {
  const meetingId = req.body.meeting_id;

  if (!isValidObjectId(meetingId)) {
    res.status(400).json('Invalid meeting id!');
    return;
  }

  const meetingInfo = reqBodyToObject(req);

  if (!isValidObjectId(meetingInfo.invitor_id)) {
    res.status(400).json('Invalid invitor id!');
    return;
  }

  if (!isValidObjectId(meetingInfo.invited_id)) {
    res.status(400).json('Invalid invited id!');
    return;
  }

  console.log(meetingInfo, "meeting infoto");
  const newMeeting = await updateMeeting(meetingInfo);
  return res.status(200).json(newMeeting);
});

router.patch('/', async (req, res) => {
  const meetingId = req.body.meeting_id;
  const meetingStatus = req.body.status;

  if (!STATUS_ENUMS.includes(meetingStatus)) {
    res.status(400).json('Invalid status!');
    return;
  }

  if (!isValidObjectId(meetingId)) {
    res.status(400).json('Invalid meeting id!');
    return;
  }

  const newMeetingStatus = await updateStatusMeetings(meetingId, meetingStatus);
  return res.status(200).json(newMeetingStatus);
});
module.exports = router;
