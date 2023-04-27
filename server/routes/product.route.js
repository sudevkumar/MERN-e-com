import express from "express";
import {
  createProduct,
  deleteProducts,
  getAllProducts,
  getPhotoProducts,
  getSingleProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
const router = express();
import formidable from "express-formidable";

// Create a new product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);

// Get All Products
router.get("/get-product", getAllProducts);

// Get Photo
router.get("/product-photo/:pid", getPhotoProducts);

// Get Single Product
router.get("/get-product/:slug", getSingleProducts);

// Delete Product
router.delete("/delete-product/:pid", deleteProducts);

// Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

export default router;
