const { model, Schema, Types: {ObjectId}} = require("mongoose");

const visitationsSchema = new Schema({
    start_hour: {
        type: Date,
        required: true,
    },
    end_hour: {
        type: Date,
        required: true,
    },
    date:{
        type:Date,
        required:true,
    },
    organizator_id: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    home_id:{
        type:ObjectId,
        required:true,
        ref:"Homes"
    },
    address: {
        type: String,
        required: true,       
    },
});

const Visitation = model("Visitation", visitationsSchema);
module.exports = Visitation;