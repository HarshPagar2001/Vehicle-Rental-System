import express from "express";
import { DeleteOrder, GetAllOrders, GetOrder, PostOrder, OrderDocument }
from "../controllers/order.js";

const router = express.Router()

router.post("/", PostOrder)
router.get("/orders", GetAllOrders)
router.get("/orders/:id", GetOrder)
router.delete("/orders/:id", DeleteOrder)
router.get("/document", OrderDocument)

export default router