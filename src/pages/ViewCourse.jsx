import React, { useEffect, useState } from 'react'
import { VideoDetailsSidebar } from '../components/core/viewCourse/VideoDetailsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsApi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/slices/viewCourseSlice';
import {CourseReviewModal} from "../components/core/viewCourse/CourseReviewModal"

export const ViewCourse = () => {

    const {token}=useSelector((state)=>state.auth);
    const {courseId}=useParams();
    const dispatch=useDispatch();
    const [reviewModal,setReviewModal]=useState(false);

    const fetchFullCOurseDetails=async ()=>{
        try{
            const res=await getFullDetailsOfCourse(courseId,token);
            // console.log("RESPONSE OF GET FULL COURSE DETAIL API: ",res.courseDetails.courseContent);
            dispatch(setEntireCourseData(res.courseDetails));
            dispatch(setCompletedLectures(res.completedVideos));
            dispatch(setCourseSectionData(res.courseDetails.courseContent))

            let lectures=0;
            res?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures+=sec?.subSection.length
            })            
            dispatch(setTotalNoOfLectures(lectures));
        }catch(error){
            console.log("ERROR WHILE FETCHING FULL COURES DETAILS IN VIEWCOURSE COMPONENT ",error)
        }
    }

    useEffect(()=>{
        fetchFullCOurseDetails();
   },[])


  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
                    <Outlet/>
                </div>
            </div>
        </div>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
        }
    </>
  )
}
