import React from 'react'
import RedText from './RedText'
import ourStoryImage from "../../../assets/Images/FoundingStory.png"
import OrangeText from './OrangeText'
import HighlightedText from '../homePage/HighlightedText'
import StatsComponenet from './StatsComponent'

function Section3() {
  return (
    <section >
        <div className='flex flex-col items-center justify-center w-11/12 max-w-maxContent mx-auto '>
            {/* our founding story */}
            <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            {/* content div */}
                 <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                    <h2><RedText>Our Founding Story</RedText></h2>
                    <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education  systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>

                {/* imagediv */}
                <div>
                    <img src={ourStoryImage} alt="img" 
                        className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                    />
                </div>
            </div>

            {/* our vission and mission div */}
            <div className="flex flex-col items-center gap-10 lg:flex-row justify-between mt-16">
                 {/* our vission div */}
                <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                <h2><OrangeText>Our Vision</OrangeText></h2>
                <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>
                
               
                </div>
            
                {/* our Mission div */}
                <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                    <h2 className='text-4xl'><HighlightedText>Our Mission</HighlightedText></h2>
                    <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.               
                </p>              
            </div>

            </div>

        </div>
        
        {/* stats section */}
        <div>
            <StatsComponenet/>
        </div>
    </section>
  )
}

export default Section3