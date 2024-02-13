import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import {courseEndpoints} from "../services/apis";
import { formatDate } from '../services/operations/formatDate';
import {HiOutlineGlobeAlt} from "react-icons/hi"
import {BiInfoCircle} from "react-icons/bi"
import { CoursePageCard } from '../components/core/coursePage/CoursePageCard';
import ConfirmationModal from "../components/common/ConfirmationModal"
import GetAvgRating from "../utils/avgRating"
import RatingStars from "../components/common/RatingStars"
import { CourseAccordianBar } from '../components/core/coursePage/CourseAccordianBar';
import Footer from '../components/common/footer/Footer';
import { buyCourse } from '../services/operations/PaymentApi';



export const CoursePage = () => {

    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const {courseId}=useParams();
    const [courseDetail,setCourseDetail]=useState(null);
    const [timeDuration,setTimeDuration]=useState(null);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const [totalNoOfLectures,setTotalNoOfLectures]=useState(0);
    const [active,setActive]=useState(Array(0));
    const {paymentLoading}=useSelector((state)=>state.course);
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    
    const handleActive=(id)=>{
        setActive(
            !active.includes(id)
              ? active.concat([id])
              : active.filter((e) => e !== id)
          )
    }

     // Calculating Avg Review count
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
        const count = GetAvgRating(courseDetail?.ratingAndReviews)
        setAvgReviewCount(count)
    }, [courseDetail])


    const fetchCourseDetail=async()=>{
        try{    
            const response=await apiConnector("POST",courseEndpoints.COURSE_DETAILS_API,{courseId:courseId});     
            setCourseDetail(response?.data?.data?.courseDetails);
            setTimeDuration(response?.data?.data?.totalDuration);      
        }catch(error){
            console.log("ERROR WHILE FETCHING COURSE DETAILS IN COURSE PAGE: ",error);
        }
    }

    useEffect(()=>{
        fetchCourseDetail();
        // eslint-disable-next-line
    },[courseId])

    useEffect(()=>{
        let lecture=0;
        courseDetail?.courseContent?.forEach((section)=>{
            lecture+=section?.subSection?.length ||0;
        })
        setTotalNoOfLectures(lecture);
    },[courseDetail])

    const handleBuyCourse=()=>{
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1text: "Login",
            btn2text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
          })
    }

    if (paymentLoading) {
        // console.log("payment loading")
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

  return (
    <>
        <div  className={`relative w-full bg-richblack-800`}>
            <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

                    <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img
                                src={courseDetail?.thumbnail}
                                alt="course thumbnail"
                                className="aspect-auto w-full"
                            />
                    </div>
                    
                    <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
                        <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseDetail?.courseName}</p>
                        <p className={`text-richblack-200`}>{courseDetail?.courseDescription}</p>
                        
                        <div className="text-md flex flex-wrap items-center gap-2">
                          <span className="text-yellow-25">{avgReviewCount}</span>
                          <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                          <span>{`(${courseDetail?.ratingAndReviews.length} reviews)`}</span>
                          <span>{`${courseDetail?.studentsEnrolled.length} students enrolled`}</span>
                        </div>

                        <p>Created By {courseDetail?.instructor?.firstName} {courseDetail?.instructor?.lastName}</p>
                        <div  className="flex flex-wrap gap-5 text-lg">
                            <p className="flex items-center gap-2">
                                <BiInfoCircle /> Created At {formatDate(courseDetail?.createdAt)}
                            </p>
                            <p className="flex items-center gap-2">
                                <HiOutlineGlobeAlt /> English
                            </p>
                        </div>
                    </div>

                    {/* course card */}
                    <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24             md:translate-y-0 lg:absolute  lg:block">
                        <CoursePageCard setConfirmationModal={setConfirmationModal} courseData={courseDetail} handleBuyCourse={handleBuyCourse}/>
                    </div>
                </div>
            </div>
        </div>

        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
            <div div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                {/* what you will learn */}
                <div className="my-8 border border-richblack-600 p-8">
                    <p className="text-3xl font-semibold">What you'll learn</p>
                    <div className="mt-5">
                        <p>{courseDetail?.whatYouWillLearn}</p>
                    </div>
                </div>

                {/* course content section */}
                <div className="max-w-[830px] ">
                    <div className="flex flex-col gap-3">
                        <p className="text-[28px] font-semibold">Course Content</p>
                        <div className="flex flex-wrap justify-between gap-2">
                            <div className='flex gap-3'>
                                <span>
                                    {courseDetail?.courseContent.length} Section(s)
                                </span>
                                <span>
                                    {totalNoOfLectures} lecture(s)
                                </span>
                                <span>
                                    {timeDuration} total length 
                                </span>
                            </div>  
                            <button  className="text-yellow-25"
                                onClick={()=>setActive([])}
                            >   
                                Collapse All Sections
                            </button>
                        </div>
                        
                       
                        {/* course accordian section */}
                        <div>
                            {
                                courseDetail?.courseContent?.map((section,index)=>{
                                    return <CourseAccordianBar
                                        key={index}
                                        course={section}
                                        isActive={active}
                                        handleActive={handleActive}
                                    />
                                })
                            }
                        </div>

                        {/* author details */}
                        <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                <img 
                                    src={
                                        courseDetail?.instructor?.image
                                        ?  courseDetail?.instructor?.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${courseDetail?.instructor.firstName} ${ courseDetail?.instructor.lastName}`
                                    }
                                    alt="author-imag"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{courseDetail?.instructor.firstName} {courseDetail?.instructor.lastName}</p>
                            </div>
                                <p className="text-richblack-50">
                                    {courseDetail?.instructor?.additionalDetails?.about}
                                </p>

                        </div>

                    </div>
                </div>

            </div>
        </div>
        <div className='bg-richblack-800'>
            <Footer/>
        </div>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }                            
    </>
  )
}
