import React from 'react'

function RedText(props) {
  return (
    <span className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
        {props.children}
    </span>
  )
}

export default RedText