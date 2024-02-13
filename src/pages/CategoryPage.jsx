import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { category } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentsData';
import { useSelector } from 'react-redux';
import Error from "../pages/Error"
import { CourseSlider } from '../components/core/categoryPage/CourseSlider';
import { Card } from '../components/core/categoryPage/Card';
import Footer from '../components/common/footer/Footer';


export const CategoryPage = () => {

    const {categoryName}=useParams();
    const [categoryPageList,setCategoryPageList]=useState([]);
    const [categoryId,setCategoryId]=useState("");
    const { loading } = useSelector((state) => state.profile)
    const [active,setActive]=useState(1);


    const categoryDetails=async ()=>{
        try{
            const response=await apiConnector("GET",category.CATEGORIES_API);

            const resultID=response?.data?.allCategory.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===categoryName);
            setCategoryId(resultID[0]._id);
            
        }catch(error){
            console.log("Error while calling category api in Category Page: ",error);
        }
    }

    const categoryPageDetails=async()=>{
        try{
            const response=await getCatalogaPageData(categoryId);
            setCategoryPageList(response);
           
            
        }catch(error){
            console.log("Error while calling categoryPAgeDetails api in Category Page: ",error);
        }
    }  
    

    useEffect(()=>{
        categoryDetails();
    },[categoryName]);

    useEffect(()=>{
        categoryPageDetails();
    },[categoryId]);

  return (
   <>
            {/* section1 */}
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">Home / Catalog / <span className="text-yellow-25">{categoryPageList?.selectedCategory?.name}</span></p>
                    <p className="text-3xl text-richblack-5">{categoryPageList?.selectedCategory?.name}</p>
                    <p className="max-w-[870px] text-richblack-200">{categoryPageList?.selectedCategory?.description}</p>
                </div>
            </div>
            
            {/* section2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className="section_heading">Courses to get you started</p>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${
                            active === 1
                              ? "border-b border-b-yellow-25 text-yellow-25"
                              : "text-richblack-50"
                          } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Populer
                    </p>
                    <p
                        className={`px-4 py-2 ${
                            active === 2
                              ? "border-b border-b-yellow-25 text-yellow-25"
                              : "text-richblack-50"
                          } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div >
                    <CourseSlider courses={categoryPageList?.selectedCategory?.course}/>
                </div>
            </div>

            {/* section3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className="section_heading">Top Courses in {categoryPageList?.differentCategories?.name}</p>
                <div>
                    <CourseSlider courses={categoryPageList?.differentCategories?.course}/>
                </div>
            </div>

            {/* section 4 */}
            <div  className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className="section_heading">Frequently Bought</p>
                <div className="py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {categoryPageList?.mostSellingCourses?.courses
                    ?.slice(0, 4)
                    .map((course, i) => (
                        <Card course={course} key={i} Height={"h-[400px]"} />
                    ))}
                </div>

                </div>

            </div>

            <div className='bg-richblack-800'>
                <Footer/>   
            </div>         
   </>
  )
}
