const mongoose=require("mongoose");
require("dotenv").config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("Database connected successfully")})
    .catch((error)=>{
        console.log("Error while connecting to mongodb ",error);
        process.exit(1);
    });
}