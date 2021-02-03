import { useState, useEffect } from "react"

export default function Controls({
    handleNextSong,
    handlePrevSong,
    handlePlay,
    handlePause,
    audioRef
  }) {
    const [perc, setPerc] = useState(0);
  
    //ADD LISTENERS
  
    useEffect(() => {
        const audio = audioRef.current
      const handleUpdate = ({ target }) =>
        setPerc(calcPerc(target.currentTime, target.duration));
      audio.addEventListener("timeupdate", handleUpdate);
      return () =>
        audio.removeEventListener("timeupdate", handleUpdate);
    }, []);
  
    return (
      <div>
        <button onClick={handlePlay}>PLAY</button>
        <button onClick={handlePause}>PAUSE</button>
        <button onClick={handleNextSong}>NEXT</button>
        <button onClick={handlePrevSong}>BACK</button>
        <span>{bar(perc)}</span>
      </div>
    );
  }
  
  
  function bar(perc) {
    return (
      <div
        style={{
          width: perc ? perc + "%" : 0,
          height: "20px",
          background: "#000"
        }}
      >
        <h5 style={{ color: "#FFF" }}>{perc}%</h5>
      </div>
    );
  }

  //HELPER

const calcPerc = (curr, total) => {
    return Math.floor((curr * 100) / total);
  };
  