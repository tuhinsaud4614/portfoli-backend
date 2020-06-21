import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";

import TCell from "../TCell/TCell";
import classes from "./TRow.module.css";

type ChildCmp = React.FC | string;

interface Props {
  id: string;
  index: string | number;
  cmp: ChildCmp[];
  deleteConfig?: {
    method: (id: string) => void;
  };
}

const TRow: React.FC<Props> = ({ index, cmp, id, deleteConfig }) => {
  const history = useHistory();

  return (
    <tr className={`${classes.TRow}`}>
      <th scope="row">{index}</th>
      {cmp.map((Value: ChildCmp, i: number) => {
        return (
          <TCell key={i}>{typeof Value === "string" ? Value : <Value />}</TCell>
        );
      })}
      <TCell>
        <div style={{ width: "max-content" }}>
          <Link
            className={`btn ${classes.EditLink} mr-3`}
            to={`${history.location.pathname}/edit/${id}`}
          >
            <FontAwesomeIcon icon={faPen} />
          </Link>
          {deleteConfig && (
            <button
              type="button"
              className={`btn ${classes.DeleteLink}`}
              onClick={() => deleteConfig.method(id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </TCell>
    </tr>
  );
};

export default TRow;
