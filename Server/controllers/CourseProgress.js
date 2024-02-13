const CourseProgress=require("../models/CourseProgress");
const SubSection=require("../models/SubSection")


exports.updateCourseProgress=async (req,res)=>{
    try{
        const {courseId, subsectionId}=req.body;
        const userId=req.body.user.id;

        const subsection=await SubSection.findById(subsectionId);

        if(!subsection){
            return res.status(404).json({success:false, message:"No subsection found"});
        }

        const courseProgress=await CourseProgress.find({course:courseId, userId:userId});
        // console.log("COURSE PROGRESS: ", courseProgress)
        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
              })
        }
        else{
            if(courseProgress?.completedVideos?.includes(subsectionId)){
                 return res.status(400).json({ error: "Subsection already completed" })
            }

            // courseProgress?.completedVideos?.push(subsectionId);
            await CourseProgress.findOneAndUpdate({course:courseId,userId:userId},{$push:{completedVideos:subsectionId}},{new:true});
        }

        // await courseProgress.save();
        return res.status(200).json({ message: "Course progress updated" })

    }catch(error){
        console.error("ERROR WHILE UPDATING COURSE PROGRESS: ",error)
        return res.status(500).json({ error: "Internal server error" , message:error.message})
    }
}