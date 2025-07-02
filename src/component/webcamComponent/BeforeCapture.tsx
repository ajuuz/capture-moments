import { Ref } from "react"

type Prop={
    mode:'capture'|'view',
    setMode:React.Dispatch<React.SetStateAction<'capture'|'view'>>
    videoRef:Ref<HTMLVideoElement>,
    lastTakenPhoto:Blob,
    handleCapture:()=>void
}
const BeforeCapture = ({mode,setMode,videoRef,lastTakenPhoto,handleCapture}:Prop) => {
    console.log(lastTakenPhoto)
  return (
    <div  className={`${mode==='capture'?'block':'hidden'} h-full w-full flex flex-col justify-center items-center relative overflow-hidden`}>
      <video autoPlay playsInline  className='absolute top-0 left-0 w-full h-full object-cover' ref={videoRef}/>

      <div className='absolute bottom-10 z-10' onClick={handleCapture}>
        <div className='p-8 bg-white rounded-4xl relative flex items-center justify-center'>
            <div className='rounded-4xl absolute border-3 p-6'></div>
        </div>
      </div>

      <div onClick={()=>setMode('view')} className='rounded-md bg-white w-25 overflow-hidden absolute bottom-10 right-5'>
        {lastTakenPhoto && <img src={URL.createObjectURL(lastTakenPhoto)}  className=""/>}
      </div>
    </div>
  )
}

export default BeforeCapture
