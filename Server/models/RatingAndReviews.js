const mongoose=require("mongoose");

const ratingAndReviewsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    rating:{
        type:Number,
        require:true
    },
    review:{
        type:String,
        trim:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses",
        required:true,
        index:true
    }
});

module.exports=mongoose.model("RatingAndReviews",ratingAndReviewsSchema);