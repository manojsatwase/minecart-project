const express = require("express");
const { createProducts, getProduct, getAllProducts, updateProducts, deleteProduct } = require("../controllers/productsController");
const { isAuthenticated, restrictToAdmin } = require("../utils/auth");
const { createProductType } = require("../controllers/productTypeController");

const router = express.Router();


router.route("/products").get(getAllProducts).get(isAuthenticated).post(isAuthenticated,createProducts);
router.route("/products/:id").put(isAuthenticated,updateProducts).delete(isAuthenticated,deleteProduct)

// product types only admin and owner allow to create this product
router.route("/product-type").post(isAuthenticated,restrictToAdmin,createProductType);

module.exports = router;


