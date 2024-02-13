const {instance}=require("../config/Razorpay");
const User=require("../models/User");
const Courses=require("../models/Courses");
const {mailSender}=require("../utils/mailSender");
const crypto=require("crypto")
const mongoose=require("mongoose");
const CourseProgress=require("../models/CourseProgress")
const {
    courseEnrollmentEmail
  } = require("../mail/templates/courseEnrollmentEmail")

const {paymentSuccessEmail}=require("../mail/templates/paymentSuccessEmail")
require("dotenv").config();

//handler function to capture payments
exports.capturePayment=async (req,res)=>{
    //get course id and user id
    const {courses}=req.body;
    const userId=req.body.user.id;
  
    //validation
    //valid course id
    if(courses.length===0){
        return res.json({
            success:false,
            message:"CourseId not found,Please provide some course id"
        });
    }
    
    let total_amount=0;

    for(const course_id of courses){
        let course;

        try{
            //finding course by its id
            course=await Courses.findById(course_id);

            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"could not find the course",

                });
            }

            //checking user already enrolled in the course or not
            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"User already enrolled in the course"
                });
            }

            //add the price to the total price
            total_amount+=course.price;


        }catch(error){
            res.status(500).json({
                success:false,
                error:error.message
            });
        }
    }

    //order create    

    const options={
        amount:total_amount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try{
        //initialise payments using razorpay
        const paymentResponse=await instance.orders.create(options);

     

        return res.status(200).json({
            success:true,
            data:paymentResponse
        });
    }catch(error){
        console.log("ERROR IN CAPTURE PAYMENT: ",error)
        res.json({
            success:false,
            message:"could not initiate order",
            error:error.message
        });
    }
       
}

//verify signature of razorpay and server

exports.verifyPayment=async (req,res)=>{

    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId=req.body.user.id;

    if(
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ){
        return res.status(200).json({ success: false, message: "Payment Failed" })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex")

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res)
        return res.status(200).json({ success: true, message: "Payment Verified" })
      }

    
  return res.status(200).json({ success: false, message: "Payment Failed" })
}


//send payment success mail
exports.sendPaymentSuccessEmail=async (req,res)=>{
    const {orderId,paymentId,amount}=req.body;
    const userId=req.body.user.id;
    
    if (!orderId || !paymentId || !amount || !userId) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide all the details" })
    }

    try{
        const enrolledStudent=await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            "Payment Recieved",
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,
                orderId,
                paymentId
            )
        )
    }catch(error){
        console.log("error in sending mail", error)
        return res
          .status(400)
          .json({ success: false, message: "Could not send email" })      
    }
}

//enroll students in the coursees
const enrollStudents=async(courses,userId,res)=>{
    
    if(!courses || !userId){
        return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }

    for(const courseId of courses){
        try{
            //find the course and enroll students in it
            const enrolledCourse=await Courses.findOneAndUpdate(
                {_id:courseId},
                {
                    $push:{
                        studentsEnrolled:userId
                    }
                },
                {new:true}
            );
            
            if (!enrolledCourse) {
                return res
                  .status(500)
                  .json({ success: false, error: "Course not found" })
            }

            const courseProgress=await CourseProgress.create({
                course:courseId,
                userId:userId,
                completedVideos:[]
            });

            //now adding courses in student courses section

            const enrolledStudent=await User.findOneAndUpdate(
                {_id:userId},
                {
                    $push:{
                        courses:courseId,
                        courseProgress:courseProgress._id,
                    }
                },
                {new:true}
            );

            //send a email notification to the enrolled student
            await mailSender(
                enrollStudents.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            )


        }catch(error){
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}