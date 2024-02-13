import React from 'react'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

function CodeBlock({heading,subHeading,button1,button2,codeblock,backgroundGradient,codeColor,position}) {
  return (
    <div className={`flex ${position} justify-between`}>
        {/*Part 1*/}
        <div className='flex flex-col w-[50%] '>
            <div className='text-4xl font-bold'>
                {heading}
            </div>
            <div className="mt-6 w-[90%] text-lg font-bold text-richblack-300">
                {subHeading}
            </div>
            <div className='flex gap-6 mt-14'>
                <Button active={button1.active} linkTo={button1.linkTo} >
                    <div className='flex gap-2 justify-center items-center'>
                        {button1.text}
                        <FaArrowRight />
                    </div>
                </Button>
                <Button active={button2.active} linkTo={button2.linkTo} >
                    {button2.text}
                </Button>
            </div>
        </div>

        {/*Part 2*/}
        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] " >

            {backgroundGradient}

            <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                <TypeAnimation
                    sequence={[
                        `${codeblock}`,
                        1000,
                        ""
                    ]}
                    repeat={Infinity}
                    cursor={true}
                    style={{whiteSpace:'pre-line',display:'block' }}
                    omitDeletionAnimation={true}
                />
                
            </div>
        </div>
    </div>
  )
}

export default CodeBlock