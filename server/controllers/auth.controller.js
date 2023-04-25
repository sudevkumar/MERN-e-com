import JWT from "jsonwebtoken";
import { compairPassword, hashPassword } from "../helpers/auth.helper.js";
import userModel from "../models/user.model.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // validation
    if (!name) {
      return res.send({ error: "Name must be provided" });
    }

    if (!email) {
      return res.send({ error: "Email must be provided" });
    }

    if (!password) {
      return res.send({ error: "Password must be provided" });
    }

    if (!phone) {
      return res.send({ error: "Phone must be provided" });
    }

    if (!address) {
      return res.send({ error: "Address must be provided" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, msg: "Already Regisetr Please Login" });
    }

    // Register user
    const hashedPaasword = await hashPassword(password);
    // Save
    const user = await new userModel({
      name,
      email,
      password: hashedPaasword,
      phone,
      address,
    }).save();

    res.status(200).send({
      status: true,
      msg: "User Registration Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in Register",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate email and password
    if (!email) {
      return res.send({ error: "Email must be provided" });
    }
    if (!password) {
      return res.send({ error: "Password must be provided" });
    }
    // Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, msg: "Email is note registered" });
    }

    const decryptPassword = await compairPassword(password, user.password);
    if (!decryptPassword) {
      return res.status(200).send({ success: false, msg: "Wrong password" });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      msg: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in Login",
      error,
    });
  }
};

// test controler

const testController = (req, res) => {
  res.send("Protected");
};

export { registerController, loginController, testController };
