import { useState, useEffect } from 'react';
import song from '../assets/song.png';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import RandomBeatVisualizer from './RandomBeatVisualizer';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const Player = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  
  if (!data) {
    return <div>Loading...</div>;
  }
  const [borderColor, setBorderColor] = useState(getRandomColor);
  useEffect(() => {
    const interval = setInterval(() => {
      setBorderColor(getRandomColor());
    },5000);

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="w-screen h-screen bg-[#121214] flex flex-col space-y-10 items-center justify-around">
        <div className="w-full flex justify-start">
          <ArrowLeft
            className="bg-red-500 rounded-full m-1"
            onClick={handleBack}
            size={40}
            color="white"
          />
        </div>
        <div className="w-full flex justify-center">
          <h1 className="text-3xl text-green-600 font-bold">{data.title}</h1>
          <p className="text-blue-400">
            Live<span className="animate-ping">🔴</span>
          </p>
        </div>
        <div
          className={`max-2xl:w-[80%] w-[400px] h-[400px] rounded-full  bg-slate-400/10 backdrop-blur-3xl flex justify-center items-center`}
          style={{
            // border: `10px solid ${borderColor}`,
            boxShadow: `0 0 20px 1px ${borderColor}`, 
          }}
        >
          <img src={song} alt="" />
        </div>
        <div>
          <div className="w-full h-auto flex justify-center">
            <RandomBeatVisualizer  data={borderColor} />
          </div>
          <audio autoPlay controls className="w-[400px] h-20 rounded-lg">
            <source src={data.src} type="audio/mpeg" className="bg-black" />
          </audio>
        </div>
      </div>
    </>
  );
};

export default Player;
