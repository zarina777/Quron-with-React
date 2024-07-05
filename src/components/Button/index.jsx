import clsx from "clsx";
import cn from "./style.module.scss";

const Button = ({ children, className }) => {
  return <div className={clsx(cn.Button, className)}>{children}</div>;
};

export default Button;
