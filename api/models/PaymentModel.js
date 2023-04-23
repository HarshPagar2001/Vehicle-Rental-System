import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    paymentid:{
        type: String,
        required: true
    },
})

export default mongoose.model("Payment", PaymentSchema)