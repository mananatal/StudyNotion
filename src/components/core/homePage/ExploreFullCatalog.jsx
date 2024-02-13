import React from 'react'
import Button from './Button';
import { FaArrowRight } from "react-icons/fa6";

function ExploreFullCatalog() {
  return (
    <div className='h-[320px] homepage_bg bg-pure-greys-5'>
        <div className='h-[220px]'></div>
        <div className='flex items-center justify-center gap-6 '>
            <Button linkTo={"/signup"} active={true}>
            <div className='flex gap-2 justify-center items-center'>
                        Expolre Full Catalog
                        <FaArrowRight />
                    </div>
            </Button>
            <Button linkTo={"/login"}> 
                <div className='text-white'>
                      Learn More
                </div>
            </Button>
        </div>
    </div>
  )
}

export default ExploreFullCatalog