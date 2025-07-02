import React, { useState } from 'react'

type Props={
    mode:string|null,
    setMode:React.Dispatch<React.SetStateAction<'capture'|'view'>>
    takenPhotos:Blob[],
    currentPhotoIndex:number,
    setCurrentPhotoIndex:React.Dispatch<React.SetStateAction<number>>
}

const AfterCapture = ({mode,setMode,takenPhotos,currentPhotoIndex,setCurrentPhotoIndex}:Props) => {
    
    const prevImage=()=>{
        if(currentPhotoIndex===0) return
        setCurrentPhotoIndex(prev=>prev-1)
    }
    const nextImage=()=>{
        if(currentPhotoIndex===takenPhotos.length-1) return
        setCurrentPhotoIndex(prev=>prev+1)
    }

    const handleRetake=()=>{
        setCurrentPhotoIndex(takenPhotos.length-1);
        setMode('capture')
    }
  return (
    <div className={`${mode==='view'?'block':'hidden'} h-full w-full relative overflow-hidden flex flex-col justify-center items-center`}>
      <img src={takenPhotos[currentPhotoIndex]?URL.createObjectURL(takenPhotos[currentPhotoIndex]):'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='} alt="captured photo" className='absolute left-0 top-0 h-full w-full object-cover' />
      <div className='flex justify-around absolute bottom-10 gap-5'>
        <button onClick={handleRetake} className='p-5 rounded-4xl bg-white text-black'>Retake</button>
        <button onClick={prevImage} className='p-5 rounded-4xl bg-white text-black'>prev</button>
        <button onClick={nextImage} className='p-5 rounded-4xl bg-white text-black'>next</button>
      </div>
    </div>
  )
}

export default AfterCapture
