const { model, Schema, Types: {ObjectId}} = require("mongoose");

const homesSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    place: {
        type: String,
        required: true,
        min: 3,
        max: 12
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
        max: 50
    },
    owner: {
        type: ObjectId,
        ref: "User",
        require: true
    },
});

const Homes = model("Homes", homesSchema);
module.exports = Homes;