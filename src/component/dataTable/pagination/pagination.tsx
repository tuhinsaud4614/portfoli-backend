import React, { useState } from "react";
import classes from "./pagination.module.css";

interface Props {
  pages: number;
  pageItemsHandler: (index: number) => void;
}

const Pagination: React.FC<Props> = ({ pages, pageItemsHandler }) => {
  //   console.log(pages, Math.ceil(pages));
  const [tabIndex, setTabIndex] = useState<number>(0);

  const changeTabIndexHandler = (value: number) => {
    setTabIndex(value);
    pageItemsHandler(value);
  };

  const forwardBackwardHandler = (value: number) => {
    const newTabIndex = tabIndex + value;

    if (value === 1 && newTabIndex < Math.ceil(pages)) {
      setTabIndex(newTabIndex);
      pageItemsHandler(newTabIndex);
    }

    if (value === -1 && newTabIndex >= 0) {
      setTabIndex(newTabIndex);
      pageItemsHandler(newTabIndex);
    }
  };

  if (pages > 1) {
    const lists = [];
    for (let i = 0; i < Math.ceil(pages); i++) {
      lists.push(
        <li
          className={`page-item`}
          key={i}
          onClick={() => changeTabIndexHandler(i)}
        >
          <span className={`page-link ${tabIndex === i ? classes.Active : ""}`}>
            {i + 1}
          </span>
        </li>
      );
    }

    return (
      <nav className={`${classes.Pagination} d-flex justify-content-center`}>
        <ul className="pagination p-3 m-0">
          {tabIndex === 0 ? (
            <li className="page-item">
              <span className={`page-link ${classes.Disabled}`}>Previous</span>
            </li>
          ) : (
            <li
              className="page-item"
              onClick={() => forwardBackwardHandler(-1)}
            >
              <span className="page-link">Previous</span>
            </li>
          )}

          {lists}

          {tabIndex === Math.ceil(pages) - 1 ? (
            <li className="page-item">
              <span className={`page-link ${classes.Disabled}`}>Next</span>
            </li>
          ) : (
            <li className="page-item" onClick={() => forwardBackwardHandler(1)}>
              <span className="page-link">Next</span>
            </li>
          )}
        </ul>
      </nav>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default Pagination;
