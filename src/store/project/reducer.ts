import { ProjectActionTypes, ProjectState, ProjectActions } from "./types";
import Project from "../../model/project";

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null,
};

export default function reducer(
  state = initialState,
  action: ProjectActions
): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.PROJECTS_ACTION_START:
      return { ...state, isLoading: action.loading };
    case ProjectActionTypes.FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ProjectActionTypes.PROJECTS_ACTION_SUCCESS:
      return { ...state, isLoading: action.loading, error: action.error };
    case ProjectActionTypes.PROJECTS_ACTION_FAIL:
      return { ...state, isLoading: action.loading, error: action.error };

    case ProjectActionTypes.CREATE_PROJECT:
      return {
        ...state,
        projects: [action.project, ...state.projects],
      };
    case ProjectActionTypes.DELETE_PROJECT:
      console.log(action.id);
      const newProjects = state.projects.filter(
        (value: Project) => value.id !== action.id
      );
      return { ...state, projects: newProjects };
    case ProjectActionTypes.UPDATE_PROJECT:
      const projects = state.projects.map((value: Project) => {
        if (value.id === action.project.id) {
          return action.project;
        } else {
          return value;
        }
      });

      return { ...state, projects: projects };

    default:
      return state;
  }
}
