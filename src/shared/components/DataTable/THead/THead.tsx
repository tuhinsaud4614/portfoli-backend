import React from "react";

interface Props {
  values: string[];
}

const THead: React.FC<Props> = ({ values }) => {
  return (
    <React.Fragment>
      <th>No</th>
      {values.map((value: string, index: number) => (
        <th key={index}>{value}</th>
      ))}
      <th></th>
    </React.Fragment>
  );
};

export default THead;
