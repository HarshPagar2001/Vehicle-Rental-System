import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    photos:{
        type: [String],
    },

    description:{
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    type:{
        type:String,
        required: true
    },

    price:{
        type: String,
        required: true
    },
})

export default mongoose.model("Vehicle", VehicleSchema)