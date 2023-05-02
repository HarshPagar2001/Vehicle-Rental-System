import Vehicle from "../models/Vehicle.js"

//Create
export const createVehicle = async (req, res, next) => {
    const newVehicle = new Vehicle(req.body)

    try {
        await newVehicle.save()
        res.status(200).json("Vehicle Created")
    } catch (err) {
        next(err)
    }
}

//Update
export const updateVehicle = async (req, res, next) => {
    try {
        const updateVehicle = await Vehicle.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updateVehicle)
    } catch (err) {
        next(err)
    }
}

//Delete
export const deleteVehicle = async (req, res, next) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id)
        res.status(200).json("Vehicle Deleted")
    } catch (err) {
        next(err)
    }
}

//Get
export const getVehicle = async (req, res, next) => {
    try {
        const GetVehicle = await Vehicle.findById(req.params.id)
        res.status(200).json(GetVehicle)
    } catch (err) {
        next(err)
    }
}

//GetAll
export const getallVehicle = async (req, res, next) => {
    const {min, max, ...others} = req.query
    try {
        const GetAllVehicle = await Vehicle.find({...others, price:{$gt:min | 0, $lt:max || 800},})
        res.status(200).json(GetAllVehicle)
    } catch (err) {
        next(err)
    }
}

export const VehicleDocument = async (req, res, next) => {
    try {
        const VehicleList = await Vehicle.countDocuments()
        res.status(200).json(VehicleList)
    } catch (err) {
        next(err)
    }
}