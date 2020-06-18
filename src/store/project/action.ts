import { Dispatch } from "redux";
import axios from "axios";

import { ProjectActionTypes, ProjectActions, ProjectErrorTypes } from "./types";
import Project, { ProjectMapType } from "../../model/project";
// import Skill from "../../model/skill";
import RoutePathName from "../../pages/routePathName";

// const newSkills = (prevSkills: Skill[], currSkills: Skill[]) => {
//   const tempSkills = [...prevSkills];
//   currSkills.forEach((cs: Skill) => {
//     let count = 0;
//     prevSkills.forEach((ps: Skill) => {
//       if (cs.id === ps.id) {
//         count += 1;
//       }
//     });
//     if (count === 0) {
//       tempSkills.push(cs);
//     }
//   });
//   return tempSkills;
// };

const convertDataToProjects = (data: {
  [key: string]: ProjectMapType;
}): Project[] => {
  const newProjects: Project[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      newProjects.push(
        new Project(
          key,
          data[key].name,
          data[key].platform,
          data[key].skills,
          data[key].url,
          data[key].image,
          data[key].description
        )
      );
    }
  }
  return newProjects;
};

export const projectsActionStart = (): ProjectActions => ({
  type: ProjectActionTypes.PROJECTS_ACTION_START,
  loading: true,
});

export const projectsActionSuccess = (): ProjectActions => ({
  type: ProjectActionTypes.PROJECTS_ACTION_SUCCESS,
  loading: false,
  error: null,
});

export const projectsActionFail = (msg: ProjectErrorTypes): ProjectActions => ({
  type: ProjectActionTypes.PROJECTS_ACTION_FAIL,
  loading: false,
  error: msg,
});

export const fetchProjects = () => {
  return async (dispatch: Dispatch) => {
    dispatch(projectsActionStart());
    try {
      const response = await axios.get(
        "https://react-portfolio-1a7f5.firebaseio.com/projects.json"
      );
      const newProjects = convertDataToProjects(response.data);
      dispatch({
        type: ProjectActionTypes.FETCH_PROJECTS,
        payload: newProjects,
      });
      dispatch(projectsActionSuccess());
    } catch (error) {
      dispatch(projectsActionFail(ProjectErrorTypes.FETCH_PROJECTS_ERROR));
    }
  };
};

export const createProject = (
  project: Project,
  isEditMode: boolean,
  historyReplaced: (value: string) => void
) => {
  return async (dispatch: Dispatch) => {
    dispatch(projectsActionStart());
    try {
      if (isEditMode) {
        await axios.patch(
          `https://react-portfolio-1a7f5.firebaseio.com/projects/${project.id}.json`,
          JSON.stringify(project.toMap())
        );
        dispatch({
          type: ProjectActionTypes.UPDATE_PROJECT,
          project: project,
        });
      } else {
        await axios.post(
          "https://react-portfolio-1a7f5.firebaseio.com/projects.json",
          JSON.stringify(project.toMap())
        );
        dispatch({
          type: ProjectActionTypes.CREATE_PROJECT,
          project: project,
        });
      }
      dispatch(projectsActionSuccess());
      historyReplaced(RoutePathName.ADMIN_OWNER_PROJECTS);
    } catch (error) {
      dispatch(projectsActionFail(ProjectErrorTypes.PROJECT_CREATION_ERROR));
    }
  };
};

export const deleteProject = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(projectsActionStart());
    try {
      await axios.delete(
        `https://react-portfolio-1a7f5.firebaseio.com/projects/${id}.json`
      );
      dispatch({
        type: ProjectActionTypes.DELETE_PROJECT,
        id: id,
      });
      dispatch(projectsActionSuccess());
    } catch (error) {
      dispatch(projectsActionFail(ProjectErrorTypes.PROJECT_DELETING_ERROR));
    }
  };
};
