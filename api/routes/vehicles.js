import express from "express";
import { createVehicle,
        updateVehicle,
        deleteVehicle,
        getVehicle,
        getallVehicle,
        VehicleDocument } from "../controllers/vehicle.js";

const router = express.Router()

//Create
router.post("/", createVehicle)

//Update
router.put("/:id", updateVehicle)

//Delete
router.delete("/:id", deleteVehicle)

//Get
router.get("/vehicle/:id", getVehicle)

//GetAll
router.get("/", getallVehicle)

router.get("/document", VehicleDocument)

export default router