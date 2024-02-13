import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import HighlightedText from '../components/core/homePage/HighlightedText';
import Button from '../components/core/homePage/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from '../components/core/homePage/CodeBlock';
import ExploreFullCatalog from '../components/core/homePage/ExploreFullCatalog';
import JobInDemandSection from '../components/core/homePage/JobInDemandSection';
import LearningAnyLanguageSection from '../components/core/homePage/LearningAnyLanguageSection';
import BecomeAnInstructorSection from '../components/core/homePage/BecomeAnInstructorSection';
import Footer from '../components/common/footer/Footer';
import ExploreMoreSection from '../components/core/homePage/ExploreMoreSection';


function Home() {
    console.log("TEST PRINT",process.env.REACT_APP_RAZORPAY_KEY_ID)
  return (
    <div>
         {/*section 1*/}
         <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
            {/*Part 1*/}
                <div >
                   <Link to={"/signup"}>
                        <div  className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200   drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95   hover:drop-shadow-none">
                            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                                Become an Instructor
                                <FaArrowRight />
                            </div>                            
                        </div>
                   </Link> 

                   {/*Heading Part*/}
                   <div className='text-4xl mt-6 font-semibold text-center'>
                        Empower Your Future with <HighlightedText>Coding Skills</HighlightedText>
                   </div>

                   {/*Description Part*/}
                   <div className="mt-6 w-[90%] text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a  wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.   
                   </div>

                   {/* Button part*/}
                   <div className='flex flex-row gap-10 justify-center mt-14'>
                        <Button linkTo={"/signup"} active={true} >Learn More</Button>
                        <Button linkTo={"/login"}  >Book a Demo</Button>
                   </div>
                </div>

            {/*Part 2: Video Part*/}
                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video
                        muted
                        loop
                        autoPlay
                        className="shadow-[20px_20px_rgba(255,255,255)]"
                    >
                        <source src={Banner}></source>
                    </video>
                </div>

            {/*Part 3 Codeblock*/}
                <div className='mt-16 '>
                    <CodeBlock
                        heading={<div>
                            Unlock your <HighlightedText>coding potential</HighlightedText> with our online courses.
                        </div>}
                        subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        button1={{
                            linkTo:"/login",
                            active:true,
                            text:"Try it Yourself"
                        }}
                        button2={{
                            linkTo:"/signup",
                            active:false,
                            text:"Learn More"
                        }}
                        position={"flex-row"}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n <a href="/one">One</a> \n</nav>\n</body>`}
                        codeColor={"text-yellow-25"}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>
            
            {/*Part 4 codeblock*/}
               <div className='mt-40'>
                <CodeBlock
                    heading={<div>
                       Start  <HighlightedText>coding in <br/>seconds</HighlightedText> 
                    </div>}
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    button1={{
                        linkTo:"/login",
                        active:true,
                        text:"Continue Lesson"
                    }}
                    button2={{
                        linkTo:"/signup",
                        active:false,
                        text:"Learn More"
                    }}
                    position={"flex-row-reverse"}                   
                    backgroundGradient={<div className="codeblock2 "></div>}
                    codeColor={"text-white"}
                    codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                />
               </div>    

            {/*Explore More*/}
                <div>
                    <ExploreMoreSection/>
                </div>
         </div>

         {/* section 2 */}
         <div className='flex flex-col bg-pure-greys-5 text-richblack-700 font-inter'>
             <ExploreFullCatalog/>
             <JobInDemandSection/>
             <LearningAnyLanguageSection/>
         </div>

         {/* Section 3 */}
         <div>
            <BecomeAnInstructorSection/>    
         </div>

         {/* section 4 (footer) */}
         <div className='bg-richblack-800'>
            <Footer/>
         </div>
    </div>
  )
}

export default Home