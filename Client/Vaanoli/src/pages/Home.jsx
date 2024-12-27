import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Radiocard from '../components/Radiocard';
import loadingm from '../assets/loadingm.gif'
import {Github,Linkedin} from 'lucide-react'
const Home = () => {
    const [radio, setRadio] = useState([]);
    const [loading,setLoadiing]=useState(false);
    const getData = async () => {
        try{
            setLoadiing(true);
      const liveRadioListUrl =
        "https://gist.githubusercontent.com/valarpirai/473305f09f8433f1d338634ed42c437d/raw/live-radio.json?id=" +
        new Date().getTime();
      const response = await axios.get(liveRadioListUrl);
      const combinedData = [...response.data[0].channels, ...response.data[1].channels];
      setRadio(combinedData);
        }
        catch(err)
        {
            console.log(err);
        }
        finally{
            setLoadiing(false);
        }
    };
    console.log(radio);
  
    useEffect(() => {
      getData();
    }, []);
    const selectedIndices = [1, 13, 17, 18, 21, 26, 27, 29, 30, 32, 33, 36, 42, 44];
    let filteredRadio = radio.filter((_, index) => selectedIndices.includes(index));
    filteredRadio=[...filteredRadio].reverse();
    return (
        <>
        {
            loading?(
              <>
                 <div className='w-screen h-screen flex justify-center items-center bg-black'>
                    <img src={loadingm}  alt="" className='w-[100px] h-[100px]' />
                 </div>
              </>
            ):(
             <>
        <div className='w-screen bg-black'>
        {filteredRadio.map((item, index) => (
          <Radiocard key={index} src={item.src} title={item.title} />
        ))}
      </div>
             </>
            )
        }
      <div className='w-screen h-10 text-white'>
          <div className='w-full flex justify-center space-x-3'>
             <p>Follow me on:</p><div className='flex space-x-4'><a href="https://github.com/Abishek00ujj"><Github /></a> <a href="https://www.linkedin.com/in/abisheks22it/"><Linkedin/></a></div>
          </div>
          <div className='w-full flex justify-center'>
             Made with ❤️ by Abishek
          </div>
      </div>
      </>
    );
  }

export default Home