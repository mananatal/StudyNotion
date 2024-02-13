const mongoose=require("mongoose");

const subSectionSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true,        
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
        require:true,
    }
});

module.exports=mongoose.model("SubSection",subSectionSchema);