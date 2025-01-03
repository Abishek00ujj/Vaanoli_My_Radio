import React, { useState, useEffect } from 'react';

const RandomBeatVisualizer = (props) => {
    console.log(props.data);
  const [bars, setBars] = useState(Array(30).fill(0));
  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prevBars) => {
        return prevBars.map(() => Math.floor(Math.random() * 90) + 10);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center bg-[#121212]">
      <div className="flex items-center space-x-1">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`w-2 bg-[${props.data}] transition-transform duration-150`}
            style={{
              height: `${height}px`,
              transform: `scaleY(${height / 100})`,
              backgroundColor: props.data, 
            }}
          />
        ))}
      </div>
      <div className="text-center mt-4 text-xl font-semibold"></div>
    </div>
  );
};

export default RandomBeatVisualizer;
