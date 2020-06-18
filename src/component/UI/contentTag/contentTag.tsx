import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import classes from "./contentTag.module.css";

interface Props {
  iconName: IconDefinition;
  categoryName: [string, string];
  title: string
}

const ContentTag: React.FC<Props> = ({iconName, categoryName, title}) => {
  return (
    <div
      className={`${classes.ContentTag} d-flex justify-content-between align-items-center rounded`}
    >
      <div>
        <FontAwesomeIcon icon={iconName} />
      </div>
      <h3>
        {categoryName[0]} <strong>{categoryName[1]}</strong>
        <br />
        <small>{title}</small>
      </h3>
    </div>
  );
};

export default ContentTag;
