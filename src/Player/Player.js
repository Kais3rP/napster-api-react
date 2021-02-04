import React, { useState, useEffect, useRef } from "react";
import Controls from "../Controls/Controls"
import TrackInfo from "../TrackInfo/TrackInfo"
import Audio from "../Audio/Audio"


export default function Player({tracks}) {

  const [currentSongIdx, setCurrentSongIdx] = useState(-1);
  const audioRef = useRef();


  //HANDLERS

  function handleNextSong() {
    setCurrentSongIdx(curr => (curr + 1 === tracks.length ? 0 : curr + 1));
  }
  function handlePrevSong() {
    setCurrentSongIdx(curr => (curr - 1 < 0 ? tracks.length - 1 : curr - 1));
  }

  function handlePlay() {
    audioRef.current.play();
  }

  function handlePause() {
    audioRef.current.pause();
  }

  //Fix for the error triggered by pause() being called before the previous play() promise is fulfilled (it resolves only when the audio track is fully loaded ).
  // By playing the audio track only when the audio is fully loaded, it doesn't start to play when you switch quickly because the "canplay" event is never triggered!

  useEffect(() => {
      const audio = audioRef.current
   audio.addEventListener("canplay", handlePlay);
    return () =>
     audio.removeEventListener("canplay", handlePlay);
  }, []);

  //console.log("RERENDERING APP...IS LOADING TRACK?", isLoading, currentSongIdx, prevIdx);
  console.log(tracks)
  return (
    <div>
      <h4>CURRENT SONG:</h4>
      <h5>{tracks && tracks[currentSongIdx]?.name}</h5>
      <Controls
        handleNextSong={handleNextSong}
        handlePrevSong={handlePrevSong}
        handlePlay={handlePlay}
        handlePause={handlePause}
        audioRef={audioRef}
      />
      <div>
        {tracks?.map(({ name }, idx) => (
          <TrackInfo
            key={name + idx}
            color={idx === currentSongIdx ? "green" : "red"}
            data={{ name }}
            setCurrentSongIdx={setCurrentSongIdx}
            idx={idx}
          />
        ))}
      </div>
      ;
      <Audio src={tracks && tracks[currentSongIdx]?.src} audioRef={audioRef} />
    </div>
  );
}



// CUSTOM HOOK

function usePreviousProp(prop) {
  const ref = useRef("No props yet!");
  useEffect(() => {
    ref.current = prop;
  });
  return ref.current;
}
