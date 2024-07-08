import clsx from "clsx";
import { useContext } from "react";
import cn from "./style.module.scss";
import { Context } from "../../context";

const Button = ({ children, className }) => {
  const { mode } = useContext(Context);
  return (
    <div
      className={clsx(
        cn.Button,
        className,
        mode == "night" ? cn.night : cn.day
      )}
    >
      {children}
    </div>
  );
};

export default Button;
