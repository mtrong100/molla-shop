import express from "express";
import {
  createOrder,
  getOrders,
  getOrderDetail,
  getUserOrders,
} from "../controllers/orderController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/orders", protectedRoute, getOrders);
router.get("/:id", protectedRoute, getOrderDetail);
router.get("/my-orders/:id", protectedRoute, getUserOrders);
router.post("/create", protectedRoute, createOrder);

export default router;
