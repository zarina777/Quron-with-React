import clsx from "clsx";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import cn from "./style.module.scss";
const Sidebar = () => {
  return (
    <div className={clsx(cn.Sidebar)}>
      <ul>
        <NavLink to="/">
          <Button>
            <i className="fa-solid fa-book-open"></i>
          </Button>
        </NavLink>
        <NavLink to="time">
          <Button>
            <i className="fa-regular fa-clock"></i>
          </Button>
        </NavLink>
        <NavLink to="saved">
          <Button>
            <i className="fa-regular fa-bookmark"></i>
          </Button>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
