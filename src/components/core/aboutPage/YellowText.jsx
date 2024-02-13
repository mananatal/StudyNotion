import React from 'react'

function YellowText(props) {
  return (
    <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        {props.children}
    </span>
  )
}

export default YellowText