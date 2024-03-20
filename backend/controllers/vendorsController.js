const Vendor = require('../models/vendor');

// Create a new vendor
exports.createVendors = async (req, res) => {
    try {
        const vendor = await Vendor.create(req.body);
        return res.status(201).json({
            success:true,
            vendor
        });
    } catch (error) {
        res.status(500).json({
             success:false,
             error: error.message
         });
    }
}

// Get all vendors
exports.getAllvendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        return res.status(200).json({
            success:true,
            vendors
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
    }
}
 // Get single vendors
exports.getVendors = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ 
                success:false,
                message: 'Vendor not found'
             });
        }
        return res.status(200).json({
            success:true,
            vendor
        });
    } catch (error) {
       res.status(500).json({
             success:false,
             error: error.message
         });
    }
}

exports.updateVendors = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) {
            return res.status(404).json({
                success:false,
                 message: 'Vendor not found' 
                });
        }
       return res.status(201).json({
        success:true,
        vendor
       });
    } catch (error) {
       res.status(500).json({
             success:false,
             error: error.message
         });
    }
}

 
// Delete vendor
exports.deleteVendors =  async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
         return res.status(404).json({
                 success:false,
                 message: 'Vendor not found'
                 });
        }
        return res.status(200).json({
             success:true,
             message: 'Vendor deleted successfully'
             });
      } catch (error) {
       res.status(500).json({
             success:false,
             error: error.message
         });
    }
}

