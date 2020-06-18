import React from "react";

const TechnologyForm: React.FC = () => {
  return (
    <div className="card m-3">
      <div
        className={`card-header text-center p-3`}
        style={{
          background: "var(--primary-color)",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "var(--secondary-color)",
        }}
      >
        Add Web Technology
      </div>
    </div>
  );
};

export default TechnologyForm;
