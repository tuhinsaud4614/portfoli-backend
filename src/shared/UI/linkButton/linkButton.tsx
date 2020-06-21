import React from "react";
import { Link } from "react-router-dom";
import classes from "./linkButton.module.css";

interface Props {
  title: string;
  link: string;
}

const LinkButton: React.FC<Props> = ({ title, link }) => {
  return (
    <Link className={`btn shadow ${classes.LinkButton}`} to={link}>
      {title}
    </Link>
  );
};

export default LinkButton;
