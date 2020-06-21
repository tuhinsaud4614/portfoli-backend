import { Dispatch } from "redux";
import axios from "axios";

import {
  Project,
  ProjectWithoutId,
  TechniqueWithoutId,
  PlatformWithoutId,
} from "../../model";
import { ProjectActionTypes, ProjectActions, ProjectErrorTypes } from "./types";
import RoutePathName from "../../routePathName";
import { responseDataToData } from "../../utility";

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

// const convertDataToProjects = (data: {
//   [key: string]: ProjectWithoutId;
// }): Project[] => {
//   const newProjects: Project[] = [];

//   for (const key in data) {
//     if (data.hasOwnProperty(key)) {
//       newProjects.push({
//         id: key,
//         ...data[key],
//       });
//     }
//   }
//   return newProjects;
// };

export const projectsActionStart = (): ProjectActions => ({
  type: ProjectActionTypes.PROJECTS_ACTION_START,
  loading: true,
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
      const responseProjects = await axios.get(
        "https://react-portfolio-1a7f5.firebaseio.com/projects.json"
      );
      const responseTechniques = await axios.get(
        "https://react-portfolio-1a7f5.firebaseio.com/technology/techniques.json"
      );
      const responsePlatforms = await axios.get(
        "https://react-portfolio-1a7f5.firebaseio.com/technology/platforms.json"
      );
      // const newProjects = convertDataToProjects(response.data);
      const newProjects = responseDataToData<ProjectWithoutId>(
        responseProjects.data
      );
      const newTechniques = responseDataToData<TechniqueWithoutId>(
        responseTechniques.data
      );
      const newPlatforms = responseDataToData<PlatformWithoutId>(
        responsePlatforms.data
      );
      dispatch({
        type: ProjectActionTypes.FETCH_PROJECTS,
        payload: {
          projects: newProjects,
          techniques: newTechniques,
          platforms: newPlatforms
        },
      });
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
        const projectId: string = project.id;
        delete project.id;
        await axios.patch(
          `https://react-portfolio-1a7f5.firebaseio.com/projects/${projectId}.json`,
          JSON.stringify(project)
        );
        dispatch({
          type: ProjectActionTypes.UPDATE_PROJECT,
          project: project,
        });
      } else {
        delete project.id;
        await axios.post(
          "https://react-portfolio-1a7f5.firebaseio.com/projects.json",
          JSON.stringify(project)
        );
        dispatch({
          type: ProjectActionTypes.CREATE_PROJECT,
          project: project,
        });
      }
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
    } catch (error) {
      dispatch(projectsActionFail(ProjectErrorTypes.PROJECT_DELETING_ERROR));
    }
  };
};
