import React from "react";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import TechnologyItemTitleBar from "../components/TechnologyItemTitleBar/TechnologyItemTitleBar";
import TechnologyForm from "../components/TechnologyForm/TechnologyForm";

const WebDevelopment: React.FC = () => {
  return (
    <div className="mb-3 border">
      <TechnologyItemTitleBar title="Web Development" icon={faGlobe} />
      <TechnologyForm />
    </div>
  );
};

export default WebDevelopment;
