const { model, Schema, Types: {ObjectId}} = require("mongoose");

const homesSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    city: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    neighborhood: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    address: {
        type: String,
        min: 3,
        max: 255
    },
    price: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    longitude: {
        type: String,
        max: 30
    },
    latitude: {
        type: String,
        max: 30
    },
    owner: {
        type: ObjectId,
        ref: "User",
        require: true
    },
    homeViews: {
        type: Number,
        default: 0
    },
});

const Homes = model("Homes", homesSchema);
module.exports = Homes;