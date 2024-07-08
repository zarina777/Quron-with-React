import clsx from "clsx";
import { useEffect, useContext } from "react";
import { Context } from "../../../../context";
import cn from "./style.module.scss";

const Player = () => {
  const {
    audio,
    audioRef,
    close,
    setClose,
    mode,
    listOfAudio,
    setAudio,
    Index,
    setIndex,
  } = useContext(Context);

  // Handle moving to the next audio track when the current one ends
  useEffect(() => {
    const handleEnded = () => {
      if (listOfAudio[Index + 1]) {
        setAudio(listOfAudio[Index + 1]);
        setIndex(Index + 1);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [Index, listOfAudio]);

  // Handle playing the previous audio track
  const playPrevious = () => {
    if (audioRef.current.src && listOfAudio) {
      const currentIndex = listOfAudio.findIndex(
        (el) => el.audio === audioRef.current.src
      );
      if (listOfAudio[currentIndex - 1]) {
        setAudio(listOfAudio[currentIndex - 1]);
        setIndex(currentIndex - 1);
      }
    }
  };

  // Handle playing the next audio track
  const playNext = () => {
    if (audioRef.current.src && listOfAudio) {
      const currentIndex = listOfAudio.findIndex(
        (el) => el.audio === audioRef.current.src
      );
      if (listOfAudio[currentIndex + 1]) {
        setAudio(listOfAudio[currentIndex + 1]);
        setIndex(currentIndex + 1);
      }
    }
  };

  return (
    <div
      style={close ? { bottom: "-100%" } : { bottom: "0" }}
      className={clsx(cn.Player, mode === "night" ? cn.night : cn.day)}
    >
      <div className={cn.info}>
        <div className={cn.name}>
          <h4>{audio?.name}</h4>
          <p>{audio?.arabicName}</p>
        </div>
        <span>{audio?.number}</span>
      </div>
      <audio autoPlay controls src={audio?.audio} ref={audioRef}></audio>
      <button onClick={playPrevious} className={clsx(cn.cntrl)}>
        <i className="fa-solid fa-backward"></i>
      </button>
      <button onClick={playNext} className={clsx(cn.cntrl)}>
        <i className="fa-solid fa-forward"></i>
      </button>
      <button>
        <i
          onClick={() => {
            setClose(true);
            audioRef.current.pause();
          }}
          className="fa-solid fa-xmark"
        ></i>
      </button>
    </div>
  );
};

export default Player;
