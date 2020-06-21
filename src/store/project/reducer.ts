import { ProjectActionTypes, ProjectState, ProjectActions } from "./types";
import { Project } from "../../model";

const initialState: ProjectState = {
  projects: [],
  platforms: [],
  techniques: [],
  loading: false,
  error: null,
};

export default function reducer(
  state = initialState,
  action: ProjectActions
): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.PROJECTS_ACTION_START:
      return { ...state, loading: action.loading };
    case ProjectActionTypes.FETCH_PROJECTS:
      return {
        projects: action.payload.projects,
        platforms: action.payload.platforms,
        techniques: action.payload.techniques,
        loading: false,
        error: null,
      };
    case ProjectActionTypes.PROJECTS_ACTION_FAIL:
      return { ...state, loading: action.loading, error: action.error };
    case ProjectActionTypes.CREATE_PROJECT:
      return {
        ...state,
        projects: [action.project, ...state.projects],
        loading: false,
        error: null,
      };
    case ProjectActionTypes.DELETE_PROJECT:
      console.log(action.id);
      const newProjects = state.projects.filter(
        (value: Project) => value.id !== action.id
      );
      return { ...state, projects: newProjects, loading: false, error: null };
    case ProjectActionTypes.UPDATE_PROJECT:
      const projects = state.projects.map((value: Project) => {
        if (value.id === action.project.id) {
          return action.project;
        } else {
          return value;
        }
      });

      return { ...state, projects: projects, loading: false, error: null };

    default:
      return state;
  }
}
