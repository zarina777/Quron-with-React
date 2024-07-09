import { useRef } from "react";
import { useState } from "react";
import { createContext } from "react";

const Context = createContext();

function ProvideContext({ children }) {
  const [theSurah, setTheSurah] = useState(
    localStorage.getItem("surahNumber")
      ? localStorage.getItem("surahNumber")
      : 1
  );
  const [mode, setMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "day"
  );
  const [audio, setAudio] = useState(null);
  const [listOfAudio, setListOfAudio] = useState([]);
  const [close, setClose] = useState(true);
  const [bar, openBar] = useState(false);
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("savedAyahs"))
      ? JSON.parse(localStorage.getItem("savedAyahs"))
      : []
  );
  const audioRef = useRef();
  let [Index, setIndex] = useState(
    listOfAudio.findIndex((el) => {
      return el.audio == audioRef.current.src;
    })
  );
  return (
    <Context.Provider
      value={{
        setMode,
        mode,
        theSurah,
        setTheSurah,
        audio,
        setAudio,
        audioRef,
        close,
        setClose,
        saved,
        setSaved,
        listOfAudio,
        setListOfAudio,
        Index,
        setIndex,
        bar,
        openBar,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Context, ProvideContext };
