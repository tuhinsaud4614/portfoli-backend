import React from "react";
import classes from "./tagList.module.css";
import { Technique } from "../../../../model";

interface Props {
  clicked: (value: Technique) => void;
  skills: Technique[];
}

const TagList: React.FC<Props> = ({ clicked, skills }) => {
  return (
    <ul className={`list-group ${classes.TagList}`}>
      {skills.map((item: Technique) => {
        return (
          <li
            key={item.id}
            className={`list-group-item ${classes.TagListItem}`}
            onClick={() => clicked(item)}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export default TagList;
