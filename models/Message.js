import { model, Schema, Types } from 'mongoose';

const messageSchema = new Schema(
  {
    sender_id: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver_id: {
      type: Types.ObjectId,
      ref: 'User',
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

const Message = model('Message', messageSchema);
export default Message;
