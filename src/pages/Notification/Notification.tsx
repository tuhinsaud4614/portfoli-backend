import React from "react";

// import classes from "./Notification.module.css";
import Logo from "../../img/account.svg";
import ListTile from "../../shared/UI/listTile/listTile";

const Notification:React.FC = () => {
  const list = [];
  for (let i = 0; i < 30; i++) {
    list.push(
      <div key={i} className={`list-group-item list-group-item-action d-flex`}>
        <ListTile lead={Logo} title="User" subTitle="31min" />
      </div>
    );
  }
  return (
    <div className={`card h-100`}>
      <div className={`card-header p-2`}>
        <h3 className={`m-0`}>Notifications</h3>
      </div>
      <div className={`card-body p-2`}>
        <div className={`list-group list-group-flush`}>{list}</div>
      </div>
      {/* <div className={`card-footer`}></div> */}
    </div>
  );
};

export default Notification;
