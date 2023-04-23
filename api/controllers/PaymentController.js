import { instance } from "../index.js"
import Payment from "../models/PaymentModel.js"

export const CheckOut = async (req, res) => {
    const options = {
        amount: req.body.amount,
        currency: "INR",
    }
    const order = await instance.orders.create(options)
    res.status(200).json(order)
}

export const PaymentVerification = async (req, res) => {
    const {razorpay_payment_id} = req.body

    const newPayment = new Payment({
        paymentid: razorpay_payment_id,
    })
    await newPayment.save()

    res.redirect(`http://localhost:3000/vehicles/payment/${razorpay_payment_id}`)
}