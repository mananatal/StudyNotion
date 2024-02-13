import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {MdClose} from "react-icons/md"
function ChipInput({errors,setValue,getValues,register,label,name,placeholder}) {  

    const {editCourse,course}=useSelector((state)=>state.course)
    const [chips,setChips]=useState([]);

    useEffect(() => {
        if (editCourse) {          
          setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
      }, [])

    useEffect(() =>{
        if(chips)
        setValue(name, chips)        
    }, [chips])

    const handleKeyDown=(event)=>{
        if(event.key==="Enter" || event.key===",")
        {
            event.preventDefault();
            const tagname=event.target.value.trim();

            if(tagname && !chips.includes(tagname)){
                const newChip=[...chips,tagname];
                setChips(newChip);
                event.target.value="";
            }
        }
    }

    const handleChipRemove=(index)=>{
        const temp=[...chips];
        temp.splice(index,1);
        setChips(temp);
    }

  return (
    <div className="flex flex-col space-y-2">
        <label htmlFor={name} className="text-sm text-richblack-5">{label}<sup className="text-pink-200">*</sup></label>
        <div className="flex w-full flex-wrap gap-y-2">
            {
                chips.length>0 && (
                    <>
                        {
                            chips.map((chip,index)=>(
                                <div key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                                    {chip}
                                    <button
                                        type="button"
                                        className="ml-2 focus:outline-none"
                                        onClick={()=>handleChipRemove(index)}
                                    >
                                        <MdClose className="text-sm" />
                                    </button>
                                </div>
                            ))
                        }
                    </>
                )
            }
            <input
                type='text'
                placeholder={placeholder}
                name={name}
                id={name}
                className='form-style w-full'
                onKeyDown={handleKeyDown}
            />
        </div>
        {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
        )}
    </div>
  )
}

export default ChipInput