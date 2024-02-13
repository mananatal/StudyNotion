const express=require("express");
const router=express.Router();

const {auth,isInstructor,isAdmin,isStudent}=require("../middleware/auth");

//course controller import
const {
        getCourses,
        createCourse,
        getInstructorCourses,
        editCourse,
        getFullCourseDetails,
        getCourseDetails
}=require("../controllers/Course");

//category controllers import
const {
    getCategories,
    categoryPageDetails,
    setCategory
}=require("../controllers/Category");

//sections controllers import
const {
    deleteSection,
    updateSections,
    createSection
}=require("../controllers/Section");

//subsections controller import
const {
    deleteSubSection,
    updateSubSection,
    createSubSection
}=require("../controllers/SubSection");

//rating controllers import
const {
    getAllRating,
    getAverageRating,
    createRating
}=require("../controllers/RatingAndReview");

const {
    updateCourseProgress
  } = require("../controllers/CourseProgress");
  

//courses routes

//course can only be created by instructors
router.post("/createCourse",auth,isInstructor,createCourse);
//add section
router.post("/addSection",auth,isInstructor,createSection);
//update section
router.post("/updateSection",auth,isInstructor,updateSections);
//delete section
router.post("/deleteSection",auth,isInstructor,deleteSection);
//add a subsection
router.post("/addSubSection",auth,isInstructor,createSubSection);
// edit a subsection
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
//delete a subsection
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
//get all registered courses
router.get("/getAllCourses",getCourses);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);



//category page routes
//category can only be created by admin
router.post("/createCategory",auth,isAdmin,setCategory);
router.get("/showAllCategories",getCategories);
router.post("/categoryPageDetails",categoryPageDetails);


//rating and review routes
router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("getReviews",getAllRating);

module.exports=router;