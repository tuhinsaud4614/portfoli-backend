import React from "react";

import classes from "./userBrand.module.css";
import ListTile from "../listTile/listTile";

interface Props {
  logo: string;
  name: string;
  email: string;
}

const userBrand: React.FC<Props> = ({logo, name, email}) => {
  return (
    <div className={`d-flex align-items-center ${classes.UserBrand}`}>
      <ListTile lead={logo} title={name} subTitle={email} />
    </div>
  );
};

export default userBrand;
