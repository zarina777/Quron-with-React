import clsx from "clsx";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import api from "../../../../api";
import { Context } from "../../../../context";
import cn from "./style.module.scss";

const Surah = () => {
  const { theSurah, setAudio, audioRef, setClose, saved, setSaved } =
    useContext(Context);

  const [info, setInfo] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loader, setLoader] = useState(false);
  const [audioAyah, setAudioAyahs] = useState(false);

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
  return (
    <div className={cn.surah}>
      {loader && (
        <div className={cn.loader_wrap}>
          <div className={cn.loader}></div>
        </div>
      )}
      {info && translation && (
        <>
          <div className={clsx(cn.heading, cn.Surah)}>
            <h3>{info.englishName}</h3>
            <span>
              Ayah - {info.ayahs.length} , {info.revelationType}
            </span>
          </div>
          {info.ayahs.map((el, index) => {
            return (
              <div className={clsx(cn.ayahs, cn.Surah)} key={el.number}>
                <div className={cn.controls}>
                  <span className={cn.ayah_num}>
                    {theSurah + ":" + (index + 1)}
                  </span>
                  <button
                    onClick={() => {
                      setClose(false);
                      setAudio({
                        audio: audioAyah[index].audio,
                        name: info.englishName,
                        arabicName: translation.name,
                        number: `${theSurah + ":" + (index + 1)}`,
                      });
                      audioRef.current.play();
                    }}
                  >
                    <i className="fa-solid fa-play"></i>
                  </button>
                  <button
                    onClick={() => {
                      if (
                        !saved.filter((el) => {
                          return el.number == `${theSurah + ":" + (index + 1)}`;
                        }).length
                      ) {
                        setSaved((prev) => [
                          ...prev,
                          {
                            text: el.text,
                            translation: translation.ayahs[index]?.text,
                            audio: audioAyah[index].audio,
                            name: info.englishName,
                            arabicName: translation.name,
                            number: `${theSurah + ":" + (index + 1)}`,
                          },
                        ]);
                        localStorage.setItem(
                          "savedAyahs",
                          JSON.stringify(saved)
                        );
                      } else {
                        setSaved((prev) => {
                          return prev.filter((el) => {
                            if (
                              el.number !== `${theSurah + ":" + (index + 1)}`
                            ) {
                              return el;
                            }
                          });
                        });
                        localStorage.setItem(
                          "savedAyahs",
                          JSON.stringify(saved)
                        );
                      }
                    }}
                  >
                    {saved.filter((el) => {
                      return el.number == `${theSurah + ":" + (index + 1)}`;
                    }).length ? (
                      <i className="fa-solid fa-bookmark"></i>
                    ) : (
                      <i className="fa-regular fa-bookmark"></i>
                    )}
                  </button>
                </div>
                <div className={cn.text_wrapper}>
                  <div className={cn.text_arabic}> {el.text}</div>
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
  );
};

export default Surah;
