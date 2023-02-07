import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, "Please provide produc ID"],
  },
  title: {
    type: String,
    required: [true, "Please provide product title"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
  },
  image: {
    type: String,
    required: [true, "Please provide product image URL"],
  },
  sold: {
    type: Boolean,
    required: [true, "Please provide product sold status"],
  },
  dateOfSale: {
    type: Date,
    required: [true, "Please provide product dateOfSale"],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
