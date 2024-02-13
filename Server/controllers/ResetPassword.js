const {mailSender}=require("../utils/mailSender");
const User=require("../models/User");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

//sending frontend link to mail
exports.sendResetPasswordLink=async (req,res)=>{
    try{
        //fetching details
        const {email}=req.body;

        //applying validation checks
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields carefully"
            });
        }

        //checking user exists in db or not
        const existedUser=await User.findOne({email:email});

        if(!existedUser)
        {
            return res.status(404).json({
                success:false,
                message:"Sorry user is not registered, Please enter valid email id"
            });
        }

        //generating token
        const token=crypto.randomUUID();

        //inserting generated token in user database
        await User.findOneAndUpdate({_id:existedUser._id}
                                                        ,{
                                                            token:token,
                                                            tokenExpires:Date.now()+5*60*1000
                                                        },
                                                        {new:true}
                                                        );

        const url=`http://localhost:3000/reset-password/${token}`

        //sending mail to user for reseting password

        const info=await mailSender(email,"Link to Reset Password",`Click this url to reset password: ${url}`);

        res.status(200).json({
            success:true,
            message:"Password reset link has been successfully sent to email",
            data:info
        });


    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while sending password reset link to user",
            data:error.message
        });
    }
}

//verfying in backend

exports.resetPassword=async (req,res)=>{
    try{
        //fetching details 
        const {token,password,confirmPassword}=req.body;

        //applying validation checks
        if(!password || !token || !confirmPassword)
        {
            return res.status(401).json({
                success:false,
                message:"Please enter all fields carefully"
            });
        }

        //finding user in the db
        const existedUser=await User.findOne({token:token});

        if(!existedUser)
        {
            return res.status(404).json({
                success:false,
                message:"User not found, token is invalid"
            });
        }
        else if(existedUser.tokenExpires < Date.now())
        {
            return res.status(408).json({
                success:false,
                message:"Token expires, Please generate Password Reset link again",
            });
        }


        if(password===confirmPassword)
        {
            let hashedPassword;
            try{
                hashedPassword=await bcrypt.hash(password,10);
            }
            catch(error){
               return  res.status(500).json({
                    success:false,
                    message:"Error while hashing password",
                    data:error.message
               });
            }

            //updating password in db
            const updatedUser=await User.findOneAndUpdate({_id:existedUser._id},
                                                {
                                                    
                                                        password:hashedPassword
                                                    
                                                },
                                                {new:true}  
                                            );

            return res.status(200).json({
                success:true,
                message:"Password reset successfully",
                data:updatedUser
            });
                                    
        }
        else
        {
            res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword does not match"
            });
        }


    }catch(error){
            res.status(500).json({
                success:false,
                message:"Error while reseting password",
                data:error.message
            });
    }
}