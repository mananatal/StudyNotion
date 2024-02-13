import React from 'react'

function OrangeText(props) {
  return (
    <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold text-4xl">
        {props.children}
    </span>
  )
}

export default OrangeText