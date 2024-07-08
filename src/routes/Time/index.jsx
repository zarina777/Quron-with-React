import cn from "./style.module.scss";
import districts from "./data/data";
import { useEffect, useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import clsx from "clsx";

const Time = () => {
  let [region, setRegion] = useState(
    localStorage.getItem("namazTime")
      ? localStorage.getItem("namazTime")
      : "Toshkent"
  );
  let [loader, setLoader] = useState(false);
  let [times, setTimes] = useState(null);

  useEffect(() => {
    setLoader(true);
    axios(`https://islomapi.uz/api/present/day?region=${region}`)
      .then((res) => {
        let arr = Object.entries(res.data.times);
        setTimes(arr);
        localStorage.setItem("namazTime", region);
        setLoader(false);
      })
      .catch(() => {
        setTimes(null);
        setLoader(false);
      });
  }, [region]);

  const getRegionTime = (event) => {
    setRegion(event.target.value);
  };

  const getMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const date = new Date();
  const now = date.getHours() * 60 + date.getMinutes();

  let upcomingTime = null;
  if (times) {
    const upcomingTimes = times
      .map((el) => [el[0], getMinutes(el[1])])
      .filter((el) => el[1] > now);

    if (upcomingTimes.length > 0) {
      upcomingTime = upcomingTimes.reduce((min, el) =>
        el[1] < min[1] ? el : min
      );
    } else {
      upcomingTime = times[0];
    }
  }

  return (
    <div className={cn.namazTime}>
      <h2>Namaz Times</h2>
      <label className={cn.district}>
        <p>Choose the name of district</p>
        <select value={region} onChange={getRegionTime}>
          {districts.map((el) => (
            <option key={uuidv4()} value={el}>
              {el}
            </option>
          ))}
        </select>
      </label>
      {loader && (
        <div className={cn.loader_wrap}>
          <div className={cn.loader}></div>
        </div>
      )}
      {!loader && !times && <p>Cannot access data...</p>}
      {times && (
        <ul className={cn.times_wrap}>
          {times.map((el) => {
            const isUpcoming = upcomingTime && el[0] === upcomingTime[0];
            return (
              <li
                className={clsx(isUpcoming ? cn.upcoming : cn.times_li)}
                key={uuidv4()}
              >
                <h4 className={cn.name_time}>
                  {el[0].charAt(0).toUpperCase() +
                    el[0].slice(1).split("_").join(" ") +
                    " vaqti" +
                    ": "}
                </h4>
                <span>{el[1]}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default memo(Time);
