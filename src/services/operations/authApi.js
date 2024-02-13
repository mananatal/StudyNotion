import toast from "react-hot-toast";
import { endpoints } from "../apis";
import {setLoading, setToken} from "../../redux/slices/authSlice"
import { apiConnector } from "../apiConnector";
import {setUser} from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";


const {
    RESETPASSWORD_API,
    RESETPASSTOKEN_API,
    LOGIN_API,
    SIGNUP_API,
    SENDOTP_API
}=endpoints;

export function login(email,password,navigate){

    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",LOGIN_API,{email,password});
            console.log("Login API response: ",response);

            if(!response.data.success){
                throw new Error(response.data.data)
            }

            toast.success("Login Successful");            
            dispatch(setToken(response.data.token));

            const userImage=response.data?.user?.image?response.data.user.image:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({...response.data.user,image:userImage}));

            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user))
            
            navigate("/dashboard/my-profile")

        }catch(error){
            console.log("Login Api Error: ", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        
    }
}

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",SENDOTP_API,{email});
            console.log("SENDING OTP RESPONSE: ",response)
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email")
        }catch(error){
            console.log("Send Otp api error: ",error);
            toast.error("Could not send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function sendResetPasswordLink(email,setEmailSend)
{
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",RESETPASSTOKEN_API,{email});
            console.log("Printing response of sent reset password token api: ",response);

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }

            toast.success("Pasword Reset Link Sent Successfully");
            setEmailSend(true);

        }catch(error){
            console.log("Error while sending reset pasword token api: ",error);
            toast.error("Email Not Send");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password,confirmPassword,token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});

            console.log("Password reset api response: ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password Reset Successfully");
            navigate("/login");
        }catch(error){
            console.log("Error while Resetting password: ",error);
            toast.error("Failed to Reset Password");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            console.log("TYPE:",typeof otp)
            console.log("OTP: ",otp)
            const response=await apiConnector("POST",SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,otp});
            console.log("Signup api response: ",response);
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Created Successfully");
            navigate("/login")
        }catch(error){
            console.log("Error while Signup(API): ",error);
            toast.error("Signup Failed");
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate)
{    
    return async(dispatch)=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(resetCart())
        toast.success("Logged Out Successfully")
        navigate("/");
    }
}