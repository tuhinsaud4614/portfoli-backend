import React from "react";
import { Link } from "react-router-dom";

import classes from "./listItem.module.css";

const listItem: React.FC = () => {
  return (
    <Link
      to="#"
      className={`list-group-item list-group-item-action flex-column align-items-start ${classes.ListItem}`}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">List group item heading</h5>
        <small>3 days ago</small>
      </div>
      <p className="mb-1">
        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
        risus varius blandit.
      </p>
    </Link>
  );
};

export default listItem;
