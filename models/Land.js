import { model, Schema, Types } from 'mongoose';

const landSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    place: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 150,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
    },
});

const Land = model('Land', landSchema);
export default Land;
