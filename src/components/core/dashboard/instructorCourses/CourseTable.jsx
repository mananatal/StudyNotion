import React ,{useState} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from '../../../../services/operations/formatDate';
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import {COURSE_STATUS} from "../../../../utils/constants"
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useSelector } from 'react-redux';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';


const TRUNCATE_LENGTH = 30

const CourseTable = ({setInstructorCourses,instructorCourses}) => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const [confirmationModal,setConfirmationModal]=useState(null);
  const {token}=useSelector((state)=>state.auth)
  
  const handleCourseDelete=async(courseId)=>{
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
        setInstructorCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }



  return (
    <>
        <Table className="rounded-xl border border-richblack-800 ">
            <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                        Courses
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Duration
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    instructorCourses.length===0 ?
                    (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No Courses Found
                            </Td>
                        </Tr>
                    )
                    :
                    (                        
                            instructorCourses.map((course)=>{
                                return <Tr key={course._id}>
                                    <Td className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                                        <img
                                            src={course?.thumbnail}
                                            alt={course?.courseName}
                                            className="h-[148px] w-[220px] rounded-lg object-cover"
                                        />
                                        <div className="flex flex-col justify-between"> 
                                            <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                            <p  className="text-xs text-richblack-300">
                                                {
                                                    course.courseDescription.split(" ").length>TRUNCATE_LENGTH
                                                    ?
                                                    course.courseDescription.split(" ").slice(0,TRUNCATE_LENGTH).join(' ')+"..."
                                                    :
                                                    course.courseDescription
                                                }
                                            </p>
                                            <p className="text-[12px] text-white">
                                                createdAt: {formatDate(course.createdAt)}
                                            </p>
                                            {course.status === COURSE_STATUS.DRAFT ? (
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                    <HiClock size={14} />
                                                    Drafted
                                                </p>
                                            ) : (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                    <FaCheck size={8} />
                                                </div>
                                                Published
                                            </p>
                                            )}
                                        </div>
                                    </Td>
                                    <Td className="text-sm font-medium text-richblack-100">
                                        2hr 30min
                                    </Td>
                                    <Td className="text-sm font-medium text-richblack-100">
                                        ₹{course.price}
                                    </Td>
                                    <Td className="text-sm font-medium text-richblack-100 ">
                                        <button
                                            disabled={loading}
                                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                            title='Edit'
                                            onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                                        >
                                            <FiEdit2 size={20} />
                                        </button>
                                        <button
                                            disabled={loading}
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                            title='Delete'
                                            onClick={()=>{
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2:
                                                      "All the data related to this course will be deleted",
                                                    btn1text: !loading ? "Delete" : "Loading...  ",
                                                    btn2text: "Cancel",
                                                    btn1Handler: !loading
                                                      ? () => handleCourseDelete(course._id)
                                                      : () => {},
                                                    btn2Handler: !loading
                                                      ? () => setConfirmationModal(null)
                                                      : () => {},
                                                  })
                                            }}
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </Td>
                                </Tr>
                            })                        
                    )
                }
            </Tbody>
        </Table>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </>
  )
}

export default CourseTable