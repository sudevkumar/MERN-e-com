import express from "express";
import {
  forgetPasswordController,
  loginController,
  registerController,
  testController,
} from "../controllers/auth.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import userModel from "../models/user.model.js";

// router object
const router = express.Router();

// routing

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// forget password
router.post("/forget-password", forgetPasswordController);

// Test COntroller
router.get("/test", requireSignIn, isAdmin, testController);

// Protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//

export default router;
