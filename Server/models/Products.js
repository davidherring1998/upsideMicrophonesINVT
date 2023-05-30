const mongoose = require("mongoose");
const { schema } = require("./User");
const { Decimal128 } = require("mongodb");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please enter a valid name input."],
      unique: true,
    },
    category: {
      type: String,
      // required: [true, "Please enter a valid category input."],
      unique: false,
    },
    // subcategory: {
    //   type: [mongoose.Schema.Types.Mixed],
    //   unique: false,
    // },
    // quantity: {
    //   type: Number,
    //   // required: [true, `Please enter an amount!`],
    //   min: 0,
    // },
    // color: {
    //   type: [String],
    // },
    // description: {
    //   type: String,
    // },
    // notes: {
    //   type: String,
    // },
    // storageLocation: {
    //   type: String,
    // },
    // weight: {
    //   type: Number,
    //   min: 0,
    //   max: 1000,
    // },
    // url: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
