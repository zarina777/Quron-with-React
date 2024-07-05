import clsx from "clsx";
import React from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../../context";
import Sidebar from "../Sidebar";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import cn from "./style.module.scss";

const Layout = () => {
  const { mode } = useContext(Context);
  return (
    <div className={clsx(cn.layout, mode == "day" ? cn.day : cn.night)}>
      <Navbar />
      <div className={cn.flex}>
        <Sidebar />
        <div className={cn.route_wrap}>
          <Outlet />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;
