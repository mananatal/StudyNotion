import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import { Card } from './Card'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import { FreeMode, Pagination}  from 'swiper'


export const CourseSlider = ({courses}) => {

    
  return (
    <>
        {
            courses?.length?
            (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    // modules={[FreeMode, Pagination]}
                    
                    breakpoints={{
                    1024: {
                        slidesPerView: 3,
                    },
                    }}
                    className="max-h-[30rem]"
                >
                    {
                        courses.map((course,index)=>{
                            return <SwiperSlide key={index} Height={"h-[250px]"} >
                                <Card course={course} />
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            ):
            (
                <div className="text-xl text-richblack-5">No Courses Found</div>
            )
        }
    </>
  )
}
