import clsx from "clsx";
import { useContext } from "react";
import { Context } from "../../context";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cn from "./style.module.scss";

const Saved = () => {
  const {
    saved,
    setSaved,
    setClose,
    audio,
    setAudio,
    mode,
    setListOfAudio,
    setIndex,
    audioRef,
  } = useContext(Context);

  const handlePlayAudio = (el) => {
    setClose(false);
    setAudio({
      audio: el.audio,
      name: el.name,
      arabicName: el.arabicName,
      number: el.number,
    });
    setListOfAudio(saved);

    // Find the current index after the list has been updated
    setTimeout(() => {
      const currentIndex = saved.findIndex((item) => item.audio === el.audio);
      setIndex(currentIndex);
    }, 0);

    // Play the audio
    audioRef.current.play();
  };

  return (
    <div className={cn.SavedSurahs}>
      <ToastContainer />
      <h2>Saved Ayahs</h2>
      <div className={cn.savedAyahs_wrap}>
        {saved?.map((el) => (
          <div
            className={clsx(
              cn.ayahs,
              cn.Surah,
              mode == "night" ? cn.night : "",
              audio?.audio == el.audio ? cn.exact : ""
            )}
            key={uuidv4()}
          >
            <div className={cn.controls}>
              <span className={cn.ayah_num}>{el.number}</span>
              <button onClick={() => handlePlayAudio(el)}>
                {audio?.audio == el.audio ? (
                  <i className="fa-regular fa-circle-stop"></i>
                ) : (
                  <i className={`fa-solid fa-play`}></i>
                )}
              </button>
              <button
                onClick={() => {
                  setSaved((prev) => {
                    return prev.filter((prevEl) => prevEl.number !== el.number);
                  });
                  localStorage.setItem("savedAyahs", JSON.stringify(saved));
                  toast.error("Bookmark is deleted");
                }}
              >
                <i className="fa-solid fa-bookmark"></i>
              </button>
            </div>
            <div className={cn.text_wrapper}>
              <div className={cn.text_arabic}>{el.text}</div>
              <div className={cn.text_tranlation}>{el.translation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
