const Message = require("../models/Message")

async function createMessage(message) {
    const createdMessage = new Message(message)
    await createdMessage.save()
    return createdMessage
}

async function querySentMessages(userId, interlocutorId) {
    const sentMessages = await Message.find({sender_id: userId, receiver_id: interlocutorId})
    return sentMessages
}

async function queryReceivedMessages(userId, interlocutorId) {
    const receivedMessages = await Message.find({sender_id: interlocutorId, receiver_id: userId})
    return receivedMessages
}

module.exports = {
    createMessage,
    querySentMessages,
    queryReceivedMessages
}