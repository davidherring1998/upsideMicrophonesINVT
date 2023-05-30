const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Product = require("../models/Products");

// Get all product
// api/product
// GET request
const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      msg: `FAILED, product was not retrieved from database. Please contact support: upsideelectronicsmiddletn@gmail.com`,
    });
  }
});

// post product
// /api/product
// POST request
const addProduct = asyncHandler(async (req, res) => {
  try {
    if (
      // check for required input
      !req.body.name ||
      !req.body.category 
    //   !req.body.quantity
    ) {
      res.status(400).json({ msg: `Please Enter all required fields.` });
    }
    const product = await Product.create({
      // create new product
      name: req.body.name,
      category: req.body.category,
    //   subcategory: req.body.subcategory,
    //   quantity: req.body.quantity,
    //   color: req.body.color,
    //   description: req.body.description,
    //   notes: req.body.notes,
    //   storageLocation: req.body.storageLocation,
    //   weight: req.body.weight,
    });

    res
      .status(201)
      .json({ msg: `New product has been added to the database.`, product });
  } catch (error) {
    res.status(401).json({
      error,
      msg: `FAILED, product was not added to the database. Please contact support: upsideelectronicsmiddletn@gmail.com ${error}`,
    });
  }
});

const editProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400).json({ msg: `Product not found.` });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json({ msg: `Product has been Updated. ${updatedProduct}` });
  } catch (error) {
    res.status(400).json({
      msg: `FAILED, product was not added to database. Please contact support: upsideelectronicsmiddletn@gmail.com ${error}`,
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400).json({ msg: `Product not found.` });
    }

    const deleteProduct = await Product.findByIdAndRemove(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ msg: `Product has been deleted.` });
  } catch (error) {
    res.status(400).json({
      msg: `FAILED, product was not deleted from database. Please contact support: upsideelectronicsmiddletn@gmail.com ${error}`,
    });
  }
});

module.exports = {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
