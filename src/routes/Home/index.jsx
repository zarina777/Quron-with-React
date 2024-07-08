import clsx from "clsx";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api";
import Button from "../../components/Button";
import { Context } from "../../context";
import SideSurahs from "./components/sideSurahs";
import Surah from "./components/Surah";
import cn from "./style.module.scss";

const Home = () => {
  let [surahs, setSurahs] = useState(null);
  let [searchedSurahs, setSearchedSurahs] = useState("");
  let { mode } = useContext(Context);
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
    // if (!items.length && e.target.value) {
    //   setSearchedSurahs(e.target.value);
    // }

    setSearchedSurahs(items);
  }
  return (
    <div className={cn.Home}>
      {/* Left Side */}
      <div className={clsx(cn.sidebar, mode == "night" ? cn.night : "")}>
        <div className={cn.search}>
          <input
            onInput={searchSurah}
            placeholder="Search by Surah Name"
            type="text"
          />
          <Button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
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
