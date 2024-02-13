import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsApi';
import { setCourse, setEditCourse } from '../../../../redux/slices/courseSlice';
import RenderSteps from "../addCourse/RenderSteps"

const EditCourse = () => {

    const {courseId}=useParams();
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {token}=useSelector((state)=>state.auth);
    const {course}=useSelector((state)=>state.course)

    const fetchFullDetailsOfCourse=async ()=>{
        setLoading(true);
        try{
            const result=await getFullDetailsOfCourse(courseId,token);

            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
        }catch(error){
            console.log("Error while fetching instructor course for editing; ",error)
        }

        setLoading(false);
    }

    useEffect(()=>{
        fetchFullDetailsOfCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);



    if(loading){
        return <div className='grid place-items-center'>
            <div className='spinner'></div>
        </div>
    }


  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Course
        </h1>
        <div className="mx-auto max-w-[600px]">
        {
        course ? 
        (
          <RenderSteps />
        ) :
         (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}

export default EditCourse