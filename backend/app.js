const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// DB connect
require("./config/db");

const app = express();

//  middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// import routes

const userController = require("./routes/userRoute");
app.use("/api/v1",userController);


const PORT =  process.env.PORT || 5000;

app.listen(PORT,(req,res) =>{
    console.log(`server at running at ${PORT}`);
})



