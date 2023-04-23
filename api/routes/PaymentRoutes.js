import express from "express";
import { CheckOut, PaymentVerification } from "../controllers/PaymentController.js";

const router = express.Router()

router.post("/checkout", CheckOut)
router.post("/checkout/paymentverification", PaymentVerification)

export default router