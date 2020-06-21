import React, { useState } from "react";

import accountLogo from "../../img/account.svg";
import Logo from "../../img/TUHIN.svg";
import classes from "./Header.module.css";
import NotificationModal from "../../pages/Notification/components/NotificationModal/NotificationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const [isShowed, showModal] = useState<boolean>(false);
  const modalHandler = () => {
    showModal(false);
  };

  const swapHandler = () => {
    showModal(!isShowed);
  };

  return (
    <nav
      className={`sticky-top navbar navbar-expand-sm navbar-dark ${classes.Header}`}
    >
     <span className="navbar-brand">
     <img src={Logo} alt="Logo" className={`${classes.HeaderLogo}`} />
     </span>
      <ul className="navbar-nav ml-auto d-flex flex-row">
        <li
          className={`nav-item d-flex align-items-center ${classes.NavItemContainer}`}
        >
          <span className={classes.NotificationIcon} onClick={swapHandler}>
            <FontAwesomeIcon icon={faBell} />
            <span className={`${classes.NotificationCounter}`}>99+</span>
          </span>
          <NotificationModal modalShowed={modalHandler} show={isShowed} />
        </li>
        <li
          // onClick={props.logOut}
          className={`nav-item d-inline-flex align-items-center ${classes.NavItemContainer}`}
        >
          <img
            src={accountLogo}
            alt="user-logo"
            className={`d-block ${classes.AccountLogo}`}
          />
          <div className={`${classes.AccountLogoutText}`}>LOGOUT</div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
