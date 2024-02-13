import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

function RequiremensField({errors,setValue,getValues,register,label,name}) {

    const [requirementList,setRequirementList]=useState([]);
    const [requirement,setRequirement]=useState("");
    const {editCourse,course}=useSelector((state)=>state.course)

    useEffect(()=>{
        if(editCourse){
            setRequirementList(course?.instructions)
        }
        register(name,{
            require:true,
            validate:(value)=>value.length>0
        })
    },[])

    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList,setValue,name]);

    const addRequirement=(e)=>{       
        if(requirement){
            setRequirementList((prev)=>([...prev,requirement]));
            setRequirement("");
        }
    }

    const removeRequirement=(index)=>{        
        const temp=[...requirementList];        
        temp.splice(index,1);
        setRequirementList(temp);
    }

  return (
    <div className="flex flex-col space-y-2">
        <label htmlFor={name} className="text-sm text-richblack-5">{label}<sup className="text-pink-200">*</sup></label>
        <div className="flex flex-col items-start space-y-2" >
            <input
                type='text'
                id={name}
                name={name}
                onChange={(e)=>setRequirement(e.target.value)}
                value={requirement}
                className='form-style w-full'
            />
            <div
                onClick={addRequirement}
                className="font-semibold text-yellow-50 cursor-pointer"
            >
                Add
            </div>
        </div>
        {
            requirementList.length>0 &&(
                <ul className="mt-2 list-inside list-disc">
                    {
                        requirementList.map((item,index)=>(
                            <li key={index} className="flex items-center text-richblack-5"> 
                                <span>{item}</span>
                                <button 
                                    onClick={()=>removeRequirement(index)}
                                    type='button'
                                    className="ml-2 text-xs text-pure-greys-300 "
                                >
                                    Clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )
        }   
    </div>
  )
}

export default RequiremensField