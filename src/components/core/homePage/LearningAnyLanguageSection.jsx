import React from 'react'
import HighlightedText from './HighlightedText'
import KnowYourProgress from "../../../assets/Images/Know_your_progress.png";
import CompareWithOthers from "../../../assets/Images/Compare_with_others.png";
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import Button from "./Button";


function LearningAnyLanguageSection() {
  return ( 
    <div className='flex flex-col gap-8 w-11/12 max-w-maxContent mx-auto mt-20 mb-8 items-center justify-center'>
       
        <div className='flex flex-col gap-3 mx-auto items-center'>
            <h2 className='text-4xl font-semibold'>Your swiss knife for <HighlightedText>learning any language</HighlightedText></h2>
            <p className='w-[80%] text-center leading-6 text-richblack-600'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
        <div className='flex items-center justify-center relative'>
            <img src={KnowYourProgress} alt='img'  className='translate-x-32'/>
            <img src={CompareWithOthers} alt='img' className='relative'/>
            <img src={PlanYourLessons} alt='img' className='-translate-x-36' />
        </div>
        <div className='-translate-y-10'>
          <Button linkTo={"/signup"} active={true}>Learn More</Button>
        </div>
    </div>
  )
}

export default LearningAnyLanguageSection