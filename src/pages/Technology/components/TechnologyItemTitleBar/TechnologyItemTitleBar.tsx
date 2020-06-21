import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  icon: IconDefinition;
}

const TechnologyItemTitleBar: React.FC<Props> = ({ title, icon }) => {
  return (
    <div
      style={{
        background: "rgba(var(--accent-color-rgb),0.5)",
        color: "var(--secondary-color)",
        fontSize: " 1.5rem",
        fontWeight: "bold",
      }}
      className={`p-3`}
    >
      <FontAwesomeIcon icon={icon} />
    <span className="ml-4">{title}</span>
    </div>
  );
};

export default TechnologyItemTitleBar;
