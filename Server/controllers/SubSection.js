const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const {uploadImageToCloudinary}=require("../utils/imageUploader");
require("dotenv").config(); 


//handler function to create subsection
exports.createSubSection=async (req,res)=>{
    try{
        //fetching data
        const {description,title,sectionId}=req.body;
        const videoFile=req.files.videoFile;

        // applying validation checks
        if(!description||!title ||!sectionId ||!videoFile){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields carefully"
            });
        }

        const section=await Section.findById(sectionId);

        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not found, Please pass a valid section id"
            });
        }

        //uploading video to cloudinary
        const uploadedVideo=await uploadImageToCloudinary(videoFile,process.env.FOLDER_NAME);

        //updating subsection in db
        const createdSubSection=await SubSection.create({
            title,
            description,
            timeDuration:`${uploadedVideo.duration}`,
            videoUrl:uploadedVideo.secure_url,
        });

        //creating subsection entry in section
        const updatedSection =await Section.findOneAndUpdate({_id:sectionId},{$push:{subSection:createdSubSection._id}},{new:true})
            .populate("subSection");

        //return res
        res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            data:updatedSection
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while creating sub-section",
            error:error.message
        });
    }
}

//handler function to update subSection

exports.updateSubSection=async (req,res)=>{
    try{

         //fetching data
         const {description,title,subSectionId,sectionId}=req.body;
         const videoFile=req.files.videoFile;
        
         console.log("A: ",description);
         console.log("A: ",title);
         console.log("A: ",subSectionId);

         console.log("A: ",sectionId);
         console.log("A: ",videoFile);
         // applying validation checks
         if(!description  ||!title ||!subSectionId ||!videoFile ||!sectionId){
             return res.status(400).json({
                 success:false,
                 message:"Please enter all fields carefully"
             });
         }
 
         const subSection=await SubSection.findById(subSectionId);
 
         if(!subSection){
             return res.status(404).json({
                 success:false,
                 message:"Sub-Section not found, Please pass a valid Sub-section id"
             });
         }
 
         //uploading video to cloudinary
         const uploadedVideo=await uploadImageToCloudinary(videoFile,process.env.FOLDER_NAME);
 
         //updating subsection in db
         const updatedSubSection=await SubSection.findOneAndUpdate({_id:subSectionId},{
            
                title:title,
                description:description,
                timeDuration:`${uploadedVideo.duration}`,
                videoUrl:uploadedVideo.secure_url
            
         },{new:true});
         
         const subSectionUpdated=await Section.findById(sectionId).populate(
            "subSection"
          );
         
         //return res
         res.status(200).json({
             success:true,
             message:"SubSection Updated successfully",
             data:subSectionUpdated
         });

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while updating sub-section",
            error:error.message
        });
    }
}


//handler function to delete a Sub-Section

exports.deleteSubSection=async (req,res)=>{
    try{
        //fetching data
        const {subSectionId,sectionId}=req.body;

        //applying validation checks
        if(!subSectionId || !sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"id not found"
            });
        }

        const existedSubSection=await SubSection.findById(subSectionId);
        const existedSection=await Section.findById(sectionId);

        if(!existedSubSection){
            return res.status(404).json({
                success:false,
                message:"sub-Section not found, Please enter valid sub-SectionId"
            });
        }
        if(!existedSection){
            return res.status(404).json({
                success:false,
                message:"Section not found, Please enter valid SectionId"
            });
        }

        //deleting existing section from Section and Xourses schema
        await Section.findOneAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}});
        await SubSection.findByIdAndDelete(subSectionId);

        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        );
      

        //returning res
        res.status(200).json({
            success:true,
            message:"Sub-Section deleted successfully",      
            data: updatedSection,      
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while deleting sub-section",
            error:error.message
        });
    }
}