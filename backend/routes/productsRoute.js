const express = require("express");
const { createProducts, getProduct, getAllProducts, updateProducts, deleteProduct } = require("../controllers/productsController");
const { isAuthenticated } = require("../utils/auth");

const router = express.Router();

router.route("/products").get(getAllProducts).get(isAuthenticated).post(isAuthenticated,createProducts);
router.route("/products/:id").put(isAuthenticated,updateProducts).delete(isAuthenticated,deleteProduct)

module.exports = router;


