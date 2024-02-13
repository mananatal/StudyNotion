import React from 'react'
import {FooterLink2} from "../../../data/footer-links";
import Logo from "../../../assets/Logo/Logo-Full-Light.png"
import FooterHeadings from './FooterHeadings';
import FooterLinkSetter from './FooterLinkSetter';
import { FcLike } from "react-icons/fc";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
      
    const company=FooterLink2.filter((element)=>element.title==="Company");
    const Resources=FooterLink2.filter((element)=>element.title==="Resources");
    const Plans=FooterLink2.filter((element)=>element.title==="Plans");
    const Community=FooterLink2.filter((element)=>element.title==="Community");
    const Support=FooterLink2.filter((element)=>element.title==="Support");
    const Subjects=FooterLink2.filter((element)=>element.title==="Subjects");
    const Languages=FooterLink2.filter((element)=>element.title==="Languages");
    const CareerBuilding=FooterLink2.filter((element)=>element.title==="Career building");


  return (
    <div className='flex flex-col gap-8 w-11/12 max-w-maxContent mx-auto mt-20 items-center  pt-14'>

        <div className='grid lg:grid-cols-2 border-b border-richblack-700 pb-8'>
            {/* part 1 */}
            <div className='grid lg:grid-cols-3 gap-8  ' >
              {/* column1 */}
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center justify-center'>
                    <img src={Logo} alt='logo' className='object-contain'/>
                  </div>                  
                  <FooterHeadings text={"Company"}/>
                  <FooterLinkSetter ele={company[0].links}  />   
                  <div className="flex gap-3 text-lg text-richblack-400 mt-1">
                    <FaFacebook />
                    <FaGoogle />
                    <FaTwitter />
                    <FaYoutube />
                </div>               
                </div>
                {/* column2 */}
                <div className='space-y-6'>
                  <div>
                    <FooterHeadings text={"Resources"}/>
                    <FooterLinkSetter ele={Resources[0].links}/>
                  </div>
                  <div>
                    <FooterHeadings text={"Support"}/>
                    <FooterLinkSetter ele={Support[0].links} />
                  </div>
                  
                </div>

                {/* column3 */}
                <div className='space-y-6'>
                    <div>
                      <FooterHeadings text={"Plans"}/>
                      <FooterLinkSetter ele={Plans[0].links}/>
                    </div>
                    <div>
                      <FooterHeadings text={"Community"}/>
                      <FooterLinkSetter ele={Community[0].links} />
                    </div>
                </div>

            </div>
            {/* part 2 */}
            <div className='grid lg:grid-cols-3 gap-8 pl-6 border-l border-richblack-700'>
                  {/* column1 */}
                    <div>
                      <FooterHeadings text={"Subjects"}/>
                      <FooterLinkSetter ele={Subjects[0].links} />
                    </div>
                  {/* column2 */}
                   <div>
                      <FooterHeadings text={"Languages"}/>
                      <FooterLinkSetter ele={Languages[0].links} />
                    </div>
                  {/* column3 */}
                    <div>
                      <FooterHeadings text={"Career Building"}/>
                      <FooterLinkSetter ele={CareerBuilding[0].links} />
                    </div>
            </div>
        </div>

        <div className='w-[100%] flex flex-row justify-between pt-6 pb-14   text-richblack-400 text-[15px]'>

            <div className='flex flex-row gap-3  '>
              <div className='border-r border-richblack-700 pr-2'>
                  Privacy Policy
              </div>
              <div className='border-r border-richblack-700 pr-2'>
                  Cookie Policy
              </div>
              <div>
                  Terms Policy
              </div>
            </div>

            <div className='flex gap-1 items-center'>
              Made With  
              <FcLike />
              CodeX © 2024 StudyNotion
            </div>

        </div>

    </div>
  )
}

export default Footer