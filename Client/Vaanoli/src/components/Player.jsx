import song from '../assets/song.png'
import {ArrowLeft} from 'lucide-react'
import {useNavigate,useLocation} from 'react-router-dom'
export const Player = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);
   const handleBack=()=>{
     navigate('/');
   }
    return (
      <>
        <div className="w-screen h-screen bg-[#121214]  flex flex-col items-center justify-around">
        <div className='w-full flex justify-start '><ArrowLeft className='bg-red-500 rounded-full m-1' onClick={handleBack} size={40} color='white'/></div>
        <div className=' w-full flex justify-center'>
        <h1 className="text-3xl text-green-600 font-bold">{data.title}</h1> <p className='text-blue-400'>Live<span className='animate-ping'>🔴</span></p>
        </div>
        <div className="max-2xl:w-[80%] w-[400px] h-[400px]  shadow-[0_0_20px_1px_rgba(255,255,20,0.8)] bg-slate-400/10 backdrop-blur-3xl rounded-xl flex justify-center items-center">
               <img src={song} alt=""/>
        </div>
        <div>
        <audio autoPlay controls className='w-[400px] h-20 rounded-lg'>
            <source src={data.src} type="audio/mpeg" className=' bg-black'/>
        </audio>
        </div>
        </div>
      </>
    );
  };


export default Player;