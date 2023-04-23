import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    photo:{
        type: [String],
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    phone:{
        type: Number,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    admin:{
        type: String,
        default: false
    },
})

export default mongoose.model("User", UserSchema)