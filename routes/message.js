const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const { body, validationResult } = require("express-validator");
const { createMessage, queryReceivedMessages, querySentMessages } = require("../services/messageService");

const reqBodyToObject = (req) => ({
  sender_id: req.body.sender_id,
  receiver_id: req.body.receiver_id,
  text: req.body.text,
});

router.post(
  "/",
  body("text")
    .isLength({ min: 1 })
    .withMessage("The message is too short!")
    .isLength({ max: 150 })
    .withMessage("The message is too long!"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const messageInfo = reqBodyToObject(req);
    if (
      !isValidObjectId(messageInfo.sender_id) ||
      !isValidObjectId(messageInfo.receiver_id)
    ) {
      res.status(400).json("Invalid sender or receiver!");
      return;
    }

    const newMessage = await createMessage(messageInfo);
    return res.status(201).json(newMessage);
  }
);

router.get("/:user_id&:interlocutor_id", async (req, res) => {
  const userId = req.params.user_id;
  const interlocutorId = req.params.interlocutor_id;
  if (!isValidObjectId(interlocutorId) || !isValidObjectId(userId)) {
    res.status(400).json("Invalid sender or receiver!");
    return;
  }
  const sentMessages = await querySentMessages(userId, interlocutorId)
  const receivedMessages = await queryReceivedMessages(userId, interlocutorId)
  const messages = {
    sentMessages: sentMessages,
    receivedMessages: receivedMessages
  }
  res.status(200).json(messages);
});

module.exports = router;
