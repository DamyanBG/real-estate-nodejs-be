const {
  model,
  Schema,
  Types: { ObjectId },
} = require('mongoose');
const { STATUS_ENUMS } = require('../util/enums');

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
      ref: 'User',
    },
    invited_id: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
      enum: STATUS_ENUMS,
    },
  },
  { timestamps: true }
);

const Meetings = model('Meetings', meetingsSchema);
module.exports = Meetings;
