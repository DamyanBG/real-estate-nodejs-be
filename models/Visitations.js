const { model, Schema, Types: {ObjectId}} = require("mongoose");

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
        type: ObjectId,
        require: true,
        ref: "User"
    },
    address: {
        type: String,
        require: true,       
    },
});

const Visitation = model("Visitation", visitationsSchema);
module.exports = Visitation;