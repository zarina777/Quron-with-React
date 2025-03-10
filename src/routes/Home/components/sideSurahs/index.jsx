import clsx from "clsx";
import { memo } from "react";
import { useContext } from "react";
import { Context } from "../../../../context";
import cn from "./style.module.scss";

const SideSurahs = ({ data }) => {
  let { setTheSurah, theSurah, mode, openBar } = useContext(Context);
  return (
    <ul className={clsx(cn.surahs, mode == "night" ? cn.night : "")}>
      {data?.map((el) => {
        return (
          <li
            className={theSurah == el.number ? cn.onSurah : ""}
            onClick={() => {
              setTheSurah(el.number);
              localStorage.setItem("surahNumber", JSON.stringify(el.number));
              openBar(false);
            }}
            key={el.number}
          >
            <div className={cn.english}>
              <span>{el.number}</span>
              <div className={cn.name}>
                <h3>{el.englishName}</h3>
                <p>{el.englishNameTranslation}</p>
              </div>
            </div>
            <p className={cn.arabic}>{el.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(SideSurahs);
