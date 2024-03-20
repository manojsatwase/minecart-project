const ProductType = require('../models/ProductType');

exports.createProductType = async (req, res) => {
    try {
        const { name } = req.body;
        const productType = new ProductType({ name });
        await productType.save();
       return res.status(201).json({
            success: true,
            productType,
        });
    } catch (error) {
        // Handle errors and send a corresponding error response
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// Get all product types
exports.getAllProductsType = async (req, res) => {
    try {
        const productTypes = await ProductType.find();
        return  res.json({
            success:true,
            productTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


// Get product type by ID
exports.getProductType = async (req, res) => {
    try {
        const productType = await ProductType.findById(req.params.id);
        if (!productType) {
            return res.status(404).json({
                 success:false,
                 message: 'Product type not found' 
                });
        }
        return res.status(200).json({
            success:true,
            productType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

// Update product type by ID
exports.updateProductType = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedProductType = await ProductType.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedProductType) {
            return res.status(404).json({
                success:false,
                message: 'Product type not found'
             });
        }
        return res.status(201).json({
            success:true,
            updatedProductType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

// Delete product type by ID
exports.deleteProductType =  async (req, res) => {
    try {
        const deletedProductType = await ProductType.findByIdAndDelete(req.params.id);
        if (!deletedProductType) {
            return res.status(404).json({
                 success:false,
                 message: 'Product type not found' 
            });
        }
       return res.json({
             success:true,
             message: 'Product type deleted successfully'
             });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
