import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BsFillCaretRightFill} from "react-icons/bs";
import {FaShareSquare} from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {ACCOUNT_TYPE} from "../../../utils/constants";
import { addToCart } from '../../../redux/slices/cartSlice';


export const CoursePageCard = ({courseData,setConfirmationModal,handleBuyCourse}) => {

    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();

    const handleShare=()=>{
        copy(window.location.href);
        toast.success("Link Copied To Clipboard");    
    }

    const handleAddToCart=()=>{
        if(user && user.accountType=== ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor. You can't buy a course. ")
            return;
        }
        if(token){
            dispatch(addToCart(courseData))
            return;
        }
    }

    // console.log("PRINTING COURSE DATA IN COURSE PAGE CARD COMPONENT :", courseData)

  return (
    <div>
        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
            <div>
                <img
                    src={courseData?.thumbnail}
                    alt='course-thumbnail'
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />
            </div>
            <div className='px-4'>
                <p  className="space-x-3 pb-4 text-3xl font-semibold">Rs. {courseData?.price}</p>

                <div className="flex flex-col gap-4">
                    <button
                        className='yellowButton'
                        onClick={
                            user && courseData?.studentsEnrolled?.includes(user?._id)
                              ? () => navigate("/dashboard/enrolled-courses")
                              : handleBuyCourse
                          }
                    >
                        {
                            courseData?.studentsEnrolled?.includes(user?._id)?
                            "Go To Course":
                            "Buy Course"
                        }
                    </button>
                    {
                        (!user || !courseData?.studentsEnrolled?.includes(user?._id)) &&
                        (
                            <button
                                className='blackButton'
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>
                        )
                    }
                </div>

                <div>
                    <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                        30-Day Money-Back Guarantee
                    </p>
                </div>

                <div>
                    <p className={`my-2 text-xl font-semibold `}>
                        This Course Includes:
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                        {
                            courseData?.instructions?.map((instruction,index)=>{
                                return <p className={`flex gap-2 items-center`} key={index}>
                                    <BsFillCaretRightFill />
                                    <span>{instruction}</span>
                                </p>
                            })
                        }
                    </div>
                </div>

                <div className='text-center'>
                    <button className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                        onClick={handleShare}
                    >
                        <FaShareSquare size={15} /> Share
                    </button>
                </div>
            </div>

        </div>
    </div>
  )
}
