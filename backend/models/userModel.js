const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['Admin', 'Customer', 'Owner'],
        default: 'Customer',
      },
      avatar: {
        type: String,
      },
      isOwner: {
        type: Boolean,
        default: false,
      },created_at: {
       type: Date,
       default: Date.now,
   },
    });


userSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
       try {
           const hashedPassword = await bcrypt.hash(this.password, 10);
           this.password = hashedPassword;
           next();
       } catch (error) {
           next(error);
       }
   } else {
       next();
   }
});


userSchema.methods.generateAuthToken = async function () {
   const token = await jwt.sign({ _id: this._id }, process.env.SECRETE_KEY, { expiresIn: '1day' });
   return token;
};

userSchema.methods.checkPassword = async function (password) {
   try {
       const isMatch = await bcrypt.compare(password, this.password);
       return isMatch;
   } catch (error) {
       throw new Error("Error comparing passwords");
   }
};


const userModel = mongoose.model("User",userSchema);

module.exports = userModel;