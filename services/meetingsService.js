import Meetings from '../models/Meetings.js';

async function createMeeting(meeting) {
    const createMmeeting = new Meetings(meeting);
    createMeeting.status = 'pending';
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
    const meeting = await Meetings.findByIdAndDelete(meetingId);
    await meeting.save();
}

export { createMeeting, getMeetingById, updateStatusMeetings, deleteMeeting, updateMeeting };
