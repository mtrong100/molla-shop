import express from "express";
import authRouter from "./authRouter.js";
import orderRouter from "./orderRouter.js";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import commentRouter from "./commentRouter.js";
import wishlistRouter from "./wishlistRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/comment", commentRouter);
router.use("/user", userRouter);
router.use("/wishlist", wishlistRouter);
router.use("/order", orderRouter);

export default router;
