import clsx from "clsx";
import { useState, useEffect, useContext, memo } from "react";
import api from "../../../../api";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../../../../context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cn from "./style.module.scss";

const Surah = () => {
  const {
    theSurah,
    setAudio,
    audio,
    audioRef,
    setClose,
    saved,
    setSaved,
    mode,
    setListOfAudio,
    listOfAudio,
    setIndex,
    openBar,
  } = useContext(Context);

  const [info, setInfo] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loader, setLoader] = useState(false);
  const [audioAyah, setAudioAyahs] = useState([]);

  useEffect(() => {
    if (theSurah) {
      setLoader(true);
      api
        .get(`${theSurah}`)
        .then((data) => {
          setInfo(data.data.data);
          setLoader(false);
        })
        .catch((er) => {
          setLoader(false);
          console.log(er);
        });
      api
        .get(`${theSurah}/en.ahmedali`)
        .then((data) => {
          setLoader(false);
          setTranslation(data.data.data);
        })
        .catch((er) => {
          console.log(er);
        });

      api
        .get(`${theSurah}/ar.alafasy`)
        .then((data) => setAudioAyahs(data.data.data.ayahs));
    }
  }, [theSurah]);

  useEffect(() => {
    if (info && audioAyah.length && translation) {
      const list = info.ayahs.map((el, index) => ({
        audio: audioAyah[index]?.audio,
        name: info.englishName,
        arabicName: translation.name,
        number: `${theSurah}:${index + 1}`,
      }));
      setListOfAudio(list);
    }
  }, [info, audioAyah, translation, setListOfAudio]);

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        const currentIndex = listOfAudio.findIndex(
          (el) => el.audio === audioRef.current.src
        );
        const nextIndex = currentIndex + 1;
        if (nextIndex < listOfAudio.length) {
          setAudio(listOfAudio[nextIndex]);
          setIndex(nextIndex);
          audioRef.current.play();
        }
      };

      audioRef.current.addEventListener("ended", handleEnded);

      return () => {
        audioRef.current.removeEventListener("ended", handleEnded);
      };
    }
  }, [listOfAudio, audioRef, setAudio, setIndex]);

  return (
    <div className={clsx(cn.container)}>
      <span
        onClick={() => {
          openBar((prev) => !prev);
        }}
        className={cn.bar}
      >
        <i className="fa-solid fa-bars-staggered"></i>
      </span>
      <ToastContainer />
      <div className={clsx(cn.surah)}>
        {loader && (
          <div className={cn.loader_wrap}>
            <div className={cn.loader}></div>
          </div>
        )}
        {info && translation && (
          <>
            <div
              className={clsx(
                cn.heading,
                cn.Surah,
                mode === "night" ? cn.night : ""
              )}
            >
              <h3>{info.englishName}</h3>
              <span>
                Ayah - {info.ayahs.length} , {info.revelationType}
              </span>
            </div>
            {info.ayahs.map((el, index) => {
              return (
                <div
                  className={clsx(
                    cn.ayahs,
                    cn.Surah,
                    mode === "night" ? cn.night : "",
                    audio?.audio === audioAyah[index]?.audio ? cn.exact : ""
                  )}
                  key={uuidv4()}
                >
                  <div className={cn.controls}>
                    <span className={cn.ayah_num}>
                      {theSurah}:{index + 1}
                    </span>
                    <button
                      onClick={() => {
                        setClose(false);
                        setAudio({
                          audio: audioAyah[index]?.audio,
                          name: info.englishName,
                          arabicName: translation.name,
                          number: `${theSurah}:${index + 1}`,
                        });
                        setIndex(index);
                        setTimeout(() => {
                          audioRef.current.play();
                        }, 0);
                      }}
                    >
                      {audio?.audio === audioAyah[index]?.audio ? (
                        <i className="fa-regular fa-circle-stop"></i>
                      ) : (
                        <i className={`fa-solid fa-play`}></i>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        const isSaved = saved.some(
                          (savedEl) =>
                            savedEl.number === `${theSurah}:${index + 1}`
                        );
                        if (!isSaved) {
                          setSaved((prev) => [
                            {
                              text: el.text,
                              translation: translation.ayahs[index]?.text,
                              audio: audioAyah[index].audio,
                              name: info.englishName,
                              arabicName: translation.name,
                              number: `${theSurah}:${index + 1}`,
                            },
                            ...prev,
                          ]);
                          toast.success("Bookmark is saved");
                        } else {
                          setSaved((prev) =>
                            prev.filter(
                              (savedEl) =>
                                savedEl.number !== `${theSurah}:${index + 1}`
                            )
                          );
                          toast.error("Bookmark is deleted");
                        }
                        localStorage.setItem(
                          "savedAyahs",
                          JSON.stringify(saved)
                        );
                      }}
                    >
                      {saved.some(
                        (savedEl) =>
                          savedEl.number === `${theSurah}:${index + 1}`
                      ) ? (
                        <i className="fa-solid fa-bookmark"></i>
                      ) : (
                        <i className="fa-regular fa-bookmark"></i>
                      )}
                    </button>
                  </div>
                  <div className={cn.text_wrapper}>
                    <div className={cn.text_arabic}>{el.text}</div>
                    <div className={cn.text_tranlation}>
                      {translation.ayahs[index]?.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Surah);
