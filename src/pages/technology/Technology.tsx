import React from "react";
import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";

import RoutePathName from "../routePathName";
import classes from "./Technology.module.css";
import Development from "./Development/Development";
import Language from "./components/Languages/Languages";
import NotFound from "../notFound/notFound";
import {
  faGlobe,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { TechnologyType } from "../../model";

const Technology: React.FC = () => {
  return (
    <div className="p-3">
      <Language />
      <div
        className={`d-flex justify-content-center flex-wrap mb-3 px-2 py-3 ${classes.TechnologyNav}`}
      >
        <NavLink
          activeClassName={`shadow ${classes.Active}`}
          className={`badge badge-pill p-2 ${classes.TechnologyNavItem}`}
          to={RoutePathName.ADMIN_OWNER_TECHNOLOGY_WEB_DEVELOPMENT}
        >
          Web Development
        </NavLink>
        <NavLink
          activeClassName={`shadow ${classes.Active}`}
          className={`badge badge-pill p-2 ${classes.TechnologyNavItem}`}
          to={RoutePathName.ADMIN_OWNER_TECHNOLOGY_MOBILE_DEVELOPMENT}
        >
          Mobile Development
        </NavLink>
        <NavLink
          activeClassName={`shadow ${classes.Active}`}
          className={`badge badge-pill p-2 ${classes.TechnologyNavItem}`}
          to={RoutePathName.ADMIN_OWNER_TECHNOLOGY_DATABASE_DEVELOPMENT}
        >
          Database Development
        </NavLink>
      </div>

      <Switch>
        <Route
          exact
          path={RoutePathName.ADMIN_OWNER_TECHNOLOGY_WEB_DEVELOPMENT}
        >
          <Development
            icon={faGlobe}
            title="Web Development"
            technologyType={TechnologyType.WEB_DEVELOPMENT}
          />
        </Route>
        <Route
          exact
          path={RoutePathName.ADMIN_OWNER_TECHNOLOGY_MOBILE_DEVELOPMENT}
        >
          <Development
            icon={faMobileAlt}
            title="Mobile Development"
            technologyType={TechnologyType.MOBILE_DEVELOPMENT}
          />
        </Route>
        <Route
          exact
          path={RoutePathName.ADMIN_OWNER_TECHNOLOGY_DATABASE_DEVELOPMENT}
        >
          <Development
            icon={faGlobe}
            title="Database Development"
            technologyType={TechnologyType.DATABASE_DEVELOPMENT}
          />
        </Route>
        <Route exact path={RoutePathName.ADMIN_OWNER_TECHNOLOGY}>
          <p
            className={`m-0 text-center`}
            style={{
              fontSize: "1.4rem",
              color: "var(--secondary-color)",
              fontWeight: "bold",
            }}
          >
            Select a technology
          </p>
        </Route>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
};

export default Technology;
