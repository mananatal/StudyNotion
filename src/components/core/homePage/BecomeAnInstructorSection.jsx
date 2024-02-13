import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighlightedText from './HighlightedText'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa6";

function BecomeAnInstructorSection() {
  return (
    <div className='flex flex-col gap-8 w-11/12 max-w-maxContent mx-auto mt-20 mb-8 items-center justify-center'>
        <div className='flex items-center gap-20'>
            <div className='shadow-[-20px_-20px_rgba(255,255,255)]'>
                <img src={InstructorImage} alt='instructorImage'/>
            </div>
            <div className='flex flex-col gap-6 items-start w-[40%]'>
                <h2 className='text-4xl text-white font-semibold w-[40%]'>Become an <HighlightedText>instructor</HighlightedText></h2>
                <p className='text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                <Button linkTo={"/signup"} active={true}>
                    <div className='flex gap-2 justify-center items-center'>
                        Start Teaching Today
                        <FaArrowRight />
                    </div>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default BecomeAnInstructorSection