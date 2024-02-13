
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {courseEndpoints} from "../apis";


const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
  } = courseEndpoints;


  export async function getCourseCategory()
  {
        let result=[];
        try{
            const response=await apiConnector("GET",COURSE_CATEGORIES_API);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result=response.data.allCategory;

        }catch(error){
            console.log("ERROR while fetching categories in Frontend: ",error);
            toast.error("Category not found");
        }   
        return result;
  }

  export async function addCourseDetails(data,token)
  { 
        let result=null;
        const toastId=toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", CREATE_COURSE_API, data, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            if (!response?.data?.success) {
                throw new Error("Could Not Add Course Details")
            }
            toast.success("Course Details Added Successfully")
            result = response?.data?.data;

        }catch(error){
            console.log("CREATE COURSE API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
  }

  export async function createSection(data,token){
    let result=null;
    const toastId=toast.loading("Loading...");
    try{
        const response=await apiConnector("POST",CREATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Course Section Created")
        result=response?.data?.data;

    }catch(error){
        console.log("CREATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
  }


  export async function updateSection(data,token){
    let result=null;
    const toastId=toast.loading("Loading...");
    try{
        const response=await apiConnector("POST",UPDATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Course Section Updated")
        result=response?.data?.data;

    }catch(error){
        console.log("Update SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
  }

  export async function deleteSection(data,token){
    let result=null;
    const toastId=toast.loading("Deleting...");
    try{
        const response=await apiConnector("POST",DELETE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Course Section Deleted")
        result=response?.data?.data;

    }catch(error){
        console.log("DELETE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
  }

export async function updateSubSection(data, token){
    let result=null;
    const toastId=toast.loading("Updating...");
    try{
        const response=await apiConnector("POST",UPDATE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Course SubSection Updated")
        result=response?.data?.data;

    }catch(error){
        console.log("Update subSECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export async function createSubSection(data, token)
{
    let result=null;
    const toastId=toast.loading("Creating...");
    try{
        const response=await apiConnector("POST",CREATE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Lecture added")
        result=response?.data?.data;

    }catch(error){
        console.log("Create SubSECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteSubSection(data,token){
    let result=null;
    const toastId=toast.loading("Deleting...");
    try{
        const response=await apiConnector("POST",DELETE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Lecture Deleted")
        result=response?.data?.data;

    }catch(error){
        console.log("DELETE SubSECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export async function editCourseDetails(data,token){
    let result=null;
    const toastId=toast.loading("Loading...");
    try{
        const response=await apiConnector("POST",EDIT_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Course Edited Successfully")
        result=response?.data?.data;

    }catch(error){
        console.log("EditCourse API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;    
}

export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_INSTRUCTOR_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
     
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

// delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      })
      
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }
  
// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        {
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId) 
    return result
  }
  

  export const markLectureAsComplete = async (data, token) => {
    let result = null
    // console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      // console.log(
      //   "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      //   response
      // )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }
  
// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}

