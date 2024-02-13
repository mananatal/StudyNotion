import React, { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import {setCourse, setStep} from "../../../../../redux/slices/courseSlice"
import { addCourseDetails, editCourseDetails, getCourseCategory } from '../../../../../services/operations/courseDetailsApi';
import {HiOutlineCurrencyRupee} from "react-icons/hi2"
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequiremensField from './RequiremensField';
import IconBtn from "../../../../common/IconBtn"
import {MdNavigateNext } from "react-icons/md"
import toast from 'react-hot-toast';
import {COURSE_STATUS} from "../../../../../utils/constants"

function CourseInformationForm() {

    const {editCourse,course}=useSelector((state)=>state.course);
    const dispatch=useDispatch();
    const [categoriesList,setCategoriesList]=useState([]);
    const [loading,setLoading]=useState(false);
    const {token}=useSelector((state)=>state.auth);

    const{
        register,
        formState:{errors},
        setValue,
        getValues,
        handleSubmit
    }=useForm();

    const fetchCategory=async ()=>{
        setLoading(true);
        try{
            const result=await getCourseCategory();
            setCategoriesList(result);
        }catch(error){  
            console.log("Error while fetching category in fetchCategory function");
        }
        setLoading(false);
    }

    useEffect(()=>{
        //if course is in edit mode
        if(editCourse){
            setValue("courseName",course.courseName);
            setValue("courseDescription",course.courseDescription   );
            setValue("whatYouWillLearn",course.whatYouWillLearn);
            setValue("tag",course.tag);
            setValue("thumbnail",course.thumbnail);
            setValue("category",course.category);
            setValue("price",course.price);
            setValue("instructions", course.instructions)
        }

        fetchCategory();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
    const isFormUpdated=()=>{
        const currentValues=getValues();

        if (
            currentValues.courseName !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.price !== course.price ||
            currentValues.tag.toString() !== course.tag.toString() ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.category._id !== course.category._id ||
            currentValues.instructions.toString() !==
              course.instructions.toString() ||
            currentValues.thumbnailImage !== course.thumbnailImage
          ) {
            return true
          }

        return false;
    }



    const submitHandler=async (data)=>{

        if(editCourse){
            
            if(isFormUpdated())
            {
                const currentValues=getValues();
                const formData=new FormData();

                formData.append("courseId",course._id);

                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseDescription)
                }
                if (currentValues.price !== course.price) {
                    formData.append("price", data.price)
                }
                if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.whatYouWillLearn)
                }
                if (currentValues.category !== course.category) {
                    formData.append("category", data.category)
                }
                if (currentValues.tag !== course.tag) {
                    formData.append("tag", JSON.stringify(data.tag))
                }
                if (currentValues.instructions !== course.instructions) {
                    formData.append("instructions", JSON.stringify(data.instructions))
                }
                if (currentValues.thumbnailImage !== course.thumbnailImage) {
                    formData.append("thumbnailImage", data.thumbnailImage)
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)
                if (result) {
                dispatch(setStep(2))
                dispatch(setCourse(result))
                }
            }
            else{
                toast.error("No changes made to the form")
            }
            return;            
        }


        const formData = new FormData()
        formData.append("courseName", data.courseName)
        formData.append("courseDescription", data.courseDescription)
        formData.append("price", data.price)
        formData.append("tag", JSON.stringify(data.tag))
        formData.append("whatYouWillLearn", data.whatYouWillLearn)
        formData.append("category", data.category)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.instructions))
        formData.append("thumbnailImage", data.thumbnailImage)
        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
        }
        setLoading(false)

    }
   
  return (
    <>
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
        >
            {/* courses title */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='courseName' >Course Title <sup className="text-pink-200">*</sup></label>
                <input
                    type='text'
                    placeholder='Enter Course Title'
                    className='form-style w-full'
                    name='courseName'
                    id='courseName'
                    {...register("courseName",{required:true})}
                />
                {
                    errors.courseName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course title is required
                        </span>
                    )
                }
            </div>

            {/* course description */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='courseDescription'>Course Short Description <sup className="text-pink-200">*</sup></label>
                <textarea
                    cols={30}
                    rows={4}
                    name='courseDescription'
                    id='courseDescription'
                    {...register("courseDescription",{required:true})}
                    className='form-style w-full'
                    placeholder='Enter Description'
                />
                {
                    errors.courseDescription && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            courseDescription is required
                        </span>
                    )
                }
            </div>

            {/* course Price */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='price' >Course Price <sup className="text-pink-200">*</sup></label>
                <div className="relative">
                    <input
                        id='price'
                        type='text'
                        name='price'
                        placeholder='Enter Course Price'
                        {...register("price",{
                            required:true,
                            valueAsNumber:true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              },
                        })}
                        className="form-style w-full !pl-12"                        
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {
                    errors.price &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Price is required
                        </span>
                    )
                }
            </div>

            {/* course category */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='price' >Course Category<sup className="text-pink-200">*</sup></label>
                <select
                    name='category'
                    id='category'
                    className='form-style w-full'
                    defaultValue={""}
                    {...register("category",{required:true})}
                >
                    <option disabled value={""}>Choose a Category</option>
                    {
                        !loading && categoriesList.map((category,index)=>(
                            <option key={index} value={category?._id}>{category?.name}</option>
                        ))
                    }
                </select>
                {
                    errors.category && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Category is required
                        </span>
                    )
                }
            </div>

            {/* course tags */}
            <ChipInput
                name="tag"
                label="Tags"
                register={register}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                placeholder="Enter Tags and press Enter"
            />

            {/* Course Thumbnail image */}
            <Upload
                name="thumbnailImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnailImage : null}
            />

            {/* benefits of the course */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='whatYouWillLearn' >Benefits of the Course<sup className="text-pink-200">*</sup></label>
                <textarea
                    cols={30}
                    rows={4}
                    name='whatYouWillLearn'
                    id='whatYouWillLearn'
                    {...register("whatYouWillLearn",{required:true})}
                    className='form-style w-full'
                    placeholder='Enter Benefits of the Course'
                />
                {errors.courseBenefits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Benefits of the course is required
                    </span>
                )}
            </div>

            {/* requirement field */}
            <RequiremensField
                name="instructions"
                label="Requirements/Instructions"
                register={register}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
            />

            <div className="flex justify-end gap-x-2">
                {
                    editCourse && (
                        <button 
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                            onClick={()=>dispatch(setStep(2))}
                            disabled={loading}
                        >
                            Continue Wihout Saving
                        </button>
                    )
                }
                <IconBtn
                    text={!editCourse ? "Next" : "Save Changes"} 
                    disabled={loading}   
                >
                    <MdNavigateNext />
                </IconBtn>
            </div>

        </form>
    </>
  )
}

export default CourseInformationForm