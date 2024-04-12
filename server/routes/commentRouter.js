import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createComment,
  deleteComment,
  getCommentsFromProduct,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/:productId", getCommentsFromProduct);

/* CRUD */
router.post("/create", verifyToken, createComment);
router.put("/update/:id", verifyToken, updateComment);
router.delete("/delete/:id", verifyToken, deleteComment);

export default router;
