import React from 'react'
import {HiOutlineVideoCamera} from "react-icons/hi"
export const SubSectionAccordian = ({subSection}) => {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSection?.title}</p>
        </div>
      </div>
    </div>
  )
}
