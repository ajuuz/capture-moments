'use client';

import AfterCapture from '@/component/webcamComponent/AfterCapture';
import BeforeCapture from '@/component/webcamComponent/BeforeCapture';
import React, { useEffect, useRef, useState } from 'react'

const WebCam:React.FC= () => {
  const [photoURL,setPhotoURL]=useState<string|null>(null)
  const [lastPhotos,setLastPhotos]=useState<Blob[]>([])
  const videoRef = useRef<HTMLVideoElement|null>(null)
  const imageCaptureRef = useRef<any>(null)

  useEffect(()=>{
    if(!photoURL){
      startCamera()
    }else{
      stopCamera()
    }
  },[photoURL])

  
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
      const url = URL.createObjectURL(blob)
      setPhotoURL(url)
      stopCamera()
    }
    catch(error){
        console.error('Error taking photo:', error);
    }
  }

  const handlePhotoSelect= (event:React.ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files) return

      const file = event.target.files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        // Preview or upload the image
         setPhotoURL(imageURL)
        console.log(file);
      }
};


  return (
    <div  className='bg-white w-screen h-screen flex flex-col items-center justify-center'>
      <BeforeCapture photoURL={photoURL} videoRef={videoRef} handleCapture={handleCapture}/>
      <AfterCapture photoURL={photoURL} setPhotoURL={setPhotoURL}/>
    </div>
  )
}

export default WebCam
