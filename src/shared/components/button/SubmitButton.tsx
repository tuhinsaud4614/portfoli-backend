import React from "react";
import classes from "./SubmitButton.module.css";

interface Props {
  valid: boolean;
}

const SubmitButton: React.FC<Props> = ({ valid, children }) => {
  return (
    <button
      className={`btn ${classes.Button}`}
      disabled={!valid}
      type="submit"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
