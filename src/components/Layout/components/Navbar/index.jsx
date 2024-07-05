import { useContext } from "react";
import { Context } from "../../../../context";
import Button from "../../../Button";
import cn from "./style.module.scss";

const Navbar = () => {
  const { mode, setMode } = useContext(Context);
  return (
    <div className={cn.Navbar}>
      <div className={cn.logo}>
        <img width={"60px"} src="./src/assets/images/logo.png" alt="" />
        <div className={cn.name}>
          <h3>Quran Mazid</h3>
          <p>Read and Learn The Noble Quran</p>
        </div>
      </div>

      <ul className={cn.controls}>
        <li>
          <Button>
            <i className="fa-solid fa-gear"></i>
          </Button>
        </li>
        <li
          onClick={() => {
            console.log("first");
            setMode((prev) => {
              localStorage.setItem("mode", prev == "day" ? "night" : "day");
              return prev == "day" ? "night" : "day";
            });
          }}
        >
          <Button>
            {mode == "day" ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-sun"></i>
            )}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
