import React from "react";
// import {NavLink} from "react-router-dom";

import UserImg from "../../img/profile.jpg";
import classes from "./sidebar.module.css";
import UserBrand from "../../component/UI/userBrand/userBrand";
import SidebarItems from "../../component/sidebarItems/sidebarItems";

const sidebar:React.FC = () => {
  return (
    <div className={`d-flex flex-column ${classes.Sidebar}`}>
      <UserBrand logo={UserImg} name="tuhin saud" email="tuhin@gmail.com" />
      <SidebarItems />
    </div>
  );
};

export default sidebar;
