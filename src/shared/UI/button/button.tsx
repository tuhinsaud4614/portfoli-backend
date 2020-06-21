import React from "react";
import classes from "./button.module.css";

interface Props {
  valid: boolean;
  clicked: () => void
}

const Button: React.FC<Props> = ({ valid, children, clicked }) => {
  return (
    <button
      className={`btn shadow ${classes.Button}`}
      disabled={!valid}
      onClick={clicked}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
