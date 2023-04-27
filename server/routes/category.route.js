import express from "express";
import {
  createCategory,
  deleteSingleCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
const router = express();

// routes

// Create a new category
router.post("/create-category", requireSignIn, isAdmin, createCategory);

// Update a category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

// get All categories
router.get("/get-all-category", getCategory);

// get single category
router.get("/get-single-category/:slug", getSingleCategory);

// Delete a single category
router.delete(
  "/delete-single-category/:id",
  requireSignIn,
  isAdmin,
  deleteSingleCategory
);

export default router;
