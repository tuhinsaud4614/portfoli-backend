import React, { useEffect } from "react";

import classes from "./notificationModal.module.css";
import ListItem from "../UI/listItem/listItem";
import { Link } from "react-router-dom";
import RoutePathName from "../../pages/routePathName";

interface Props {
  modalShowed: () => void;
  show: boolean;
}

const NotificationModal: React.FC<Props> = ({ modalShowed, show }) => {
  useEffect(() => {
    window.addEventListener("click", (event: MouseEvent) => {
      if ((event.target as any).classList[0] === classes.NotificationModal) {
        modalShowed();
      }
    });
  });
  return (
    <div
      className={`${classes.NotificationModal} ${
        show === true ? "" : classes.DeActive
      }`}
    >
      <div className={`card ${classes.NotificationModalDialog} shadow rounded`}>
        <div
          className={`card-header ${classes.NotificationModalDialogTitleBar} d-flex align-items-center justify-content-between`}
        >
          <h5>Notifications</h5>
          <span>Mark All As Read</span>
        </div>
        <div className="list-group list-group-flush">
          <ListItem />
          <ListItem />
        </div>
        <div className="card-footer text-center">
          <Link to={RoutePathName.ADMIN_NOTIFICATIONS} onClick={modalShowed}>
            SHOW MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
