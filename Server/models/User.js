const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String
    },
    tokenExpires:{
        type:String,
    },
    image:{
        type:String,        
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        require:true
    },
    contactNumber:{
        type:String,
        require:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Courses"
        }
    ],
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]
});


module.exports=mongoose.model("User",userSchema);