const ProductType = require('../models/ProductType');

exports.createProductType = async (req, res) => {
    try {
        const { name } = req.body;
        const productType = new ProductType({ name });
        await productType.save();
        res.status(201).json({
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


