import React, { useEffect, useRef, useState } from 'react';
import song from '../assets/song.png';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

export const Player = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const [beat, setBeat] = useState(0);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const animationId = useRef(null);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256; // Adjust for resolution of frequency data
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      analyserRef.current = { analyser, frequencyData };

      const updateBeat = () => {
        if (analyserRef.current) {
          analyserRef.current.analyser.getByteFrequencyData(analyserRef.current.frequencyData);
          const avgFrequency = analyserRef.current.frequencyData.reduce((a, b) => a + b, 0) / analyserRef.current.frequencyData.length;
          setBeat(avgFrequency);
        }
        animationId.current = requestAnimationFrame(updateBeat);
      };

      audio.play();
      updateBeat();

      return () => {
        cancelAnimationFrame(animationId.current);
        analyser.disconnect();
        source.disconnect();
        audioContext.close();
      };
    }
  }, []);

  // Pulsating animation based on beat
  const pulseAnimation = useSpring({
    transform: `scale(${1 + beat / 100})`,
    opacity: beat > 50 ? 1 : 0.8,
    config: { tension: 200, friction: 80 },
  });

  return (
    <div className="w-screen h-screen bg-[#121214] flex flex-col items-center justify-around">
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
      <div className="max-2xl:w-[80%] w-[400px] h-[400px] shadow-[0_0_20px_1px_rgba(255,255,20,0.8)] bg-slate-400/10 backdrop-blur-3xl rounded-xl flex justify-center items-center">
        <animated.div
          style={pulseAnimation}
          className="w-[150px] h-[150px] rounded-full bg-blue-500 flex justify-center items-center"
        >
          <img src={song} alt="Album Cover" className="w-[120px] h-[120px] rounded-full" />
        </animated.div>
      </div>
      <div>
        <audio ref={audioRef} controls autoPlay className="w-[400px] h-20 rounded-lg">
          <source src={data.src} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default Player;
