const mongoose=require("mongoose");
const {mailSender}=require("../utils/mailSender");
const {otpTemplate} = require("../mail/templates/emailVerificationTemplate");

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        
    },
    otp:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    },    
});

async function sendVerificationMail(email,otp)
{
    
    try{
        const mailResponse=await mailSender(email,"Verification Mail",otpTemplate(otp));
        console.log("Email sent successfully ",mailResponse);

    }catch(error){
        console.log("Error occured while sending otp", error); 
        throw error;
    }
}

otpSchema.pre("save",async function (next){
    
    if (this.isNew){
        await sendVerificationMail(this.email,this.otp);
    }
   
   next();
})

module.exports=mongoose.model("OTP",otpSchema);