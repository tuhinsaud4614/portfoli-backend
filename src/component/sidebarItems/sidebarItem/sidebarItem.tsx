import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./sidebarItem.module.css";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  link: string;
  iconName: IconDefinition;
}

const SidebarItem: React.FC<Props> = ({ iconName, link, children }) => {
  return (
    <NavLink
      // id={link}
      className={`d-flex align-items-center my-1 ${classes.SidebarItem}`}
      to={link}
      activeClassName={classes.Active}
      exact
    >
      <FontAwesomeIcon icon={iconName} />
      <p>{children}</p>
    </NavLink>
  );
};

export default SidebarItem;
