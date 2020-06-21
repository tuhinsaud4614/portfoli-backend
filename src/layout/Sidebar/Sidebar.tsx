import React from "react";
// import {NavLink} from "react-router-dom";

import UserImg from "../../img/profile.jpg";
import classes from "./Sidebar.module.css";
import UserBrand from "../../shared/UI/userBrand/userBrand";
import SidebarItems from "./components/SidebarItems/SidebarItems";

const sidebar:React.FC = () => {
  return (
    <div className={`d-flex flex-column ${classes.Sidebar}`}>
      <UserBrand logo={UserImg} name="tuhin saud" email="tuhin@gmail.com" />
      <SidebarItems />
    </div>
  );
};

export default sidebar;
