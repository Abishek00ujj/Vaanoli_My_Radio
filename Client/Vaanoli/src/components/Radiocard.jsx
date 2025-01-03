import React, { useEffect, useState } from 'react'
import Image1 from '../assets/Image1.gif';
import Image2 from '../assets/Image2.gif';
import Image3 from '../assets/Image3.gif';
import Image4 from '../assets/Image4.gif';
import Image5 from '../assets/Image5.gif';
import Image6 from '../assets/Image6.webp';
import Image7 from '../assets/Image7.webp';
import Image8 from '../assets/Image8.gif';
import Image9 from '../assets/Image9.gif';
import Image10 from '../assets/Image10.gif';
import { useNavigate } from "react-router-dom";
export const Radiocard=(props)=> {
    const [Image,setImage]=useState(null);
    const navigate = useNavigate();
    const sendProps=()=>{
        navigate(`/player/`, { state: { data: props } });
    }
    const Images={Image1,Image2,Image3,Image4,Image5,Image6,Image7,Image8,Image9,Image10};
    useEffect(()=>{
        const randomNumber= Math.floor(Math.random() * 10);
        setImage(Images[`Image${randomNumber + 1}`]); 
    })
  return (
   <>
   <div className='w-screen h-auto bg-[#121212] flex mb-1 rounded-lg p-1' onClick={sendProps} >
       <div className='w-[100px] h-[70px] flex justify-center items-center'>
           <img src={Image} className='w-[80%] h-[80%]' alt="" />
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