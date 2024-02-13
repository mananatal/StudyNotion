import React from 'react'
import {LearningGridArray} from "../../../data/learningGridData"
import HighlightedText from '../homePage/HighlightedText'
import Button from "../homePage/Button";


function LearningGrid() {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
        {
            LearningGridArray.map((card,i)=>{
                return <div key={i}
                        className={`
                            ${i===0 && "xl:col-span-2 xl:h-[294px]"}
                            ${card.order%2===1?"bg-richblack-700 h-[294px]":
                                card.order%2===0?"bg-richblack-800 h-[294px]":"bg-transparent"
                            }
                            ${card.order===3 && "xl:col-start-2"}
                        `}
                       >
                        {
                            card.order<0?
                            (
                                <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                    <div className="text-4xl text-white font-semibold ">
                                        {card.heading}
                                        <HighlightedText>{card.highlightText}</HighlightedText>
                                    </div>
                                    <p className="text-richblack-300 font-medium">
                                        {card.description}
                                    </p>
                                    <div  className="w-fit mt-2">
                                        <Button active={true} linkTo={card.BtnLink}>
                                            {card.BtnText}
                                        </Button>
                                    </div>

                                </div>
                            ):
                            (
                                <div className="p-8 flex flex-col gap-8">
                                    <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
                                    <p  className="text-richblack-300 font-medium">{card.description}</p>
                                </div>
                            )
                        }

                       </div>
            })
        }
    </div>
  )
}

export default LearningGrid