const Courses=require("../models/Courses");
const Section=require("../models/Section");
const SubSection=require("../models/SubSection");

//handler function to create new section

exports.createSection=async (req,res)=>{
    try{
        //fetching data from req body
        const {sectionName,courseId}=req.body;

        //validation checks
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields carefully"
            });
        }
        const existedCourse=await Courses.findOne({_id:courseId});

        if(!existedCourse){
            return res.status(404).json({
                success:false,
                message:"Invalid course id, Course does not exist"
            });
        }

        //inserting subsection in db

        const insertedSection=await Section.create({
            sectionName,
            course:courseId,
        });

        //upadating section in Courses schema

        const updatedCourse=await Courses.findOneAndUpdate({_id:courseId},{$push:{courseContent:insertedSection._id}},{new:true})
        .populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection",
                }
            }
        ).exec();
        

        //returning res

        res.status(200).json({
            success:true,
            message:"Section created successfully",
            data:updatedCourse
        }); 

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while creating section",
            error:error.message
        });
    }
}

//handler function to update sections

exports.updateSections=async (req,res)=>{
    try{
        //fetching data
        const {sectionName,sectionId,courseId}=req.body;

        //applying validation checks
        if(!sectionId || !sectionName)
        {
            return res.status(400).json({
                success:false,
                message:"Please enter all fields carefully"
            });
        }

        const existedSection=await Section.findById(sectionId);

        if(!existedSection){
            return res.status(404).json({
                success:false,
                message:"Section not found, Please enter valid SectionId"
            });
        }

        //updating existing section
        
        const updatedSection=await Section.findOneAndUpdate({_id:sectionId},{sectionName:sectionName},{new:true});

        const course=await Courses.findById(courseId)
                        .populate({
                            path:"courseContent",
                            populate:{
                                path:"subSection"
                            }
                        }).exec();

        //returning res
        res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:course
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while updating section",
            error:error.message
        });
    }
}


//handler function to delete sections

exports.deleteSection=async (req,res)=>{
    try{
        //fetching data
        const {sectionId,courseId}=req.body;

        //applying validation checks
        if(!sectionId || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Section id or CourseID not found"
            });
        }

        const existedSection=await Section.findById(sectionId);

        if(!existedSection){
            return res.status(404).json({
                success:false,
                message:"Section not found, Please enter valid SectionId"
            });
        }

        //deleting existing section from Section and courses schema
        await Courses.findOneAndUpdate({_id:existedSection.course},{$pull:{courseContent:sectionId}});

        //delete subsection
        await SubSection.deleteMany({_id: {$in:existedSection.SubSection}});

        //finding the updated course
        const course=await Courses.findById(courseId)
                     .populate({
                        path:"courseContent",
                        populate:{
                            path:"subSection"
                        }
                     }).exec();

        await Section.findByIdAndDelete(sectionId);

        //returning res
        res.status(200).json({
            success:true,
            message:"Section deleted successfully", 
            data:course           
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while deleting section",
            error:error.message
        });
    }
}