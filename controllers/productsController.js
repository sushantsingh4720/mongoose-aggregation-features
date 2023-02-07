import fetch from "node-fetch";
import Product from "../models/productsModel.js";
import {
  productFilterInRange,
  totalSoldNotSoldProduct,
  categoryWiseProduct,
} from "../utils/apiFeatures.js";
const insertProducts = async (req, res) => {
  try {
    let response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = await response.json();
    let product = await Product.insertMany(products);
    if (!product)
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const totalsalesproduct = async (req, res) => {
  try {
    const month = +req.query.month;

    const result = await totalSoldNotSoldProduct(month);

    res.status(200).json({ success: true, result });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const filteredProductInRange = async (req, res) => {
  try {
    const month = +req.query.month;

    const result = await productFilterInRange(month);

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const filterProductCategory = async (req, res) => {
  try {
    const month = +req.query.month;

    const result = await categoryWiseProduct(month);

    res.status(200).json({ success: true, result });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getDataOfAllAPI = async (req, res) => {
  try {
    const month = +req.query.month;
    const totalSoldProduct = await totalSoldNotSoldProduct(month);
    const productInRange = await productFilterInRange(month);
    const productInCategory = await categoryWiseProduct(month);

    res.status(200).json({
      success: true,
      totalSoldProduct,
      productInRange,
      productInCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export {
  insertProducts,
  filteredProductInRange,
  totalsalesproduct,
  filterProductCategory,
  getDataOfAllAPI,
};
