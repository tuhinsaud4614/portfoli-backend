import React from "react";
import classes from "./listTile.module.css";

interface Props {
  lead: string;
  title: string;
  subTitle: string;
}

const ListTile: React.FC<Props> = ({lead, title, subTitle}) => {
  return (
    <>
      <img
        src={lead}
        alt="user-img"
        className={`d-block mr-2 ${classes.Lead}`}
      />
      <div className={`d-flex flex-column justify-content-center`}>
        <p className="m-0">{title}</p>
        <p className="m-0">{subTitle}</p>
      </div>
    </>
  );
};

export default ListTile;
