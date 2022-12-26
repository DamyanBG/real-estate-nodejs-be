const {
    model,
    Schema,
    Types: { ObjectId },
  } = require("mongoose");

  const meetingsSchema = new Schema(
    {
        start_date: {
        type: String,
        required: true,
      },
      end_date: {
        type: String,
        required: true,
      },
      invitor_id: {
        type: ObjectId,
        required: true,
        ref: "User"
      },
      invited_id: {
        type: ObjectId,
        required: true,
        ref: "Land"
      },
      status: {
        type: String,
        required: true,
        enum: [`pending`, `accepted`, `rejected`],
      }
    },
    { timestamps: true }
  );
  
  const Meetings = model("Meetings", meetingsSchema)
  module.exports = Meetings