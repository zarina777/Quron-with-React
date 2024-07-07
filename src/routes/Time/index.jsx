import { useRef } from "react";
import cn from "./style.module.scss";
import districts from "./data/data";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useState } from "react";

const Time = () => {
  let [region, setRegion] = useState(
    localStorage.getItem("namazTime")
      ? localStorage.getItem("namazTime")
      : "Toshkent"
  );
  useEffect(() => {
    axios(`https://islomapi.uz/api/present/day?region=${region}`).then((res) =>
      console.log(res.data)
    );
  }, [region]);

  function getRegionTime(event) {
    setRegion(event.target.value);
  }
  return (
    <div className={cn.namazTime}>
      <h2>Namaz Times</h2>
      <label className={cn.district}>
        <h4>The name of district</h4>
        <select onChange={getRegionTime}>
          {districts.map((el) => {
            return (
              <option key={uuidv4()} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </label>
      <ul className={cn.times_wrap}>
        <li></li>
      </ul>
    </div>
  );
};

export default Time;
