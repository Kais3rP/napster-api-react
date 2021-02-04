import React from "react"

export default function TrackInfo({ data: { name }, color, setCurrentSongIdx, idx }) {
    return (
      <>
        <h2
          onClick={() => setCurrentSongIdx(idx)}
          style={{ color, cursor: "pointer" }}
        >
          ALBUM: {name}
        </h2>
      </>
    );
  }

  