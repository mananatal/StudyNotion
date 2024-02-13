import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from "../../../../common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5"
import {MdNavigateNext} from "react-icons/md"
import NestedView from './NestedView';
import {setStep,setEditCourse, setCourse} from "../../../../../redux/slices/courseSlice";
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApi';



function CourseBuilderForm() {

  const {register,handleSubmit,setValue,formState:{errors}}=useForm();

  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const {course}=useSelector((state)=>state.course);

  const [editSectionName,setEditSectionName]=useState(null);
  const [loading,setLoading]=useState(false);

  const cancelEdit=()=>{
      setEditSectionName(null);
      setValue("sectionName","");
  }

  // console.log("Printing Course: ",course)

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
      if(editSectionName){
        cancelEdit();
        return;
      }
      setEditSectionName(sectionId);
      setValue("sectionName",sectionName);
  }

  const goBack=()=>{
    dispatch(setEditCourse(true));  
    dispatch(setStep(1));      
  };

  const handleFormSubmit=async (data)=>{
    setLoading(true);
    let result;

    if(editSectionName)
    {
      result=await updateSection(
         { sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,}, token
      )
    }
    else{
        result= await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          }, token
        )
    }

    if(result)
    {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }
    setLoading(false);
  }

  const goToNext=()=>{
    if(course?.courseContent?.length ===0)
    {
      toast.error("Please Add Atleast 1 Section");
      return;
    }
    else if(course?.courseContent?.some((section)=>section?.subSection?.length===0))
    {
      toast.error("Please Add Atleast 1 Subsection");
      return;
    }
    dispatch(setStep(3));
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div  className="flex flex-col space-y-2">
            <label className='label-style'>Section Name<sup className="text-pink-200">*</sup></label>
            <input
                type='text'
                name='sectionName'
                id='sectionName'
                className='form-style w-full'
                placeholder='Add a Section to build your course'
                {...register("sectionName",{required:true})}
            />
            {
              errors.sectionName && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Section name is required
                </span>
              )
            }
          </div>
          <div className="flex items-end gap-x-4">
              <IconBtn
                text={editSectionName?"Edit Section Name":"Create Section"}
                disabled={loading}
                outline={true}
                type={"submit"}
              >
                  <IoAddCircleOutline size={20} className="text-yellow-50" />
              </IconBtn>
              {
                editSectionName && (
                  <button
                    type='button'
                    className="text-sm text-richblack-300 underline"
                    onClick={cancelEdit}
                  >
                    Cancel Edit
                  </button>
                )
              }
          </div>
        </form>
        {
          course?.courseContent?.length>0 && (
            <NestedView  handleChangeEditSectionName={handleChangeEditSectionName}  />
          )
        }
        <div className="flex justify-end gap-x-3"> 
          <button
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            onClick={goBack}
          >
            Back
          </button>
          <IconBtn
            text={"Next"}
            disabled={loading}
            onclick={goToNext}
          >
              <MdNavigateNext />
          </IconBtn>
        </div>


    </div>
  )
}

export default CourseBuilderForm