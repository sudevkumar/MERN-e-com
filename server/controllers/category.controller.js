import categoryModel from "../models/category.model.js";
import slugify from "slugify";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).send({ msg: "Name is required" });
    }

    const existCat = await categoryModel.findOne({ name });
    if (existCat) {
      return res.status(200).send({ msg: "Category  Already Exist" });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ status: true, msg: "Category Created Successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in category",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res
      .status(201)
      .send({ status: true, msg: "Category Updated Successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in category",
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(201).send({ status: true, msg: "All Category", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error While Getting All categories",
    });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(201).send({ status: true, msg: "Your Category", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error While Getting Single categories",
    });
  }
};

const deleteSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res
      .status(201)
      .send({ status: true, msg: "Category Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error While Deleteing Single categories",
    });
  }
};

export {
  createCategory,
  updateCategory,
  getCategory,
  getSingleCategory,
  deleteSingleCategory,
};
