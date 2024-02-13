const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const courseRoutes=require("./routes/Course");
const PaymentRoutes=require("./routes/Payments");
// const contactUsRoute=require("./routes/Contact");

const database=require("./config/dbConnect");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const cloudinary=require("./config/cloudinary");

const fileUpload=require("express-fileupload");
require("dotenv").config();

const PORT=process.env.PORT || 4000;

//database and cloudinary connection
database.dbConnect();
cloudinary.cloudinaryConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",PaymentRoutes);
// app.use("/api/v1/reach",contactUsRoute);

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running..... "
    });
});

app.listen(PORT,()=>{
    console.log("App is running at ",PORT);
});