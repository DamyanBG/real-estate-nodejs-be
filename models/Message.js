const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const messageSchema = new Schema(
  {
    sender_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    receiver_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      min: 1,
      max: 150,
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema)
module.exports = Message