import React from "react";

import classes from "./SidebarItems.module.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import SubSidebarItems from "./SubSidebarItems/SubSidebarItems";
import RoutePathName from "../../../../routePathName";
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
