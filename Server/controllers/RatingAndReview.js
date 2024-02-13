const RatingAndReviews=require("../models/RatingAndReviews");
const Courses=require("../models/Courses");
const mongoose=require("mongoose");


exports.createRating=async (req,res)=>{
    try{
        //fetching data
        const userId=req.body.user.id;

        const {review="",rating,courseId}=req.body;

        //validation
        if(!rating || !courseId){
            return res.status(404).json({
                success:false,
                message:"Please Enter all fields carefully"
            });
        }

        const courseDetails=await Courses.findById(courseId);

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Invalid courseId, No course found"
            });
        }

        const uid=new mongoose.Types.ObjectId(userId);
        const cid=new mongoose.Types.ObjectId(courseId);

        if(courseDetails.studentsEnrolled.includes(uid)){
           
            const alreadyReviewed=await RatingAndReviews.findOne({user:uid,course:cid});
            if(alreadyReviewed){
                return res.status(400).json({
                    success:false,
                    message:"User Already reviewed the course"
                });
            }

            const ratingReview=await RatingAndReviews.create({
                rating,
                review,
                user:uid,
                course:cid
            });

            await Courses.findOneAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingReview._id}},{new:true});

            return res.status(200).json({
                success:true,
                message:"User Successfully rated the course"
            });

        }
        

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while Creating rating and reviews",
            error:error.message
        });
    }
}


//handler function to get average rating

exports.getAverageRating=async (req,res)=>{
    try{
        //fetch data
        const {courseId}=req.body;

        //validation
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"CourseId Not found"
            });
        }

        const result=await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ]);

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            });
        }

        //no rating and review exist
        return res.status(200).json({
            success:true,
            message:`No rating and revuews are given for course: ${courseId}`
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while getting average Rating and Reviews for the given course",
            error:error.message
        });
    }
}

//handler function to get all ratings
exports.getAllRating=async (req,res)=>{
    try{
        
        const allReviews=await RatingAndReviews.find({})
                                              .sort({rating:"desc"})
                                              .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image",                                                    
                                              })
                                              .populate({
                                                    path:"course",
                                                    select:"courseName"
                                              }).exec();

        if(!allReviews){
            return res.json({
                success:false,
                message:"No reviews found"
            });
        }           
        
        return res.status(200).json({
            success:true,
            allReviews
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while getting all rating and reviews",
            error:error.message
        });
    }
}