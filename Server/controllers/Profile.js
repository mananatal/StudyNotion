const { default: mongoose } = require("mongoose");
const Profile=require("../models/Profile");
const User=require("../models/User");
const Courses=require("../models/Courses");
const CourseProgress=require("../models/CourseProgress");
const {uploadImageToCloudinary} =require("../utils/imageUploader");
const {convertSecondsToDuration}= require("../utils/secToDuration")

//handler fucntion to edit profile

exports.editProfile=async (req,res)=>{
    try{
        //fetch data
        const {firstName="",lastName="",contactNumber="",about="",dateOfBirth="",gender=""}=req.body;

        //no need of validation
        //getting profile id of a user
        const userId=req.body.user.id;
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"UserId not found"
            });
        }
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        const profileId=user.additionalDetails;
        await User.findByIdAndUpdate(userId,{firstName,lastName});

        //updating profile
        await Profile.findOneAndUpdate({_id:profileId},{
            contactNumber:contactNumber,
            about:about,
            dateOfBirth:dateOfBirth,
            gender:gender
        },{new:true});

        const updatedUser=await User.findById(userId).populate("additionalDetails");

        //return response
        res.status(200).json({
            success:true,
            message:"Profile edited successfully",
            updatedUser
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while editing profile",
            error:error.message
        });
    }       
}


//handler function to delete profile

exports.deleteAccount=async(req,res)=>{
    try{
        const userId=req.body.user.id;        
        
        if(!userId)
        {
            return res.status(404).json({
                success:false,
                message:"User Id not found"
            });
        }

        const user=await User.findById(userId);

        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            });
        }

        const profileId=new mongoose.Types.ObjectId(user.additionalDetails);

        //deleting Profile and courses associated with user
        await Profile.findByIdAndDelete(profileId);

        for(const CourseId of user.courses)
        {
            await Courses.findByIdAndUpdate({_id:CourseId},{$pull:{studentsEnrolled:userId}},{new:true});
        }

        //now deleting user
        await User.findByIdAndDelete(userId);


        res.status(200).json({
            success:true,
            message:"User Deleted Successfully",

        });

        await CourseProgress.deleteMany({userId:userId});

    }catch(error){
        console.log("Error while deleting user profile: ",error);
        return res.status(500).json({
            success:false,
            message:"Error While deleting user profile",
            error:error.message
        })
    }
}

//handler function to update user profilephoto

exports.updatePhoto=async (req,res)=>{
    try{
        const photo=req.files.displayPicture;

        if(!photo)
        {
            return res.status(404).json({
                success:false,
                message:"Image missing",
            });
        }

        const userId=req.body.user.id;
        if(!userId){
            return res.json({
                success:false,
                message:"User id not found"
            })
        }

        const uploadedImage=await uploadImageToCloudinary(photo,process.env.FOLDER_NAME,1000,1000);

        const updatedUserImage=await User.findByIdAndUpdate(userId,{image:uploadedImage.secure_url},{new:true});

        res.status(200).json({
            success:true,
            message:"Profile Image Updated Successfully",
            data:updatedUserImage,
        })


    }catch(error){
        console.log("error while updating profile picture of user: ",error);
        return res.status(500).json({
            success:false,
            message:"Could not update profile picture",
            error:error.message,
        });
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.body.user.id;
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();
      console.log(userDetails)
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}


exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.body.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[j]
                                    .subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          course: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }


exports.instructorDashboard=async (req,res)=>{
  try{

    const userId=req.body.user.id;

    const courseDetails=await Courses.find({instructor:userId});

    const courseData=courseDetails.map((course)=>{
      const totalStudentsEnrolled=course.studentsEnrolled.length;
      const totalAmountGenerated=course.price*totalStudentsEnrolled;

      const courseDataWithStats={
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }
      return courseDataWithStats;
    })

    // console.log("PRINTING INSTRUCTOR DATA: ",courseData)

    res.status(200).json({ courses: courseData })

  }catch(error){
    console.error(error)
    res.status(500).json({ message: "Server Error" , error:error.message});
  }
}