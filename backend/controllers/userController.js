const User = require("../models/userModel");
const isValidEmail = require("../utils/validators");

exports.registerUser = async (req, res) => {
    try {
        const { username, avatar, email, password ,role} = req.body;

        // Check if any required fields are missing
        if (!username || !avatar || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }
    
        if(!isValidEmail(email)){
            return res.status(404).json({
               success:false,
               message:"Email is not invalid"
            })
           }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder:"avatars"
        });

        // Create a new user
        const user = await User.create({ 
            username, email, password,role,
            avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }});
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
 
    const isPasswordMatch = await user.matchPassword(password);

    if(!isPasswordMatch){
        return res.status(400).json({
            success:false,
            message:"Password is invalid"
        })
    }

    const token = await user.generateAuthToken();
    const options = {
        expires:new Date(Date.now() + 1 * 24 * 1 * 60 * 1000),
        httpOnly:true
      }

    return res.status(200).cookie("token",token,options).json({
      success:true,
      message:"login user successfully",
      user,
      token
    })

  } catch (error) {
       res.status(500).json({
        success:false,
        message:error
       })
  }
}



exports.updatedPassword = async(req,res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");
        
        const {oldPassword,newPassword} = req.body;

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Please provide old and new password."
             })
        }

        const isPasswordMatch = await user.matchPassword(oldPassword);
        
        if(!isPasswordMatch){
            res.status(400).json({
                success:false,
                message: "Incorrect Old password!"
            })
        }else{
            user.password = newPassword;
            await user.save();
           return res.status(200).json({
               success:false,
               message:"Password updated successfully"
            })
        }
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.myProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success:true,
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.logout = async(req,res) => {
    try{
        res.status(200).cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
  // In JWT, since tokens are stateless, you typically don't need to do anything here
  // Clients are responsible for discarding the token on logout
     return res.status(200).json({ message: 'Logout successful' });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllUsers = async(req,res) => {
    try {
        // req.params.id => '/users/:id',
        // req.query.username => '/users?username=${username}'
        // req.body.username
        // Make sure you have body-parser middleware installed 
        //and included in your Express application.
        const users = await User.find({
            username:{$regex:req.query.username,$options:"i"}
        })

        res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.updateProfile = async(req,res) => {
    try {
        const {username,email,avatar} = req.body;
        const user = await User.findById(req.user._id);

        if(username){
            user.username = username
        }
        if(email){
            if(!isValidEmail(email)){
                return res.status(404).json({
                    success:false,
                    message:"Email is not invalid"
                })
            }
          user.email = email;
        }

        // user avatar TODO

        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar,{
                folder:"avatars"
            })
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();
        
        return res.status(200).json({
            success:true,
            message:"Profile Updated",
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message 
        })
    }
}

