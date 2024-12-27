import React from 'react'
import song from '../assets/song.png'
import { useNavigate } from "react-router-dom";
export const Radiocard=(props)=> {
    const navigate = useNavigate();
    const sendProps=()=>{
        navigate(`/player/`, { state: { data: props } });
    }
  return (
   <>
   <div className='w-screen h-auto bg-[#121212] flex mb-1 rounded-lg' onClick={sendProps} >
       <div className='w-[100px] h-[70px] flex justify-center items-center'>
           <img src={song} alt="" />
       </div>
       <div className=' w-full flex justify-between'>
        <p className='text-white m-2'>{props.title}</p>
        <p className='text-blue-400'>Live<span className='animate-ping'>🔴</span></p>
       </div>
       <div>
         
       </div>
   </div>
   </>
  );
}
export default Radiocard