const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const {
    insertMeeting,
    getMeetingById,
    deleteMeeting,
    updateMeeting,
    updateStatusMeetings,
    selectUserMeetings,
} = require('../services/meetingsService');
const { STATUS_ENUMS } = require('../util/enums');

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

    const newMeeting = await insertMeeting(meetingInfo);
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
    console.log(meetingId)
    if (!isValidObjectId(meetingId)) {
        res.status(400).json('Invalid meeting id!');
        return;
    }
    
    await deleteMeeting(req.body.meeting_id);
    res.status(200).json('Meeting is deleted');
    
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

    console.log(meetingInfo, 'meeting infoto');
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

router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    if (!isValidObjectId(userId)) {
        res.status(400).json('Invalid user id!');
        return;
    }

    const meetings = await selectUserMeetings(userId)
    res.status(200).json(meetings);
});

module.exports = router;
