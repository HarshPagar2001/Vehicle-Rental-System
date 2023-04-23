import express  from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import Razorpay from "razorpay";

import authRoute from "./routes/auths.js"
import usersRoute from "./routes/auths.js"
import updateRoute from "./routes/auths.js"
import vehiclesRoute from "./routes/vehicles.js"
import paymentRoute from "./routes/PaymentRoutes.js"
import orderRoute from "./routes/orders.js"


const app = express()
dotenv.config()

//database connect function
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB Connected")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Database Disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("Database Connected")
})

export const instance = new Razorpay({
    key_id: process.env.RazorPay_API_Key,
    key_secret: process.env.RazorPay_API_Secret_Key,
})

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//User Routes
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/profile", updateRoute)
app.use("/api/payment", paymentRoute)
app.use("/api/order", orderRoute)

//Vehicle Routes
app.use("/api/vehicles", vehiclesRoute)

//error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Error Message"
    return res.status(errorStatus).json({
        message: errorMessage,
        stack: err.stack
    })
})

app.get("/api/getkey", (req, res) => res.status(200).json({
    key: process.env.RazorPay_API_Key
}))


app.listen(8800, () =>{
    //call the function
    connect()
    console.log("Beckend Connected")
})