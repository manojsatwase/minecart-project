const express = require("express");
const { createProducts, getProduct, getAllProducts, updateProducts, deleteProduct } = require("../controllers/productsController");
const { isAuthenticated, restrictToAdmin } = require("../utils/auth");
// Product Type
const { createProductType, getAllProductsType, getProductType, updateProductType } = require("../controllers/productTypeController");
// Vendors
const { createVendors, getVendors, getAllvendors, updateVendors, deleteVendors } = require("../controllers/vendorsController");

const router = express.Router();


router.route("/products").get(getAllProducts)
      .get(isAuthenticated,getProduct)
      .post(isAuthenticated,createProducts);
router.route("/products/:id")
      .put(isAuthenticated,updateProducts)
      .delete(isAuthenticated,deleteProduct)

// product types only admin and owner allow to create this product
router.route("/product-types")
      .get(isAuthenticated,restrictToAdmin,getAllProductsType)
      .post(isAuthenticated,restrictToAdmin,createProductType);
router.route("/product-types/:id")
      .get(isAuthenticated,restrictToAdmin,getProductType)
      .put(isAuthenticated,restrictToAdmin,updateProductType)
      .delete([isAuthenticated,restrictToAdmin],deleteProductType)
// Combine isAuthenticated and restrictToAdmin middlewares for /product-types route

// vendors 
router.route("/vendors")
      .get(isAuthenticated,getAllvendors)
      .post(isAuthenticated,createVendors);
router.route("/vendors/:id")
      .get(isAuthenticated,getVendors)
      .put(isAuthenticated,updateVendors)
      .delete(isAuthenticated,deleteVendors);


module.exports = router;


