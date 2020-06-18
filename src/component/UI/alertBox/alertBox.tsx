import React from "react";

type Type = "danger" | "warning" | "primary" | "success" | "dark" | "info";

interface Props {
  message: string;
  type?: Type;
}

const AlertBox: React.FC<Props> = ({ message, type = "danger" }) => {
  return (
    <div
      className={`alert alert-${type}`}
      style={{ fontSize: "1.6rem" }}
      role="alert"
    >
      {message}
    </div>
  );
};

export default AlertBox;
