import axios from 'axios'
import Player from './components/Player'
import React, { useEffect,useState } from 'react'
function App() {
  const [Radio, setRadio] = useState([]);
  const getData=async()=>{
    var liveRadioListUrl = "https://gist.githubusercontent.com/valarpirai/473305f09f8433f1d338634ed42c437d/raw/live-radio.json?id=" + new Date().getTime();  
    const data=await axios.get(liveRadioListUrl);
    const combinedData = [...data.data[0].channels, ...data.data[1].channels];
    setRadio(combinedData);

}
console.log(Radio);
useEffect(()=>{
   getData()
},[]);
  return (
    <>
    <div>
    {Radio.map((item, index) => (
  <Player key={index} src={item.src} title={item.title} />
    ))}
    </div>
    </>
  )
}

export default App
