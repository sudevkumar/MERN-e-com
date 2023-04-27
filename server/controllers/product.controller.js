import productModel from "../models/product.model.js";
import slugify from "slugify";
import fs from "fs";

const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quinty, shipping } =
      req.fields;

    const { photo } = req.files;

    // All Validation
    switch (true) {
      case !name:
        return res.status(500).send({ msg: "Name is required!" });
      case !description:
        return res.status(500).send({ msg: "Description is required!" });
      case !price:
        return res.status(500).send({ msg: "Price is required!" });
      case !category:
        return res.status(500).send({ msg: "Category is required!" });
      case !quinty:
        return res.status(500).send({ msg: "Quinty is required!" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ msg: "Photo is required and should be less than 1mb!" });
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res
      .status(201)
      .send({ status: true, msg: "Product Created Successfully", products });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in product",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(201).send({
      status: true,
      total: products.length,
      msg: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in getiing products",
      error,
    });
  }
};

const getSingleProducts = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      status: true,
      msg: "Your Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in getiing products",
      error,
    });
  }
};

const getPhotoProducts = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("photo ");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(201).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in getiing product photo",
      error,
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(201).send({
      status: true,
      msg: "Product Dleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in Deleteing product",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quinty, shipping } =
      req.fields;

    const { photo } = req.files;

    // All Validation
    switch (true) {
      case !name:
        return res.status(500).send({ msg: "Name is required!" });
      case !description:
        return res.status(500).send({ msg: "Description is required!" });
      case !price:
        return res.status(500).send({ msg: "Price is required!" });
      case !category:
        return res.status(500).send({ msg: "Category is required!" });
      case !quinty:
        return res.status(500).send({ msg: "Quinty is required!" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ msg: "Photo is required and should be less than 1mb!" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res
      .status(201)
      .send({ status: true, msg: "Product Updated Successfully", products });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in Updating product",
      error,
    });
  }
};

export {
  createProduct,
  getAllProducts,
  getSingleProducts,
  getPhotoProducts,
  deleteProducts,
  updateProduct,
};
