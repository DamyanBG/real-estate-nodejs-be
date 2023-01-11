const Message = require('../models/Message');
const { queryUserNames } = require("./userService")

async function createMessage(message) {
    const createdMessage = new Message(message);
    await createdMessage.save();
    return createdMessage;
}

async function querySentMessages(userId, interlocutorId) {
    const sentMessages = await Message.find({ sender_id: userId, receiver_id: interlocutorId });
    return sentMessages;
}

async function queryReceivedMessages(userId, interlocutorId) {
    const receivedMessages = await Message.find({ sender_id: interlocutorId, receiver_id: userId });
    return receivedMessages;
}

async function queryInterlocutors(userId) {
    const sendersResult = await Message.find({ receiver_id: userId }).select("sender_id");
    const receiversResult = await Message.find({ sender_id: userId }).select("receiver_id")
    const sendersIds = sendersResult.map((sr) => sr.sender_id.toString())
    const receiversIds = receiversResult.map((rr) => rr.receiver_id.toString())
    const interlocutorsIds = [...sendersIds, ...receiversIds].filter((x, i, a) => a.indexOf(x) == i)
    const interlocutors = []
    for (const id of interlocutorsIds) {
        const names = await queryUserNames(id)
        interlocutors.push({
            id: id,
            names: names
        })
    }
    return interlocutors
}

module.exports = {
    createMessage,
    querySentMessages,
    queryReceivedMessages,
    queryInterlocutors,
};
