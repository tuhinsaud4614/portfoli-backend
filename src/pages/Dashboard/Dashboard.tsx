import React from "react";

import {
    faImage,
    faFileAlt,
    faEnvelope,
    faLightbulb,
    faCode,
    faClipboardList
} from "@fortawesome/free-solid-svg-icons"

import classes from "./Dashboard.module.css";
import ContentTag from "../../shared/UI/contentTag/contentTag";

const Dashboard: React.FC = () => (
  <React.Fragment>
    <div className={`${classes.WelcomeBoard}`}>
      <div className={`${classes.WelcomeBoardBack}`}></div>
      <div className={`${classes.WelcomeBoardHeader} d-flex`}>
        <div className={`${classes.WelcomeBoardHeaderMessage}`}>
          <h1>
            Welcome to <strong>Admin</strong>
            <br />
            <small>Make your service great</small>
          </h1>
        </div>
      </div>
    </div>
    <div className={`row m-0 p-4`}>
      <div className={`col-sm-6 col-md-6 col-lg-4 col-12 mb-4`}>
        <ContentTag
          iconName={faFileAlt}
          categoryName={["New", "Article"]}
          title="Mountain Trip"
        />
      </div>
      <div className={`col-sm-6 col-md-6 col-lg-4 col-12 mb-4`}>
        <ContentTag
          iconName={faImage}
          categoryName={["+33", "Images"]}
          title="Gallery"
        />
      </div>
      <div className={`col-sm-6 col-md-6 col-lg-4 col-12 mb-4`}>
        <ContentTag
          iconName={faEnvelope}
          categoryName={["5", "Messages"]}
          title="Support Center"
        />
      </div>
      <div className={`col-sm-6 col-md-6 col-lg-4 col-12 mb-4`}>
        <ContentTag
          iconName={faClipboardList}
          categoryName={["+14", "Projects"]}
          title="Owner"
        />
      </div>
      <div className={`col-sm-6 col-md-6 col-lg-4 col-12 mb-4`}>
        <ContentTag
          iconName={faLightbulb}
          categoryName={["5", "Skills"]}
          title="Owner"
        />
      </div>
      <div className={`col-sm-6 col-md-6 col-lg-4 col-12 mb-4`}>
        <ContentTag
          iconName={faCode}
          categoryName={["7", "Languages"]}
          title="Owner"
        />
      </div>
    </div>
  </React.Fragment>
);

export default Dashboard;
