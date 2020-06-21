import React from "react";
import classes from "./customBtn.module.css";

interface Props {
  clicked?: (event: React.MouseEvent) => void;
  dataToggle?: string;
  dataTarget?: string;
}

const CustomBtn: React.FC<Props> = ({
  clicked,
  dataTarget,
  dataToggle,
  children,
}) => {
  return (
    <button
      className={`btn col-12 col-sm-6 col-md-4 shadow ${classes.Button}`}
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={clicked}
      type="button"
    >
      {children}
    </button>
  );
};

export default CustomBtn;
