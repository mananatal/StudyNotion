import React, { useEffect, useState } from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink, useLocation,matchPath } from 'react-router-dom';
import {NavbarLinks} from "../../data/navbar-links"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropdown from '../auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { category } from '../../services/apis';


function Navbar() {

    const{token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    const location=useLocation();
    const [subLinks,setSubLinks]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchSubLinks=async ()=>{
          setLoading(true);
          try{
            const result=await apiConnector("GET",category.CATEGORIES_API);           
            setSubLinks(result.data.allCategory);
             
          }
          catch(error){
            console.log("Error while calling category api: ",error)
          }
          setLoading(false);
    }

    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname)
    }
  

    useEffect(()=>{
        fetchSubLinks();
    },[])

  return (
    <div className={`h-14 w-full border-b border-richblack-700 flex items-center justify-center
    ${
  location.pathname !== "/" ? "bg-richblack-800" : ""
      }
`}>
        <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between'>
            
             {/* logo */}
              <div>
                <Link to={"/"}>
                    <img src={Logo} alt="logo" height={32} width={160} />
                </Link>
              </div>

              {/* middle portion */}
              <nav className='hidden md:block'>
                <ul className='flex gap-6 text-richblack-25'>
                {
                  NavbarLinks.map((link,index)=>{
                    return <li key={index} className=''>
                          {
                            link.title==="Catalog"?
                            (
                                <>
                                  <div
                                    className={`group relative flex cursor-pointer items-center gap-1 ${
                                      matchRoute("/catalog/:catalogName")
                                        ? "text-yellow-25"
                                        : "text-richblack-25"
                                    }`}
                                  >
                                  <p>{link.title}</p>
                                  <BsChevronDown />
                                  <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                    {loading ? (
                                      <p className="text-center">Loading...</p>
                                    ) : (subLinks && subLinks.length) ? (
                                      <>
                                        {subLinks                                          
                                          ?.map((subLink, i) => (
                                            <Link
                                              to={`/catalog/${subLink.name
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}`}
                                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 transition-all duration-200"
                                              key={i}
                                            >
                                              <p>{subLink.name}</p>
                                            </Link>
                                          ))}
                                      </>
                                    ) : (
                                      <p className="text-center">No Courses Found</p>
                                    )}
                                  </div>
                                </div>
                                </>
                            ):
                            (         
                                <NavLink to={link.path} className={({isActive})=>isActive?"text-yellow-25":"text-richblack-25"}>
                                  {link.title}
                                </NavLink>             
                            )
                          }
                      </li>
                  })
                }
                </ul>                
              </nav>

             {/* buttons section */}
             <div className="hidden items-center gap-x-4 md:flex">
                {
                  user && user.accountType!=="Instructor" &&(
                    <Link to="/dashboard/cart" className="relative">
                         <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                         {totalItems > 0 && (
                          <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                            {totalItems}
                          </span>
                        )}
                    </Link>
                  )
                }
                {
                    token === null && (
                    <Link to="/login">
                      <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                        Log in
                      </button>
                    </Link>
                 )
                }
                {
                   token === null && (
                  <Link to="/signup">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                  )
                }
                {
                  token!==null && <ProfileDropdown/>
                }

                <button className="mr-4 md:hidden">
                  <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
             </div>
             
        </div>
    </div>
  )
}

export default Navbar