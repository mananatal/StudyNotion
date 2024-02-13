import React, { useState } from 'react'
import HighlightedText from './HighlightedText'
import {HomePageExplore} from "../../../data/homepage-explore";
import CourseCard from './CourseCard';

const data=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

function ExploreMoreSection() {

    const [currentTab,setCurrentTab]=useState(data[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currCard,setCurrCard]=useState(HomePageExplore[0].courses[0].heading);

    function setElement(value){
        setCurrentTab(value);
        const result=HomePageExplore.filter((element)=>element.tag===value);        
        setCourses(result[0].courses);
        setCurrCard(result[0].courses[0].heading);
    }


  return (
    <div className='  flex flex-col items-center justify-center gap-1 max-w-maxContent mx-auto mt-20 mb-20'>
        
        <div className='text-4xl font-semibold '>
            Unlock the  
            <HighlightedText> Power of Code</HighlightedText>
        </div>

        <p className=" w-[90%] text-center text-lg font-bold text-richblack-300">Learn to Build Anything You Can Imagine</p>

        {/* tabs section */}
        <div className="hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium       drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
            {
                data.map((element,index)=>{
                    return(
                        <div 
                        className={` text-[16px] flex flex-row items-center gap-2 ${
                            currentTab === element
                              ? "bg-richblack-900 text-richblack-5 font-medium"
                              : "text-richblack-200"
                          } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                        key={index}
                        onClick={()=>setElement(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className="hidden lg:block lg:h-[130px]"></div>
        {/* cards section */}
        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currCard}
              setCurrentCard={setCurrCard}
            />
          );
        })}
      </div>


    </div>
  )
}

export default ExploreMoreSection