import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import RoutePathName from "./routePathName";
import Header from "./layout/Header/Header";
import Sidebar from "./layout/Sidebar/Sidebar";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notification from "./pages/Notification/Notification";
import Project from "./pages/Project/Project";
import AddProject from "./pages/AddProject/AddProject";
import Technology from "./pages/Technology/Technology";
import NotFound from "./pages/NotFound/NotFound";
import EditProject from "./pages/EditProject/EditProject";

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path={RoutePathName.ADMIN_AUTH} exact component={Auth}></Route>
      <Route path="/">
        <Header />
        <div className="row m-0 p-0 Content">
          <div className="col-sm-3 col-md-2 p-0 m-0">
            <Sidebar />
          </div>
          <div className="col-sm-9 col-md-10 p-0 m-0 Content-body">
            <Switch>
              <Route
                path={RoutePathName.ADMIN_DASHBOARD}
                exact
                component={Dashboard}
              ></Route>
              <Route
                path={RoutePathName.ADMIN_NOTIFICATIONS}
                exact
                component={Notification}
              ></Route>
              <Route
                path={RoutePathName.ADMIN_OWNER_PROJECTS}
                exact
                component={Project}
              ></Route>
              <Route
                path={RoutePathName.ADMIN_OWNER_ADD_PROJECT}
                exact
                component={AddProject}
              ></Route>
              <Route
                path={RoutePathName.ADMIN_OWNER_EDIT_PROJECT}
                exact
                component={EditProject}
              ></Route>
              <Route
                path={RoutePathName.ADMIN_OWNER_TECHNOLOGY}
                
                component={Technology}
              ></Route>
              <Redirect
                from="/"
                exact
                to={RoutePathName.ADMIN_DASHBOARD}
              ></Redirect>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </div>
      </Route>
    </Switch>
  </Router>
);

export default App;
