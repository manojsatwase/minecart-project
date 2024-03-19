const express = require("express");
const { createProducts, getProduct, getAllProducts, updateProducts, deleteProduct } = require("../controllers/productsController");
const { authenticateUser } = require("../utils/auth");

const router = express.Router();

router.route("/products").get(getAllProducts).get(authenticateUser).post(authenticateUser,createProducts);
router.route("/products/:id").put(authenticateUser,updateProducts).delete(authenticateUser,deleteProduct)

module.exports = router;


