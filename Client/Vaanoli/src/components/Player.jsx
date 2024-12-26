export const Player = (props) => {
    return (
      <>
        <h1 className="text-2xl text-black">{props.title}</h1>
        <div className="w-[80vw] h-[200px] bg-black text-white flex justify-center items-center m-10 rounded-lg">
          <audio controls>
            <source src={props.src} type="audio/mpeg" />
          </audio>
        </div>
      </>
    );
  };


export default Player;
  