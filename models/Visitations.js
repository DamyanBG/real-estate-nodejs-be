import { model, Schema, Types } from 'mongoose';

const visitationsSchema = new Schema({
    start_date: {
        type: String,
        required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
    organizator_id: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
    address: {
        type: String,
        required: true,
    },
});

const Visitation = model('Visitation', visitationsSchema);
export default Visitation;
