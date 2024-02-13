import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";



const Timeline=[
    {
        Logo: Logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        Logo: Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    }
]


function TimelineSection() {
  return (
    <div>
        {
            Timeline.map((element,index)=>{
                return(
                    <div className=' flex-col  ' key={index}>
                        <div className='flex flex-col items-start gap-8'>
                            <div className='flex flex-row gap-3 items-center'>
                                <div className='h-[52px] w-[52px] bg-white rounded-full flex items-center justify-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                    <img src={element.Logo} alt='logo' />
                                </div>
                                <div className='flex flex-col '>
                                    <h2 className='font-bold text-lg'>{element.heading}</h2>
                                    <p className='text-base'>{element.description}</p>
                                </div>
                            </div>
                            {                                
                                (index<3)?<div className='hidden lg:block  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 
                                w-[26px] mb-4 -mt-4'></div>:<div></div>
                            }
                        </div>
                    </div>
                );
            })
        }
    </div>
  )
}

export default TimelineSection