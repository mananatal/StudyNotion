import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, Player } from 'video-react';
import IconBtn from '../../common/IconBtn';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsApi';
import { updateCompletedLectures } from '../../../redux/slices/viewCourseSlice';

export const VideoDetails = () => {

  const {courseId,sectionId,subSectionId}=useParams();
  const { courseSectionData, courseEntireData, completedLectures } =
        useSelector((state) => state.viewCourse);
  
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const playerRef=useRef(null);

  const [loading,setLoading]=useState(false);
  const [previewSource,setPreviewSource]=useState("");
  const [videoData,setVideoData]=useState([]);
  const [videoEnded,setVideoEnded]=useState(false);

  const setData=()=>{
    if(!courseSectionData.length){
      return;
    }

    if (!courseId && !sectionId && !subSectionId) {
      navigate(`/dashboard/enrolled-courses`)
    }
    else{
        const filteredData=courseSectionData?.filter((section)=>section._id===sectionId);

        const filteredVideoData=filteredData?.[0]?.subSection?.filter((subSection)=>subSection._id===subSectionId);

        console.log("FILTERED DATA: ",filteredData )
        console.log('fILTERED VIDEO DATA: ',filteredVideoData)

        setVideoData(filteredVideoData?.[0]);
        setPreviewSource(courseEntireData?.thumbnail);
        setVideoEnded(false);
    }
  }

  useEffect(()=>{
    setData();
  },[courseEntireData,courseSectionData,location.pathname])

  const isFirstVideo=()=>{
      const currentSectionIndex=courseSectionData?.findIndex((data)=>data?._id===sectionId);

      const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionId);

      if(currentSectionIndex===0 && currentSubSectionIndex===0){
        return true;
      }
      else{
        return false;
      }
  }

  const isLastVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data?._id===sectionId);

    const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionId);

    const noOfSubSections=courseSectionData[currentSectionIndex]?.subSection?.length;

    if(currentSectionIndex===courseSectionData.length-1 && currentSubSectionIndex===noOfSubSections-1){
      return true;
    }
    else{
      return false;
    }
  }

  const goToPrevVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data?._id===sectionId);

    const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionId);

    if(currentSubSectionIndex!==0){
        const prevSubSectionId=courseSectionData[currentSectionIndex]?.subSection[currentSectionIndex-1]._id;

        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } 
    else if(currentSectionIndex!==0){
        const prevSectionId=courseSectionData[currentSectionIndex-1]?._id;
        const prevNoOfSubsections=courseSectionData[currentSectionIndex-1]?.subSection?.length;
        const prevSubSectionId=courseSectionData[currentSectionIndex-1]?.subSection[prevNoOfSubsections-1]?._id;

        navigate(
          `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
        )
    }
  }

  const goToNextVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data?._id===sectionId);

    const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionId);

    const noOfSubSections=courseSectionData[currentSectionIndex]?.subSection?.length;

    if(currentSubSectionIndex!== noOfSubSections-1){
      const nextSubSectionId =courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    }
    else{
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const handleLectureCompletion=async()=>{
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }


  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData?
        (
          <img
            src={previewSource}
            alt='Preview'
            className="h-full w-full rounded-md object-cover"
          />
        ):
        (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />
              {
                videoEnded &&(
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                    }}
                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                  >
                      {
                        !completedLectures.includes(subSectionId) && (
                          <IconBtn
                            disabled={loading}
                            text={!loading ? "Mark As Completed" : "Loading..."}
                            customClasses="text-xl max-w-max px-4 mx-auto"
                            onclick={()=>handleLectureCompletion()}
                          />
                        )
                      }
                      <IconBtn
                        disabled={loading}
                        text="Rewatch"
                        customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                        onclick={()=>{
                          if(playerRef?.current){
                              playerRef?.current?.seek(0);
                              setVideoEnded(false);
                          }
                        }}
                      />

                      <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                        {
                          !isFirstVideo() &&(
                            <button
                              className='blackButton'
                              onClick={goToPrevVideo}
                              disabled={loading}
                            >
                              Prev
                            </button>
                          )
                        }
                        {
                          !isLastVideo() && (
                            <button
                              className='blackButton'
                              disabled={loading}
                              onClick={goToNextVideo}
                            >
                              Next
                            </button>
                          )
                        }
                      </div>
                      <div>
                        
                      </div>
                  </div>
                )
              }
          </Player>
        )
      }
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}
