import song from '../assets/song.png'

export const Player = (props) => {
    return (
      <>
        {/* <h1 className="text-2xl text-black">{props.title}</h1>
        <div className="w-[80vw] h-[200px] bg-black text-white flex justify-center items-center m-10 rounded-lg">
          <audio controls>
            <source src={props.src} type="audio/mpeg" />
          </audio>
        </div> */}
        <div className="w-screen h-screen bg-[#121214]  flex flex-col items-center justify-around">
        <div className=' w-full flex justify-center'>
        <h1 className="text-3xl text-green-600 font-bold">{props.title}</h1> <p className='text-blue-400'>Live<span className='animate-pulse'>🔴</span></p>
        </div>
        <div className="w-[400px] h-[400px] shadow-lg shadow-green-300 bg-slate-400/10 backdrop-blur-3xl rounded-xl flex justify-center items-center">
               <img src={song} alt=""/>
        </div>
        <div>
        <audio controls className='w-[400px] h-20'>
            <source src={props.src} type="audio/mpeg" />
        </audio>
        </div>
        </div>
      </>
    );
  };


export default Player;