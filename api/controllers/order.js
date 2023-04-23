import Order from "../models/Order.js"

//Create
export const PostOrder = async (req, res, next) => {
    const newOrder = new Order(req.body)

    try {
        await newOrder.save()
        res.status(200).json("Order Created")
    } catch (err) {
        next(err)
    }
}

//Delete
export const DeleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order Deleted")
    } catch (err) {
        next(err)
    }
}

//Get
export const GetOrder = async (req, res, next) => {
    try {
        const GetOrder = await Order.findById(req.params.id)
        res.status(200).json(GetOrder)
    } catch (err) {
        next(err)
    }
}

//Get All
export const GetAllOrders = async (req, res, next) => {
    const {...others} = req.query
    try {
        const GetAllOrders = await Order.find({...others})
        res.status(200).json(GetAllOrders)
    } catch (err) {
        next(err)
    }
}