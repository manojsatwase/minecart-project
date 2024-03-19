const Product = require("../models/Product");

// Create a new product
exports.createProducts = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        success:true,
        product
      });
    } catch (error) {
      res.status(500).json({
         success:false,
         error: error.message 
        });
    }
  }

  // Get all products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success:true,
        products
      });
    } catch (error) {
      res.status(500).json({
         success:false,
         error: error.message
         });
 }
}

// Get product by ID
exports.getProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ 
            error: 'Product not found' 
        });
      }
      res.status(200).json({
        success:true,
        product
      });
    } catch (error) {
      res.status(500).json({
         error: error.message
         });
    }
  }

  // Update product by ID

exports.updateProducts =  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 // Delete product by ID
 exports.deleteProduct =  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  