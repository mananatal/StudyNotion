import React from 'react'
import { Link } from 'react-router-dom'

function FooterLinkSetter({ele}) {
    
  return (
    <div className='flex flex-col gap-2 mt-2'>
        {
            ele.map((element,index)=>{                
                return (
                    <Link to={element.link} key={index} className='text-richblack-400 text-[15px] transition-all duration-200 hover:text-richblack-50'>
                            {element.title}     
                    </Link>
                )
            })
        }
    </div>
  )
}

export default FooterLinkSetter