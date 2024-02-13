import { Routes,Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Myprofile from "./components/core/dashboard/Myprofile";
import Settings from "./components/core/dashboard/settings";
import AddCourse from "./components/core/dashboard/addCourse";
import MyCourses from "./components/core/dashboard/instructorCourses/MyCourses";
import EditCourse from "./components/core/dashboard/instructorCourses/EditCourse";
import { CategoryPage } from "./pages/CategoryPage";
import { CoursePage } from "./pages/CoursePage";
import { EnrolledCourses } from "./components/core/dashboard/EnrolledCourses";
import { ViewCourse } from "./pages/ViewCourse";
import {ACCOUNT_TYPE} from "./utils/constants"
import { useSelector } from "react-redux";
import { VideoDetails } from "./components/core/viewCourse/VideoDetails";
import { InstructorDashboard } from "./components/core/dashboard/instructorDashboard/InstructorDashboard";
import { Cart } from "./components/core/dashboard/cart/Cart";
import Error from "./pages/Error";
import { PrivateRoute } from "./components/auth/PrivateRoute";



function App() {

    const {user}=useSelector((state)=>state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}></Route>
        <Route path="/signup" element={<OpenRoute><SignUp/></OpenRoute>}></Route>
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}></Route>
        <Route path="/reset-password/:token" element={<OpenRoute><ResetPassword/></OpenRoute>}></Route>
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}></Route>
       
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<ContactUs/>}></Route>
        <Route path="/catalog/:categoryName" element={<CategoryPage/>}></Route>
        <Route path="courses/:courseId" element={<CoursePage/>}></Route>

        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path="dashboard/my-profile" element={<Myprofile/>}/>
            <Route path="dashboard/settings" element={<Settings/>}/>

            <>
                ACCOUNT_TYPE.INSTRUCTOR === user?.accountType && (
                <Route path="dashboard/add-course" element={<AddCourse/>}/>
                <Route path="dashboard/my-courses" element={<MyCourses/>}></Route>
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}></Route>
                <Route path="dashboard/instructor" element={<InstructorDashboard/>} />
              )
            </>            
            
            <>
                  user?.accountType===ACCOUNT_TYPE.STUDENT && (
                    <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                    <Route path="dashboard/cart" element={<Cart/>} />
                  )
            </>


        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
            <>
                user?.accountType ==== ACCOUNT_TYPE.STUDENT &&(
                  <Route 
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails/>}
                  />
                )
            </>
        </Route>

        <Route path="*" element={<Error/>}/>

      </Routes>
    </div>
  );  
}

export default App;
