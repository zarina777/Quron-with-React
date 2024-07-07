import clsx from "clsx";
import { useContext } from "react";
import { Context } from "../../context";
import { v4 as uuidv4 } from "uuid";
import cn from "./style.module.scss";

// {
//   text: el.text,
//   translation: translation.ayahs[index]?.text,
//   audio: audioAyah[index].audio,
//   name: info.englishName,
//   arabicName: translation.name,
//   number: `${theSurah + ":" + (index + 1)}`,
// }
const Saved = () => {
  const { saved, setSaved, setClose, setAudio } = useContext(Context);
  return (
    <div className={cn.SavedSurahs}>
      <h2>Saved Ayahs</h2>
      <div className={cn.savedAyahs_wrap}>
        {saved?.map((el) => {
          return (
            <div className={clsx(cn.ayahs, cn.Surah)} key={uuidv4()}>
              <div className={cn.controls}>
                <span className={cn.ayah_num}>{el.number}</span>
                <button
                  onClick={() => {
                    setClose(false);
                    setAudio({
                      audio: el.audio,
                      name: el.name,
                      arabicName: el.arabicName,
                      number: el.number,
                    });
                  }}
                >
                  <i className="fa-solid fa-play"></i>
                </button>
                <button
                  onClick={() => {
                    setSaved((prev) => {
                      return prev.filter((prevEl) => {
                        if (prevEl.number !== el.number) {
                          return prevEl;
                        }
                      });
                    });
                    console.log(saved);
                    localStorage.setItem("savedAyahs", JSON.stringify(saved));
                  }}
                >
                  <i className="fa-solid fa-bookmark"></i>
                </button>
              </div>
              <div className={cn.text_wrapper}>
                <div className={cn.text_arabic}> {el.text}</div>
                <div className={cn.text_tranlation}>{el.translation}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Saved;
