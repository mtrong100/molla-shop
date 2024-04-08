import express from "express";
import {
  createProduct,
  deleteProduct,
  favoriteProduct,
  getAllProducts,
  getProductDetail,
  updateProduct,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createProductValidationRule } from "../validations/productValidationRules.js";

const router = express.Router();

/* GET PRODUCT */
router.get("/all", getAllProducts);
router.get("/:id", getProductDetail);

/* CRUD */
router.post(
  "/create",
  verifyAdmin,
  createProductValidationRule(),
  createProduct
);
router.put(
  "/update/:id",
  verifyAdmin,
  createProductValidationRule(),
  updateProduct
);

router.delete("/delete/:id", verifyAdmin, deleteProduct);

/* OTHERS */
router.post("/add-wishlist/:id", verifyToken, favoriteProduct);

export default router;
