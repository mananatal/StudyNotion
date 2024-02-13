import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countrycode from "../../data/countrycode.json";


function ContactUsForm() {
    const [loading,setLoading]=useState(false);

    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful},        
    }=useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                phoneNumber:"",
                message:"",
                email:""
            })
        }
    },[reset,isSubmitSuccessful])

    const handleSendMessage=async (data)=>{
        // console.log(data)
        setLoading(true);
        try{

        }catch(error){

        }
        setLoading(false);
    }

  return (
    <div>
        <form onSubmit={handleSubmit(handleSendMessage)} className='flex flex-col gap-7'>
            {/* first name last name container */}
            <div className='flex flex-col lg:flex-row gap-5'>
                {/* first name */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='firstName' className="label-style">First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        className='form-style'
                        {...register("firstName",{required:true})}
                    />
                    {
                        errors.firstName &&
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter your name.</span>
                    }
                </div>
                {/* lastName */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastName' className='label-style'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last Name'
                        className='form-style'
                        {...register("lastName")}
                    />
                </div>
            </div>

            {/* email */}
            <div  className="flex flex-col gap-2 ">
                <label htmlFor='email' className='label-style'>Email Address</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder='Enter email address'
                    className='form-style'
                    {...register("email",{required:true})}
                />
                {
                    errors.email && 
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Email address.
                    </span>
                }
            </div>

            {/* Phone number */}
            <div className="flex flex-col gap-2">
                <label htmlFor='phoneNumber' className='label-style'>Phone Number</label>
                {/* countrycode and number container */}
                <div className='flex gap-5 items-center'>
                    {/* county code div */}
                    <div className="flex w-[81px] flex-col gap-2">
                        <select 
                            className='form-style'
                            {...register("countryCode",{required:true})}
                        >
                            {
                                countrycode.map((element,index)=>{
                                    return <option value={element.code} key={index}>
                                            {element.code}-{element.country}
                                        </option>
                                })
                            }
                        </select>
                    </div>
                    {/* phone number div */}
                    <div  className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type='number'
                            id='phoneNumber'
                            name='phoneNumber'
                            placeholder='12345 12345'
                            className='form-style'
                            {...register("phoneNumber",
                                {   required:{value:true , message:"Please enter your Phone Number."},
                                    minLength:{value:10 , message:"Invalid Number"},
                                    maxLength:{value:10, message:"Invalid Number"}
                            })}
                        />
                        {
                            errors.phoneNumber &&
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.phoneNumber.message}
                            </span>
                        }
                    </div>
                </div>
            </div>

            {/* message */}
            <div className="flex flex-col gap-2">
                <label htmlFor='message' className='label-style'>Message</label>
                <textarea
                    name='message'
                    id='message'
                    rows="7"
                    cols="30"
                    placeholder='Enter your message here'
                    {...register("message",{required:true})}
                    className='form-style'
                />
                {
                    errors.message && 
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.  
                    </span>
                }
            </div>

            {/* button */}
            <button
                type='submit'
                disabled={loading}
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] `}    
            >
                Send Message
            </button>   
        </form>
    </div>
  )
}

export default ContactUsForm