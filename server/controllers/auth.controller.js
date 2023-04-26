import JWT from "jsonwebtoken";
import { compairPassword, hashPassword } from "../helpers/auth.helper.js";
import userModel from "../models/user.model.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ msg: "Name is Required" });
    }
    if (!email) {
      return res.send({ msg: "Email is Required" });
    }
    if (!password) {
      return res.send({ msg: "Password is Required" });
    }
    if (!phone) {
      return res.send({ msg: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ msg: "Address is Required" });
    }
    // if (!answer) {
    //   return res.send({ msg: "Answer is Required" });
    // }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        msg: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      msg: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Errro in Registeration",
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
