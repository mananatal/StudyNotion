const express=require("express");
const router=express.Router();

const {auth,isInstructor}=require("../middleware/auth");

const {
    editProfile,
    deleteAccount,
    getAllUserDetails,
    updatePhoto,
    getEnrolledCourses,
    instructorDashboard,
}=require("../controllers/Profile");

//profile routes
router.put("/updateProfile",auth,editProfile);

router.delete("/deleteProfile",auth,deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);
router.put("/updateDisplayPicture",auth,updatePhoto);

module.exports=router;