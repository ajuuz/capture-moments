'use client';

import AfterCapture from '@/component/webcamComponent/AfterCapture';
import BeforeCapture from '@/component/webcamComponent/BeforeCapture';
import React, { useEffect, useMemo, useRef, useState } from 'react'

const WebCam:React.FC= () => {
  const [currentPhotoIndex,setCurrentPhotoIndex]=useState<number>(-1)
  const [mode,setMode]=useState<'capture'|'view'>('capture')
  const [takenPhotos,setTakenPhotos]=useState<Blob[]>([])
  const videoRef = useRef<HTMLVideoElement|null>(null)
  const imageCaptureRef = useRef<any>(null)

  useEffect(()=>{
    if(mode==='capture'){
      startCamera()
    }else{
      stopCamera()
    }
  },[mode])

  
  const startCamera=()=>{
    navigator.mediaDevices.getUserMedia({
       video: { facingMode: 'environment' }
    })
    .then(gotMedia)
    .catch(error=>console.log("error occured during setting camera",error))
  }

  const gotMedia=(stream:MediaStream)=>{
    if(videoRef.current){
        videoRef.current.srcObject = stream;
        const videoTrack = stream.getVideoTracks()[0]
        imageCaptureRef.current = new (window as any).ImageCapture(videoTrack)
    }
  }

  const stopCamera=()=>{
    const video = videoRef.current;
    
    if (video?.srcObject) {
        const stream = video.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null; // optional: release the reference
    }
  }

  const handleCapture=async()=>{
    try{
      const blob =await imageCaptureRef.current.takePhoto();
      console.log(blob);
      setTakenPhotos((prev)=>[...prev,blob])
      setCurrentPhotoIndex(prev=>prev+1);
    }
    catch(error){
        console.error('Error taking photo:', error);
    }
  }

  // const handlePhotoSelect= (event:React.ChangeEvent<HTMLInputElement>) => {
  //     if(!event.target.files) return

  //     const file = event.target.files[0];
  //     if (file) {
  //       const imageURL = URL.createObjectURL(file);
  //       setTakenPhotos((prev)=>[...prev,imageURL])
  //       // Preview or upload the image
  //       console.log(file);
  //     }
  // };

  const lastTakenPhoto=useMemo(()=>{
    console.log(currentPhotoIndex)
    console.log(takenPhotos[currentPhotoIndex])
    return takenPhotos[currentPhotoIndex]
  },[takenPhotos.length])


  return (
    <div  className='bg-white w-screen h-screen flex flex-col items-center justify-center'>
      <BeforeCapture mode={mode} setMode={setMode} videoRef={videoRef} handleCapture={handleCapture} lastTakenPhoto={lastTakenPhoto}/>
      <AfterCapture mode={mode} setMode={setMode} takenPhotos={takenPhotos} currentPhotoIndex={currentPhotoIndex} setCurrentPhotoIndex={setCurrentPhotoIndex}/>
    </div>
  )
}

export default WebCam
