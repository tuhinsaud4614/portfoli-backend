import React from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createProject } from "../../store/project/action";
import { ProjectState } from "../../store/project/types";
import ProjectForm from "../../shared/components/projectForm/projectForm";
import RoutePathName from "../../routePathName";
import { AppState } from "../../store";
import AlertBox from "../../shared/UI/alertBox/alertBox";
import { Project } from "../../model";

const EditProject: React.FC = () => {
  const routeHistory = useHistory();
  const dispatch = useDispatch();

  const { loading, projects, platforms, techniques, error } = useSelector<
    AppState
  >((state) => state.projects) as ProjectState;

  // const skills = getSkillsFromProjects(projects);

  const params = useParams<{ id: string }>();

  const submitHandler = (project: Project) => {
    project.id = params[`id`];
    dispatch(createProject(project, true, routeHistory.replace));
  };

  const projectIndex = projects.findIndex(
    (p: Project) => p.id === params[`id`]
  );

  if (platforms.length === 0) {
    return <Redirect to={RoutePathName.ADMIN_OWNER_PROJECTS} />;
  } else {
    return (
      <div className={`p-3`}>
        {error && <AlertBox message="Editing project failure!" />}
        <ProjectForm
          platforms={platforms}
          techniques={techniques.length > 0 ? techniques : []}
          title="Edit Project"
          submitted={submitHandler}
          isSaving={loading}
          project={projects[projectIndex]}
        />
      </div>
    );
  }
};

export default EditProject;
