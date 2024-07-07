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
  const [close, setClose] = useState(true);
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("savedAyahs"))
      ? JSON.parse(localStorage.getItem("savedAyahs"))
      : []
  );
  const audioRef = useRef();
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
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Context, ProvideContext };
