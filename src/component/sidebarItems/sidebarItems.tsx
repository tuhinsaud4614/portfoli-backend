import React from "react";

import classes from "./sidebarItems.module.css";
import SidebarItem from "./sidebarItem/sidebarItem";
import SubSidebarItems from "./subSidebarItems/subSidebarItems";
import RoutePathName from "../../pages/routePathName";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

const SidebarItems: React.FC = () => {
  return (
    <ul className={`d-flex flex-column ${classes.SidebarItems}`}>
      <p>Navigation</p>
      <SidebarItem
        link={RoutePathName.ADMIN_DASHBOARD}
        iconName={faTachometerAlt}
      >
        Dashboard
      </SidebarItem>
      <SubSidebarItems />
    </ul>
  );
};

export default SidebarItems;
