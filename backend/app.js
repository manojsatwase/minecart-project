const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieParser());

// import routes

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productsRoute");
app.use("/api/v1",userRoute);
app.use("/api/v1",productRoute)

module.exports = app;