const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        require:true,
    },
    courseDescription:{
        type:String,
        require:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    whatYouWillLearn:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    },
    thumbnail:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews",
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
    },
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    tag:{
            type:[String],
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
});

module.exports=mongoose.model("Courses",courseSchema);