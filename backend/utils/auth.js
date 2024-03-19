const User = require("../models/userModel");

exports.authenticateUser = async(req,res) => {
    const {email,password} = req.body;
    try {
    
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({
                 success: false,
                  message: 'Invalid credentials' });
        }

         // Check if the provided password matches the stored password
         const isPasswordValid = await user.checkPassword(password);
         if (!isPasswordValid) {
             return res.status(401).json({
                 success: false, 
                 message: 'Invalid credentials' });
         }

         req,user = user;
         await user.save();
         // Generate JWT token for user authentication
         res.status(200).json({ 
            success: true,
             message: 'Authentication successful',
            token 
        });
        } catch (error) {
            res.status(500).json({
                 success: false,
                  message: error.message || 'Internal server error'
             });
        }
    };