import React, { useState } from "react";

import classes from "./SubSidebarItems.module.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import RoutePathName from "../../../../../routePathName";
import {
  faClipboard,
  faLightbulb,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubSidebarItems: React.FC = () => {
  const [isClickedOwnerState, setClickedOwner] = useState<boolean>(false);

  const swapOwnerListHandler = (): void => {
    setClickedOwner(!isClickedOwnerState);
  };

  return (
    <ul
      className={`d-flex flex-column ${classes.NestedSidebarItems} ${
        isClickedOwnerState ? classes.Active : ""
      }`}
    >
      <p
        className={`d-flex align-items-center justify-content-between m-0`}
        onClick={swapOwnerListHandler}
      >
        Owner{" "}
        <span>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
      </p>
      {isClickedOwnerState ? (
        <>
          <SidebarItem
            link={RoutePathName.ADMIN_OWNER_PROJECTS}
            iconName={faClipboard}
          >
            Projects
          </SidebarItem>
          <SidebarItem
            link={RoutePathName.ADMIN_OWNER_TECHNOLOGY}
            iconName={faLightbulb}
          >
            Technologies
          </SidebarItem>
        </>
      ) : null}
    </ul>
  );
};

export default SubSidebarItems;
