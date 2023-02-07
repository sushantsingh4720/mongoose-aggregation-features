import express from "express";
import {
  insertProducts,
  filteredProductInRange,
  totalsalesproduct,
  filterProductCategory,
  getDataOfAllAPI,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/products/insert", insertProducts);
router.get("/products/FilteredProductInRange", filteredProductInRange);
router.get("/products/totalsalesproduct", totalsalesproduct);
router.get("/products/FilterProductCategory", filterProductCategory);
router.get("/products/getDataOfAllAPI", getDataOfAllAPI);
export default router;
