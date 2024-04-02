import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  createOrder,
  getAllOrders,
  getOrderDetail,
  getUserOrders,
} from "../controllers/orderController.js";
const router = express.Router();

router.get("/all", verifyAdmin, getAllOrders);
router.get("/:id", verifyToken, getOrderDetail);
router.get("/my-orders/:id", verifyToken, getUserOrders);
router.post("/create", verifyToken, createOrder);

export default router;
