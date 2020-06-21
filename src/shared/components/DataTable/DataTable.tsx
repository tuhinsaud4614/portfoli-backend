import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./DataTable.module.css";
import TRow from "./TRow/TRow";
import THead from "./THead/THead";
import Pagination from "./Pagination/Pagination";

type ChildCmp = React.FC | string;

interface Props {
  columns: string[];
  data: {
    id: string;
    cmp: ChildCmp[];
  }[];
  deleteConfig?: {
    method: (id: string) => void;
  };
}

const DataTable: React.FC<Props> = (props) => {
  const [entries, setEntries] = useState<number>(5);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [bodiesData, setBodiesData] = useState<
    {
      id: string;
      cmp: ChildCmp[];
    }[]
  >([]);

  const bodiesDataHandler = (tab: number, entry: number) => {
    const newData = [...props.data];
    if (newData.length - tab * entry > entry) {
      // console.log(newData.splice(tab * entry, entry));
      setBodiesData(newData.splice(tab * entry, entry));
    } else {
      // console.log(newData.slice(tab * entry));
      setBodiesData(newData.slice(tab * entry));
    }
  };
  useEffect(() => {
    setBodiesData(props.data.slice(0, entries));
    // console.log(props.data);
  }, []);
  // console.log(bodiesData);

  const entriesChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = +e.target.value;
    if (currentValue < 5) {
      currentValue = 5;
    } else if (currentValue > 20) {
      currentValue = 20;
    }
    setEntries(currentValue);
    bodiesDataHandler(currentTab, currentValue);
  };

  const pageItemsHandler = (tab: number) => {
    setCurrentTab(tab);
    bodiesDataHandler(tab, entries);
  };

  return (
    <div className={`${classes.DataTable}`}>
      {/* Header START */}
      <div
        className={`${classes.DataTableHeader} p-3 d-flex justify-content-between`}
      >
        <div className={`${classes.DataTableActions}`}>
          <div
            className={`${classes.DataTableEntry} d-flex align-items-center`}
          >
            Show
            <input
              type="number"
              min="5"
              max="20"
              step="5"
              value={entries}
              onChange={entriesChangeHandler}
            />
            entries
          </div>
        </div>
        <div className={`${classes.DataTableQuery} d-flex align-items-center`}>
          <input type="search" placeholder="Search here" />
          <span style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>
      {/* Header END */}
      {/* Body START */}
      <table
        className="table m-0"
        style={{ border: "1px solid #eee" }}
      >
        <thead>
          <tr>
            <THead values={props.columns}></THead>
          </tr>
        </thead>
        <tbody>
          {bodiesData.map(
            (item: { id: string; cmp: ChildCmp[] }, index: number) => {
              return (
                <TRow
                  key={item.id}
                  index={index + 1}
                  id={item.id}
                  cmp={item.cmp}
                  deleteConfig={props.deleteConfig}
                ></TRow>
              );
            }
          )}
        </tbody>
      </table>
      {/* Body END */}
      <Pagination
        pages={props.data.length > entries ? props.data.length / entries : 0}
        pageItemsHandler={pageItemsHandler}
      />
      {/* <Pagination pages={20} pageItemsHandler={pageItemsHandler}/> */}
    </div>
  );
};

export default DataTable;
