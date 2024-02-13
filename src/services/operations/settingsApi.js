import toast from "react-hot-toast";
import {settingsEndpoints} from "../apis";
import {apiConnector} from "../apiConnector";
import {setUser} from "../../redux/slices/profileSlice";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
  } = settingsEndpoints


export function updateDisplayPicture(token,formData){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
        try{
            const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Profile Image Updated Successfully");
            dispatch(setUser(response.data.data));
            localStorage.setItem("user",JSON.stringify(response.data.data))

        }catch(error){
            console.log("Error While updating user profile image from frontend api handler: ",error);
            toast.error("Failed to Update Profile Image");
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token,data){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const response=await apiConnector("PUT",UPDATE_PROFILE_API,data,{
                Authorization: `Bearer ${token}`,
            });

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const userImage = response.data.updatedUser.image
            ? response.data.updatedUser.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUser.firstName} ${response.data.updatedUser.lastName}`

            dispatch(setUser({ ...response.data.updatedUser, image: userImage }))
            localStorage.setItem("user",JSON.stringify({ ...response.data.updatedUser, image: userImage }))
            toast.success("Profile Updated successfully");
        }catch(error)
        {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(token,data){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const response=await apiConnector("PUT",CHANGE_PASSWORD_API,data,{
                Authorization: `Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password Changed Successfully");
        }catch(error){
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
    }
}

export function deleteProfile(token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const response=await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization: `Bearer ${token}`
            });

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Profile Deleted Successfully");
            localStorage.clear();
            navigate("/");

        }catch(error){
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId);
    }
}