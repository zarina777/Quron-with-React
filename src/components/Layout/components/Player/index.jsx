import { useContext, useEffect } from "react";
import { Context } from "../../../../context";
import cn from "./style.module.scss";

const Player = () => {
  const { audio, audioRef, close, setClose } = useContext(Context);
  useEffect(() => {
    audioRef.current.play();
  }, []);
  return (
    <div
      style={close ? { bottom: "-100%" } : { bottom: "0" }}
      className={cn.Player}
    >
      <div className={cn.info}>
        <div className={cn.name}>
          <h4>{audio?.name}</h4>
          <p>{audio?.arabicName}</p>
        </div>
        <span>{audio?.number}</span>
      </div>
      <audio controls src={audio?.audio} ref={audioRef}></audio>
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
