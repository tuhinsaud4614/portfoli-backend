import React from "react";
// import classes from "./progressIndicator.module.css";

interface Props {
  size?: string;
}

const ProgressIndicator: React.FC<Props> = ({ size }) => {
  return (
    <div
      className={"spinner-border "}
      style={{ width: size || "", height: size || "" }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ProgressIndicator;
