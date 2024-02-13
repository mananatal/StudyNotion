const Courses=require("../models/Courses");
const Category=require("../models/Category");
const User=require("../models/User");
require("dotenv").config();
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");




//handler function to create new courses

exports.createCourse=async (req,res)=>{
    try{
        //fetching data
        const{courseName,courseDescription,price,whatYouWillLearn,category,tag,instructions}=req.body;

        const thumbnail=req.files.thumbnailImage;

        //applying validation checks
        if(!courseName || !courseDescription || !price || !whatYouWillLearn || !category || !thumbnail || !tag || !instructions )
        {
            return res.status(400).json({
                success:false,
                message:"Please enter all fields carefully"
            });
        }
        //converting category into id
        // category=new mongoose.Types.ObjectId(category);

        console.log("Category: ",category);

        // Convert the tag and instructions from stringified Array to Array
        const tagg=JSON.parse(tag);
        //  console.log("tag: ",tagg);
        const instructionss=JSON.parse(instructions);   
        // console.log("Instructions: ",instructionss)    

        //since we can edit this only after login so we can get user crendentials using req.user as we have passed them in payload during generating token
        
        const userId=req.body.user.id;
        //getting instructor details using userId
        const instructorDetails=await User.findById({_id:userId});
        
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor not found"
            });
        }

        //getting category details        
        const categoryDetails=await Category.findById({_id:category});
       
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }

        //uploading thumbnail to cloudinary
        const uploadedImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);   
        
        //creating entry of course in db
       
        const createdCourse=await Courses.create({
            courseName,
            courseDescription,
            thumbnail:uploadedImage.secure_url,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            instructor:instructorDetails._id,
            tag:tagg,
            instructions:instructionss,
        });
       

        //updating course in instructor profile
        await User.findOneAndUpdate({_id:userId},{$push:{courses:createdCourse._id}},{new:true});

        //updating course in tags schema
        await Category.findOneAndUpdate({_id:category},{$push:{course:createdCourse._id}},{new:true});

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:createdCourse
        });


    }catch(error){
        console.log("Error while creating course: ",error)
        return res.status(500).json({
            success:false,
            message:"Error while creating course",
            error:error.message
        });

    }
}


//handler function to get all courses

exports.getCourses=async (req,res)=>{
    try{    
        const allCourses=await Courses.find({});

        if(!allCourses){
            return res.status(404).json({
                success:false,
                message:"No courses Found, Please Create a course first"
            });
        }

        res.status(200).json({
            success:true,
            message:"Course Fetched successfully",
            data:allCourses
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while fetching courses",
            error:error.message
        });
    }
}

exports.editCourse=async (req,res)=>{
    try{
        const {courseId}=req.body;
        const updates=req.body;

        const course=await Courses.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }

        if(req.files){
            const thumbnail=req.files.thumbnailImage;
            const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
            course.thumbnail=thumbnailImage.secure_url;
        }

        // Update only the fields that are present in the request body
         for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save();

        const updatedCourse=await Courses.findById(courseId)
                                    .populate({
                                        path:"instructor",
                                        populate:{
                                            path:"additionalDetails"
                                        }
                                    })
                                    .populate("category")
                                    .populate("ratingAndReviews")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection"
                                        }
                                    }).exec();
        
        return res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:updatedCourse
        });
        
    }catch(error){
          res.status(500).json({
            success:false,
            message:"Error while updating course in editCourses handler function",
            error:error.message
          });
    }   
}


exports.getInstructorCourses=async (req,res)=>{
    try{
        const instructorId=req.body.user.id;

        if(!instructorId)
        {
            return res.status(404).json({
                success:false,
                message:"Instructor Id Not found"
            });
        }

        const courses=await Courses.find({instructor:instructorId}).populate("instructor").sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            message:"Instructor course fetched successfully",
            data:courses
        });


    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while fetching instructor courses",
            error:error.message
          });
    }
}

exports.getFullCourseDetails=async (req,res)=>{
    try{
        const {courseId}=req.body;
        const userId=req.body.user.id;

        const courseDetails = await Courses.findOne({
            _id: courseId,
          })
            .populate({
              path: "instructor",
              populate: {
                path: "additionalDetails",
              },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            })
            .exec();
        
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let courseProgressCount=await CourseProgress.findOne({course:courseId,userId:userId});

        let totalDurationInSec=0;
        courseDetails.courseContent.forEach((content)=>{
            content.subSection.forEach((subSection)=>{
                const duration=parseInt(subSection.timeDuration);
                totalDurationInSec+=duration;
            })
        });

        const totalDuration=convertSecondsToDuration(totalDurationInSec);

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                ? courseProgressCount?.completedVideos
                : [],
            },
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getCourseDetails=async (req,res)=>{
    try{
        const {courseId}=req.body;
       

        if(!courseId){
            res.status(404).json({
                success:false,
                message:"Plese send course id"
            })
        }

        const courseDetails=await Courses.findById(courseId)
                                .populate({
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails"
                                    }
                                })
                                .populate("ratingAndReviews")
                                .populate("category")
                                .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",                                        
                                    }
                                }).exec();        
        
        
        if(!courseDetails){
            return res.status(404).json({success:false, message:"CourseDetails Not found"})
        }

        let totalDuration=0;
        courseDetails.courseContent.forEach((section)=>{
            section.subSection.forEach((subSection)=>{               
                const timeDurationInSeconds=parseInt(subSection.timeDuration);
                totalDuration+=timeDurationInSeconds;             
            })
        });

        totalDuration=convertSecondsToDuration(totalDuration);
        console.log("TOTAL DUR: ",totalDuration)
        return res.status(200).json({
            success:true,
            data:{courseDetails,totalDuration}
        });


    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Error while getting single course detail",
            error: error.message,
        })

    }
}