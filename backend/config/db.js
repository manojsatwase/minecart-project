const mongoose = require("mongoose");

 exports.DB = mongoose.connect(process.env.MONGO_URL).then((con)=>{
    console.log(`Mongodb DB Connected Successfully ${con.connection.host}`)
}).catch(err => {
    console.log(err);
})