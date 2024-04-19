import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetail,
  updateProduct,
  viewProduct,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createProductValidationRule } from "../validations/productValidationRules.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.get("/:id", getProductDetail);
router.post("/view/:id", viewProduct);

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

export default router;
