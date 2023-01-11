const Meetings = require('../models/Meetings');

async function insertMeeting(meeting) {
    const createMmeeting = new Meetings(meeting);
    createMmeeting.status = 'pending';
    await createMmeeting.save();
    return createMmeeting;
}

async function getMeetingById(meeting_id) {
    return Meetings.findById(meeting_id);
}

async function updateMeeting(meetingId, meeting) {
    const existing = await Meetings.findById(meetingId);

    existing.start_date = meeting.start_date;
    existing.end_date = meeting.end_date.place;
    existing.invitor_id = meeting.invitor_id;
    existing.invited_id = meeting.invited_id;
    existing.status = meeting.status;

    await existing.save();
    return existing;
}

async function updateStatusMeetings(meetingId, meetingStatus) {
    const existingMeeting = await Meetings.findById(meetingId);

    existingMeeting.status = meetingStatus;

    await existingMeeting.save();
    return existingMeeting;
}

async function deleteMeeting(meetingId) {
    await Meetings.findByIdAndDelete(meetingId);
}

async function selectUserMeetings(userId) {
    const meetings = await Meetings.find({ $or: [{ invitor_id: userId }, { invited_id: userId }] });
    return meetings
}

module.exports = {
    insertMeeting,
    getMeetingById,
    updateStatusMeetings,
    deleteMeeting,
    updateMeeting,
    selectUserMeetings,
};
