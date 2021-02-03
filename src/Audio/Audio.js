export default  function Audio({ src, audioRef }) {
    return (
      <>
        <audio ref={audioRef} src={src} />
      </>
    );
  }
