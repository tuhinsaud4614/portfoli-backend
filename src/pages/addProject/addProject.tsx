import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getSkillsFromProjects } from "../../utility/projectUtility";
import { AppState } from "../../store";
import { createProject } from "../../store/project/action";
import { ProjectState } from "../../store/project/types";
import Project from "../../model/project";
import ProjectForm from "../../component/projectForm/projectForm";
import AlertBox from "../../component/UI/alertBox/alertBox";

const AddProject: React.FC = () => {
  const routeHistory = useHistory();
  const dispatch = useDispatch();

  const { isLoading, projects, error } = useSelector<AppState>(
    (state) => state.projects
  ) as ProjectState;

  const skills = getSkillsFromProjects(projects);

  const submitHandler = (project: Project) => {
    dispatch(createProject(project, false, routeHistory.replace));
  };

  return (
    <div className={`p-3`}>
      {error && (
        <AlertBox message="Adding project failure!" />
        
      )}
      <ProjectForm
        skills={skills.length > 0 ? skills : []}
        title="Add New Project"
        submitted={submitHandler}
        isSaving={isLoading}
      />
    </div>
  );
};

export default AddProject;
