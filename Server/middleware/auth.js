const jwt=require("jsonwebtoken");
require("dotenv").config();

//writing auth middleware

exports.auth=(req,res,next)=>{
    try{
        //fetching token
        const token=req.cookies.token || req.body.token || req.headers.authorization.split(' ')[1];

        //applying validation checks
        if(!token)
        {
           return res.status(400).json({
                success:false,
                message:"Token not found"
            });
        }

        //verfying token

        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            
            req.body.user=decode;

        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
                data:error.message
            })
        }

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while authenticating  user",
            data:error.message
        })
    }
    next();
}

//isadmin middleware

exports.isAdmin=async (req,res,next)=>{
    
    try{
        if(req.body.user.accountType!=="Admin")
        {
            res.status(200).json({
                success:true,
                message:"This is a protected route for admin",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error while verifying user role of ADMIN",
            data:error.message
        })
    }
}

//isstudent middleware

exports.isStudent=async (req,res,next)=>{
    try{
        if(req.body.user.accountType!=="Student")
        {
            res.status(200).json({
                success:true,
                message:"This is a protected route for Student",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error while verifying user role",
            data:error.message
        })
    }
}

//isinstructor middleware

exports.isInstructor=async (req,res,next)=>{
    try{
        if(req.body.user.accountType!=="Instructor")
        {
            res.status(200).json({
                success:true,
                message:"This is a protected route for Instructor",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error while verifying user role",
            data:error.message
        })
    }
}