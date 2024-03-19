const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
    try {
        const { name, avatar, email, password ,role} = req.body;

        // Check if any required fields are missing
        if (!name || !avatar || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Create a new user
        const user = await User.create({ name, avatar, email, password ,role});
        const token = await user.getToken(); // Generate token for the new user

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

exports.loginUser = async (req,res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password");
   
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
 
    const isPassword = await user.checkPassword(password);

    if(!isPassword){
        return res.status(400).json({
            success:false,
            message:"Password is invalid"
        })
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({
      success:true,
      message:"login user successfully",
      token
    })

  } catch (error) {
       res.status(500).json({
        success:false,
        message:error
       })
  }
}