import React from 'react'
import HighlightedText from '../homePage/HighlightedText'
import OrangeText from './OrangeText'
import YellowText from './YellowText'

function Quote() {
  return (
    <div className='text-white text-xl md:text-4xl text-center font-semibold w-11/12 pb-16 mx-auto '>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightedText> combines technology</HighlightedText>,
        <OrangeText> expertise</OrangeText>
        , and community to create an
        <YellowText> unparalleled educational experience.</YellowText>
    </div>
  )
}

export default Quote