import express from "express";
import authRouter from "./authRouter.js";
import orderRouter from "./orderRouter.js";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
// router.use("/user", userRouter);
// router.use("/order", orderRouter);

export default router;
