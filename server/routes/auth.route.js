import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/auth.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

// router object
const router = express.Router();

// routing

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

export default router;
