import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getUserWishlist,
  toggleWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/get/:userId", verifyToken, getUserWishlist);
router.post("/toggle/:userId/:productId", verifyToken, toggleWishlist);

export default router;
