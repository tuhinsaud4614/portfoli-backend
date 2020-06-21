import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { Language } from "../../../../model";
import classes from "./LanguageItem.module.css";

interface Props {
  lang: Language;
  onClick: (id: string) => void;
}

const LanguageItem: React.FC<Props> = ({ lang, onClick }) => {
  return (
    <span className={`p-2 badge shadow-sm ${classes.LanguageItem}`}>
      {lang.name}
      <span
        onClick={() => onClick(lang.id)}
        className={`ml-2 badge badge-danger p-1 ${classes.LanguageDelete}`}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </span>
  );
};

export default LanguageItem;
