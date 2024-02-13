import React from 'react'
import HighlightedText from './HighlightedText'
import Button from './Button'
import TimelineSection from './TimelineSection'
import TimelineImage from "../../../assets/Images/TimelineImage.png";


function JobInDemandSection() {
  return (
    <div className='flex flex-col gap-10 w-11/12 max-w-maxContent mx-auto mt-20 mb-20'>
        {/* part 1 */}
        <div className='flex justify-between'>
            <div className='text-4xl w-[45%]'>
                Get the skills you need for a 
                <HighlightedText> job that is in demand.</HighlightedText>
            </div>
            <div className='flex flex-col gap-10 w-[40%] items-start text-[16px]'>
                <div>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <div>
                    <Button linkTo={"/signup"} active={true}>Learn More</Button>
                </div>
            </div>
        </div>

        {/* part 2 */}
        <div className='mt-10 flex justify-between'>
            <div className='W-[45%]'>
                <TimelineSection/>
            </div>           

            <div className='w-[50%] relative'>
                <div className='shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                    <img src={TimelineImage} className='shadow-[20px_20px_rgba(255,255,255)]' alt='Timeline image'/>
                </div>

                <div className='flex gap-5 w-[85%] bg-caribbeangreen-700 py-10 justify-center absolute translate-x-[10%] -translate-y-[40%]'> 
                    <div className='flex gap-10 w-[40%] items-center border-r border-caribbeangreen-300'>
                        <p className='text-white font-bold text-4xl'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>YEARS EXPERIENCES</p>
                    </div>
                    <div className='flex gap-10 w-[40%] items-center pl-5'>
                        <p className='text-white font-bold text-4xl'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>TYPES OF COURSES</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default JobInDemandSection