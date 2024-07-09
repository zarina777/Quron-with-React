import clsx from "clsx";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api";
import Cover from "../../components/BgCover";
import { Context } from "../../context";
import SideSurahs from "./components/sideSurahs";
import Surah from "./components/Surah";
import cn from "./style.module.scss";

const Home = () => {
  let [surahs, setSurahs] = useState(null);
  let [searchedSurahs, setSearchedSurahs] = useState("");
  let { mode, bar, openBar } = useContext(Context);
  useEffect(() => {
    api.get().then((data) => {
      setSurahs(data.data.data);
    });
  }, []);
  function searchSurah(e) {
    e.target.value;
    let items = surahs.filter((el) => {
      if (
        el.englishName
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        return el;
      }
    });

    setSearchedSurahs(items);
  }

  return (
    <div className={cn.Home}>
      {/* Left Side */}
      <Cover />
      <div
        style={bar ? { left: "0" } : { left: "100%" }}
        className={clsx(cn.sidebar, mode == "night" ? cn.night : "")}
      >
        <div className={cn.search}>
          <input
            onInput={searchSurah}
            placeholder="Search by Surah Name"
            type="text"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {surahs && (
          <SideSurahs data={searchedSurahs == "" ? surahs : searchedSurahs} />
        )}
      </div>
      {/* Right Side */}
      <Surah />
    </div>
  );
};

export default Home;
