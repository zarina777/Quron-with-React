import { useContext } from "react";
import { Context } from "../../context";
import cn from "./style.module.scss";
function Cover() {
  const { bar, openBar } = useContext(Context);
  return (
    <div
      onClick={() => {
        openBar(false);
      }}
      style={bar ? { display: "block" } : { display: "none" }}
      className={cn.BgCover}
    ></div>
  );
}

export default Cover;
