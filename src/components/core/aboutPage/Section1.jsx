import React from 'react'
import HighlightedText from "../homePage/HighlightedText"
import image1 from "../../../assets/Images/aboutus1.webp"
import image2 from "../../../assets/Images/aboutus2.webp"
import image3 from "../../../assets/Images/aboutus3.webp"

function Section1() {
  return (
    <section className='relative flex flex-col w-11/12 max-w-maxContent mx-auto items-center justify-center pt-[80px] pb-[280px]'>
        <h2 className='text-4xl font-semibold text-white lg:w-[70%] text-center'>
            Driving Innovation in Online Education for a <HighlightedText>Brighter Future</HighlightedText>
        </h2>
        <p className='lg:w-[70%] text-center text-richblack-300 \ font-medium mt-3 mx-auto leading-6 text-lg'>
            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
        </p>

        <div className='flex gap-10 mt-12 absolute top-[260px]'>
            <img src={image1} alt='img'/>
            <img src={image2} alt='img'/>
            <img src={image3} alt='img'/>
        </div>

       
    </section>
  )
}

export default Section1