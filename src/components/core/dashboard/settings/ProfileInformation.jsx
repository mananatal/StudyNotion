import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from "../../../common/IconBtn"
import { updateProfile } from '../../../../services/operations/settingsApi';


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]


function ProfileInformation() {

      const {user}=useSelector((state)=>state.profile);
      const {token}=useSelector((state)=>state.auth);
      const navigate=useNavigate();
      const dispatch=useDispatch();

      const {
          handleSubmit,
          register,
          formState:{errors}
      }=useForm();

      
      const submitForm=async (data)=>{
          try{
            dispatch(updateProfile(token,data));
          }catch(error){
            console.log("Error while updating profile from frontend: ", error.message)
          }
      }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
            {/* firstname last name div */}
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='firstName' className='label-style'>First Name</label>
                    <input
                      type='text'
                      name='firstName'
                      id='firstName'
                      placeholder='Enter First Name'
                      className='form-style'
                      {...register("firstName",{required:true})}
                      defaultValue={user?.firstName}
                    />
                    {
                      errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please enter your first name.
                        </span>
                      )
                    }
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastName' className='label-style'>Last Name</label>
                    <input
                      type='text'
                      name='lastName'
                      id='lastName'
                      placeholder='Enter Last Name'
                      className='form-style'
                      {...register("lastName",{required:true})}
                      defaultValue={user?.lastName}
                    />
                    {
                      errors.lastName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please enter your last name.
                        </span>
                      )
                    }
                </div>
            </div>

            {/* DOB and Gender div */}
            <div className="flex flex-col gap-5 lg:flex-row">
              {/* DOB */}
              <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor='dateOfBirth' className='label-style'>Date of Birth</label>
                  <input
                    type='date'
                    name='dateOfBirth'
                    id='dateOfBirth'
                    className='form-style'
                    {...register("dateOfBirth",{
                      required:{
                        value:true,
                        message:"Please Enter Date Of Birth"
                      },
                      max:{
                        value:new Date().toISOString().split("T")[0],
                        message:"Date of Birth cannot be in future"
                      }
                    })}
                    defaultValue={user?.additionalDetails?.dateOfBirth}
                  />
                  {
                    errors.dateOfBirth && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.dateOfBirth.message}
                      </span>
                    )
                  }                      
              </div>
              {/* Gender */}
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='gender' className='label-style'>Gender</label>
                <select
                  className='form-style'
                  name='gender'
                  id='gender'
                  {...register("gender",{required:true})}
                  defaultValue={user?.additionalDetails?.gender}
                >
                  {
                    genders.map((gender,index)=>{
                      return <option key={index} value={gender}>{gender}</option>
                    })
                  }
                </select>
                  {errors.gender && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your gender.
                    </span>
                  )}
              </div>  
            </div>

            {/* contact number and about div */}
            <div className="flex flex-col gap-5 lg:flex-row">
                {/* contactNUmber*/}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor='contactNUmber' className='label-style'>Contact Number</label>
                  <input
                    type='text'
                    name='contactNumber'
                    id='contactNumber'
                    placeholder='Enter Contact Number'
                    className='form-style'
                    {...register("contactNumber",{
                      required:{
                        value:true,
                        message:"Please Enter Contact Number"
                      },
                      maxLength:{
                        value:12,
                        message:"Invalid Contact Number"
                      },
                      minLength:{
                        value:10,
                        message:"Invalid Contact Number"
                      }
                    })}
                    defaultValue={user?.additionalDetails?.contactNumber}
                  />
                  {
                    errors.contactNumber && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.contactNumber.message}
                      </span>
                    )
                  }
                </div>
                {/* about */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor='about' className='label-style'>About</label>
                  <input
                    type='text'
                    name='about'
                    id='about'
                    className='form-style'
                    placeholder='Enter Bio Details'
                    {...register("about")}
                    defaultValue={user?.additionalDetails?.about}
                  />
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}

export default ProfileInformation