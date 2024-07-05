import clsx from "clsx";
import cn from "./style.module.scss";

const Container = ({ children, className }) => {
  return <div className={clsx(cn.Container, className)}>{children}</div>;
};
export default Container;
