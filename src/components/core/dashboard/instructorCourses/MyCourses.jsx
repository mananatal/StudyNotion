import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import CourseTable from './CourseTable';

const MyCourses = () => {

    const [instructorCourses,setInstructorCourses]=useState([]);
    const {token}=useSelector((state)=>state.auth);;
    const navigate=useNavigate();

    const fetchInstructorCourse=async ()=>{
        try{
            const response=await fetchInstructorCourses(token);
            if(response){
                setInstructorCourses(response);
            }
        }catch(error){
            console.log("Error while fetching instructor courses in frontend: ",error)
        }
    }

    useEffect(()=>{
        fetchInstructorCourse();
    },[]);

  

  return (
    <div>
        <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
            <IconBtn
                text="Add Course"
                onclick={() => navigate("/dashboard/add-course")}
            >
                <VscAdd />
            </IconBtn>
      </div>
      {
        instructorCourses && <CourseTable instructorCourses={instructorCourses} setInstructorCourses={setInstructorCourses}/>
      }
    </div>
  )
}

export default MyCourses