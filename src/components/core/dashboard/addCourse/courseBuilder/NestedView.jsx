import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsApi';
import { setCourse } from '../../../../../redux/slices/courseSlice';



function NestedView({handleChangeEditSectionName}) {

  const {token}=useSelector((state)=>state.auth);
  const {course}=useSelector((state)=>state.course);
  const dispatch=useDispatch();
  
  const [confirmationModal,setConfirmationModal]=useState(null);

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const handleDeleleSection= async (sectionId)=>{
      const result=await deleteSection({sectionId,courseId:course._id},token);

      if(result){
        dispatch(setCourse(result));
      }
      setConfirmationModal(null);
  }

  const handleDeleteSubSection=async (subSectionId,sectionId)=>{
    const result = await deleteSubSection({ subSectionId, sectionId },token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }
    
  return (
    <>
            <div  className="rounded-lg bg-richblack-700 p-6 px-8"
            id="nestedViewContainer">
          {
            course?.courseContent?.map((section)=>{
              return <details key={section._id} open>
                  <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                      <div  className="flex items-center gap-x-3">
                          <RxDropdownMenu className="text-2xl text-richblack-50" />
                          <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                      </div>
                      <div className="flex items-center gap-x-3">
                          <button
                            onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}
                          >
                              <MdEdit className="text-xl text-richblack-300" />
                          </button>

                          <button
                            onClick={()=>{
                              setConfirmationModal({
                                text1: "Delete this Section?",
                                text2: "All the lectures in this section will be deleted",
                                btn1text: "Delete",
                                btn2text: "Cancel",
                                btn1Handler: () => handleDeleleSection(section._id),
                                btn2Handler: () => setConfirmationModal(null),
                              })
                            }}
                          >
                              <RiDeleteBin6Line className="text-xl text-richblack-300" />
                          </button>
                          <span className="font-medium text-richblack-300">|</span>
                          <AiFillCaretDown className={`text-xl text-richblack-300`} />
                      </div>
                  </summary>
                  <div className="px-6 pb-4">
                    {
                      section?.subSection?.map((data)=>{
                        return <div
                                  key={data._id}
                                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                  onClick={()=>setViewSubSection(data)}
                        >
                            <div className="flex items-center gap-x-3 py-2 ">
                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                <p className="font-semibold text-richblack-50">
                                  {data.title}
                                </p>
                            </div>
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-x-3"
                            >
                                <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                    <MdEdit className="text-xl text-richblack-300" />
                                </button>
                                <button
                                    onClick={() =>
                                      setConfirmationModal({
                                        text1: "Delete this Sub-Section?",
                                        text2: "This lecture will be deleted",
                                        btn1text: "Delete",
                                        btn2text: "Cancel",
                                        btn1Handler: () =>
                                        handleDeleteSubSection(data._id, section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                      })
                                    }
                                  >
                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                </button>
                            </div>                            
                        </div>
                      })
                    }

                    {/* add new lecture to section */}
                    <div>
                      <button
                        className="mt-3 flex items-center gap-x-1 text-yellow-50"
                        onClick={()=>setAddSubsection(section._id)}
                      >
                        <FaPlus className="text-lg" />
                        <p>Add Lecture</p>
                      </button>
                   </div>
                </div>
              </details>
            })
          }
        </div>
        {/* modal section */}
        {addSubSection ? (
          <SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubsection}
            add={true}
          />
        ) : viewSubSection ? (
          <SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />
        ) : editSubSection ? (
          <SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />
        ) : (
          <></>
      )} 
      {
        confirmationModal && (
          <ConfirmationModal modalData={confirmationModal}/>
        )
      }
    </>
  )
}

export default NestedView