import React from "react";
import classes from "./tagList.module.css";
import Skill from "../../../../model/skill";

interface Props {
  clicked: (value: Skill) => void;
  skills: Skill[];
}

const TagList: React.FC<Props> = ({ clicked, skills }) => {
  return (
    <ul className={`list-group ${classes.TagList}`}>
      {skills.map((item: Skill) => {
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
