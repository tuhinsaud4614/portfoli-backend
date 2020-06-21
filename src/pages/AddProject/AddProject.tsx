import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import { getsTechniquesFromProjects } from "../../utility/projectUtility";
import { AppState } from "../../store";
import { createProject } from "../../store/project/action";
import { ProjectState } from "../../store/project/types";
import ProjectForm from "../../shared/components/projectForm/projectForm";
import AlertBox from "../../shared/UI/alertBox/alertBox";
import { Project } from "../../model";
import RoutePathName from "../../routePathName";

const AddProject: React.FC = () => {
  const routeHistory = useHistory();
  const dispatch = useDispatch();

  const { loading, platforms, techniques, error } = useSelector<AppState>(
    (state) => state.projects
  ) as ProjectState;

  // const skills = getsTechniquesFromProjects(projects);

  const submitHandler = (project: Project) => {
    dispatch(createProject(project, false, routeHistory.replace));
  };

  if (platforms.length === 0) {
    return <Redirect to={RoutePathName.ADMIN_OWNER_PROJECTS} />;
  }
  return (
    <div className={`p-3`}>
      {error && <AlertBox message="Adding project failure!" />}
      <ProjectForm
        platforms={platforms}
        techniques={techniques.length > 0 ? techniques : []}
        title="Add New Project"
        submitted={submitHandler}
        isSaving={loading}
      />
    </div>
  );
};

export default AddProject;
