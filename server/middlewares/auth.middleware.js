import JWT from "jsonwebtoken";
import userModel from "../models/user.model.js";

// Protected rouet token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Invalid User" });
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        msg: "You are not allowed to this page",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "You are not allowed to this page" });
  }
};
