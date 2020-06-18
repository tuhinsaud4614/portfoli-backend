import React from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createProject } from "../../store/project/action";
import { ProjectState } from "../../store/project/types";
import Project from "../../model/project";
import ProjectForm from "../../component/projectForm/projectForm";
import RoutePathName from "../routePathName";
import { AppState } from "../../store";
import { getSkillsFromProjects } from "../../utility/projectUtility";
import AlertBox from "../../component/UI/alertBox/alertBox";

const EditProject: React.FC = () => {
  const routeHistory = useHistory();
  const dispatch = useDispatch();

  const { isLoading, projects, error } = useSelector<AppState>(
    (state) => state.projects
  ) as ProjectState;

  const skills = getSkillsFromProjects(projects);

  const params = useParams<{ id: string }>();

  const submitHandler = (project: Project) => {
    project.id = params[`id`];
    dispatch(createProject(project, true, routeHistory.replace));
  };

  const projectIndex = projects.findIndex(
    (p: Project) => p.id === params[`id`]
  );

  if (projectIndex < 0 && !isLoading) {
    return <Redirect to={RoutePathName.ADMIN_OWNER_PROJECTS} />;
  } else {
    return (
      <div className={`p-3`}>
        {error && <AlertBox message="Editing project failure!" />}
        <ProjectForm
          skills={skills.length > 0 ? skills : []}
          title="Edit Project"
          submitted={submitHandler}
          isSaving={isLoading}
          project={projects[projectIndex]}
        />
      </div>
    );
  }
};

export default EditProject;
