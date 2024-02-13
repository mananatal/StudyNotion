import React from 'react'
import Section1 from '../components/core/aboutPage/Section1'
import Section2 from '../components/core/aboutPage/Section2'
import Section3 from '../components/core/aboutPage/Section3'
import LearningGrid from '../components/core/aboutPage/LearningGrid'
import Footer from "../components/common/footer/Footer"
import ContactSection from '../components/core/aboutPage/ContactSection'

function About() {
  return (
    <div className=''>
        {/* Section 1 */}
        <div className='bg-richblack-700 relative'>
            <Section1/>           
        </div>

        {/* Section 2 */}
        <div className='mt-[160px]  '>
            <Section2/>
        </div>

        {/* section 3 */}
        <div className='mt-2'>
            <Section3/>
        </div>

        {/* section4 */}
        <div className='w-11/12 max-w-maxContent mx-auto mt-20'>
            <LearningGrid/>
        </div>

        {/* contact form */}.
        <div className='w-11/12 max-w-maxContent mx-auto'>
            <ContactSection/>
        </div>

        {/* Footer */}
        <div className='bg-richblack-800'>
            <Footer/>
        </div>

    </div>
  )
}

export default About