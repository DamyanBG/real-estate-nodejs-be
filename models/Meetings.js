import { model, Schema, Types } from 'mongoose';
import { STATUS_ENUMS } from '../util/enums.js';

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
            type: Types.ObjectId,
            required: true,
            ref: 'User',
        },
        invited_id: {
            type: Types.ObjectId,
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
export default Meetings;
