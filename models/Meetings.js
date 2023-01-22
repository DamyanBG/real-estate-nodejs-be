const {
    model,
    Schema,
    Types: { ObjectId },
} = require('mongoose');
const { STATUS_ENUMS } = require('../util/enums');

const meetingsSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        end_date: {
            type: Date,
            required: true,
        },
        participants: [
            {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
            },
        ],
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
