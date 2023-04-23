import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    paymentid:{
        type: String,
    },

    username:{
        type: String,
    },

    vehicle:{
        type: String,
    },

    city:{
        type: String,
    },

    price:{
        type: String,
    },

    start:{
        type: String,
    },

    end:{
        type: String,
    },

    address:{
        type:String,
    },

    time:{
        type:String,
    },
})

export default mongoose.model("Order", OrderSchema)