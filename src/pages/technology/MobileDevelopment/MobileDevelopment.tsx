import React from "react";
import { faMobile } from "@fortawesome/free-solid-svg-icons";

import TechnologyItemTitleBar from "../components/TechnologyItemTitleBar/TechnologyItemTitleBar";

const MobileDevelopment: React.FC = () => {
  return (
    <div className="mb-3 border">
      <TechnologyItemTitleBar title="Mobile Development" icon={faMobile} />
    </div>
  );
};

export default MobileDevelopment;
