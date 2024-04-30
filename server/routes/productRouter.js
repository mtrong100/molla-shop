import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductDetail,
  updateProduct,
  viewProduct,
} from "../controllers/productController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/:id", getProductDetail);

router.post("/view/:id", viewProduct);

router.post("/create", protectedRoute, createProduct);

router.put("/update/:id", protectedRoute, updateProduct);

router.delete("/delete/:id", protectedRoute, deleteProduct);

export default router;
