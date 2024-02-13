const User=require("../models/User");
const Otp=require("../models/Otp");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const jwt=require("jsonwebtoken");
require("dotenv").config();

//send otp

exports.sendOtp=async (req,res)=>{
    try{
        //fetch email from req. body
        const {email}=req.body;

        //applying validation checks
        if(!email)
        {
            return res.status(400).json({
                success:false,
                message:"Please enter all details carefully"
            });
        }

        const userExists=await User.findOne({email:email});

        if(userExists)
        {
            return res.status(400).json({
                success:false,
                message:"User already registered, Please login"
            });
        }

        //generating random otp

        let otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        let existedOtp=await Otp.findOne({otp:otp});

        //making sure that generated otp is always unique and already not existed in database
        while(existedOtp)
        {
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });

            existedOtp=await Otp.findOne({otp:otp});
        }
        
        //inserting generated otp in db

        const insertedotp=await Otp.create({email,otp});

        res.status(200).json({
            success:true,
            data:insertedotp,
            message:"Otp genterated successfully"
        });
    
    }catch(error){
        console.log("error while sending otp while signup",error.message);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while sending otp while signing up new account"
        });
    }    
}



//signup controller

exports.signup=async (req,res)=>{
    try{
        //fetching inserted details from req body
        const {firstName,lastName,email,otp,password,confirmPassword,accountType}=req.body;

        //applying validation checks
        if(!email ||!firstName||!lastName||!password||!confirmPassword )
        {
            return res.status(400).json({
                success:false,
                message:"Please insert data in all field carefully"
            });
        }

        if(password!==confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and confirm password are not same"
            });
        }
        //checking whether user already exists or not
        const existingUser=await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exists, Please login"
            });
        }

        //fetching latest generated otp for a user
        const latestOtp=await Otp.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(latestOtp);
        //validating generated otp
        if(!latestOtp)
        {
            return res.status(500).json({
                success:false,
                message:"Otp is not generated"
            })
        }
        else if(otp!==latestOtp.otp)
        {
            return res.status(401).json({
                success:false,
                message:"Please enter correct otp"
            });
        }

        //hashing password
        let hashedPassword;

        try{
            hashedPassword=await bcrypt.hash(password,10);

        }catch(error){
            console.log("Error while hashing password",error)
            res.status(500).json({
                success:false,
                data:error.message,
                message:"Error while hashing password"
            });
        }

        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            contactNumber:null,
            about:null,
        });

        const userCreated=await User.create({
            firstName,
            lastName,
            password:hashedPassword,
            email,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        res.status(200).json({
            success:true,
            userCreated,
            message:"User registered successfully"
        });

    }catch(error){
        console.log("Error while registering user",error);
        res.status(500).json({
            success:false,
            message:"Error while regestering new user",
            data:error.message
        });
    }    
}

//loginController

exports.login=async (req,res)=>{
    try{
        //fetching details from req body
        const{email,password}=req.body;

        //applying validation checks
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Please enter all fields carefully"
            });
        }

        //checking user entry in the database
        const user=await User.findOne({email}).populate("additionalDetails").exec();
        
        if(!user)
        {
            res.status(401).json({
                success:false,
                message:"User not regestered, Please create an account first",
            });
        }

        //Generating token payload
        const payload={
            id:user._id,
            accountType:user.accountType,
            email:user.email
        }
        
        //now matching entered password with acctual one
        
        if(await bcrypt.compare(password,user.password))
        {
            //generating jwt token
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

            // user=user.toObject();
            user.token=token;
            user.password=undefined;

            res.status(200).cookie("token",token,{expires:new Date(Date.now()+3*86400)}).json({
                success:true,
                token,
                user,
                message:"User login successfully"
            });

        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Please enter correct password",
                
            });
        }

    }catch(error){
        console.log("Error while login ",error.message);
        return res.status(500).json({
            success:false,
            message:"Error while logging in",
            data:error.message,
        })
    }
}


//controller for password change

// exports.updatePassword=async (req,res)=>{
//     try{
//         const {oldPassword,newPassword}=req.body;

//         if()
//     }catch(error){

//     }
// }