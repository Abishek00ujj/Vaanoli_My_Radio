import axios from 'axios';
import Player from './components/Player';
import React, { useEffect, useState } from 'react';

function App() {
  const [radio, setRadio] = useState([]);
  const getData = async () => {
    const liveRadioListUrl =
      "https://gist.githubusercontent.com/valarpirai/473305f09f8433f1d338634ed42c437d/raw/live-radio.json?id=" +
      new Date().getTime();
    const response = await axios.get(liveRadioListUrl);
    const combinedData = [...response.data[0].channels, ...response.data[1].channels];
    setRadio(combinedData);
  };
  console.log(radio);

  useEffect(() => {
    getData();
  }, []);
  const selectedIndices = [1, 13, 17, 18, 21, 26, 27, 29, 30, 32, 33, 34, 36, 42, 44];
  let filteredRadio = radio.filter((_, index) => selectedIndices.includes(index));
  filteredRadio=[...filteredRadio].reverse();
  return (
    <div>
      {filteredRadio.map((item, index) => (
        <Player key={index} src={item.src} title={item.title} />
      ))}
    </div>
  );
}

export default App;
