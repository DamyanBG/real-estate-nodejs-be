const { model, Schema, Types: {ObjectId}} = require("mongoose");

const homesSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    place: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    price: {
        type: Number,
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
        min:5,
        max: 150
    },
    owner: {
        type: ObjectId,
        ref: "User",
        require: true
    },
    homeViews: {
        type: Number,
        required: true,
        default: 0
    },
});

const Homes = model("Homes", homesSchema);
module.exports = Homes;