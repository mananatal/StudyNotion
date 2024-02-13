import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../../services/operations/settingsApi';

function ChangeProfilePicture() {

    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [imageFile,setImageFile]=useState(null);
    const [previewImage,setPreviewImage]=useState(null);
    const userImageRef=useRef(null);
    const [loading,setLoading]=useState(false);

    const handleFileChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setImageFile(file);
            preview(file);
        }
    }

    const preview=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewImage(reader.result);
        }
    }

    const handleClick=()=>{
        userImageRef.current.click();
    }

    const handleFileUpload=async ()=>{        
        setLoading(true);
        try{
            const formData=new FormData();
            formData.append("displayPicture",imageFile);
            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false);
            })

        }catch(error){

        }
        
    }

    useEffect(()=>{
        if(imageFile)
        {
            preview(imageFile)
        }        
    },[imageFile]);


  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        
        <div className="flex items-center gap-x-4">
            <img
                src={previewImage ?? user?.image}
                alt='profileImage'
                className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-2">
                <p>Change Profile Picture</p>
                <div className="flex flex-row gap-3">
                    <input
                        type='file'
                        ref={userImageRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept='image/png,image/gif,image/jpeg'
                    />
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Select
                    </button>
                    <IconBtn
                        text={loading?"Uploading...":"Upload"}
                        onclick={handleFileUpload}
                    >
                        {
                            !loading && <FiUpload className="text-lg text-richblack-900" />
                        }
                    </IconBtn>
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default ChangeProfilePicture