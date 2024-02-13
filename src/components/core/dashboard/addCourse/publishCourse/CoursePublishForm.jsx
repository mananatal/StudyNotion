  import React, { useEffect, useState } from 'react'
  import { useForm } from 'react-hook-form'
  import IconBtn from '../../../../common/IconBtn';
  import { useDispatch, useSelector } from 'react-redux';
  import { resetCourseState, setStep } from '../../../../../redux/slices/courseSlice';
  import {COURSE_STATUS} from "../../../../../utils/constants";
  import { useNavigate } from 'react-router-dom';
  import { editCourseDetails } from '../../../../../services/operations/courseDetailsApi';


  function CoursePublishForm() {

    const {register,handleSubmit,setValue,getValues}=useForm();
    const {token}=useSelector((state)=>state.auth);
    const {course}=useSelector((state)=>state.course);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED){
          setValue("public",true);
        }
    },[])

    const goToCourses=()=>{
          dispatch(resetCourseState());
          navigate("/dashboard/my-courses");
    }

    const handleCoursePublish= async ()=>{
        //check whether form is updated or not
        if(
             (course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true) ||
             (course?.status===COURSE_STATUS.DRAFT && getValues("public")===false)){
                goToCourses();
                return;
        }

        const formData=new FormData();
        formData.append("courseId",course?._id);
        const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus);
        
        setLoading(true);
        const result = await editCourseDetails(formData, token)
        if (result) {
          goToCourses()
        }
        setLoading(false)
        

    }

    const handleCourseSubmit=(data)=>{
          handleCoursePublish();
    }


    const goBack=()=>{
        dispatch(setStep(2));
    }
    
    

    return (
      <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>
        <form onSubmit={handleSubmit(handleCourseSubmit)}>
            <div className="my-6 mb-8">
              <label htmlFor="public" className="inline-flex items-center text-lg">
                <input
                  type='checkbox'
                  name='public'
                  id='public'
                  {...register("public")}
                  className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                />
                <span className="ml-2 text-richblack-400">
                  Make this course as public
                </span>
              </label>
            </div>
            <div className="ml-auto flex max-w-max items-center gap-x-4">
                <button 
                  disabled={loading}
                  type='button'
                  onClick={goBack}
                  className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                >
                  Back
                </button>
                <IconBtn
                  text={"Save Changes"}
                  disabled={loading}                  
                >            
                </IconBtn>
            </div>
        </form>
        
      </div>
    )
  }

  export default CoursePublishForm