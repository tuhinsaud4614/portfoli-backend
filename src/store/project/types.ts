import Project from "../../model/project";
// import Skill from "../../model/skill";

// Project Action Types
export enum ProjectActionTypes {
  PROJECTS_ACTION_START = "PROJECTS_ACTION_START",
  FETCH_PROJECTS = "FETCH_PROJECTS",
  PROJECTS_ACTION_SUCCESS = "PROJECTS_ACTION_SUCCESS",
  PROJECTS_ACTION_FAIL = "PROJECTS_ACTION_FAIL",
  CREATE_PROJECT = "CREATE_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
  UPDATE_PROJECT = "UPDATE_PROJECT",
}

// Project error types
export enum ProjectErrorTypes {
  FETCH_PROJECTS_ERROR = "Project fetching failed!",
  PROJECT_CREATION_ERROR = "Project creation failed!",
  PROJECT_UPDATING_ERROR = "Project updating failed!",
  PROJECT_DELETING_ERROR = "Project deleting failed!",
}

// Project State
export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: ProjectErrorTypes | null;
}

// Project Actions
interface ProjectsActionStart {
  type: typeof ProjectActionTypes.PROJECTS_ACTION_START;
  loading: boolean;
}

interface FetchProject {
  type: typeof ProjectActionTypes.FETCH_PROJECTS;
  payload: Project[];
}

interface ProjectsActionSuccess {
  type: typeof ProjectActionTypes.PROJECTS_ACTION_SUCCESS;
  loading: boolean;
  error: null;
}

interface ProjectsActionFail {
  type: typeof ProjectActionTypes.PROJECTS_ACTION_FAIL;
  loading: boolean;
  error: ProjectErrorTypes;
}

interface CreateProject {
  type: typeof ProjectActionTypes.CREATE_PROJECT;
  project: Project;
}

interface DeleteProject {
  type: typeof ProjectActionTypes.DELETE_PROJECT;
  id: string;
}

interface UpdateProject {
  type: typeof ProjectActionTypes.UPDATE_PROJECT;
  project: Project;
}

export type ProjectActions =
  | ProjectsActionStart
  | FetchProject
  | ProjectsActionSuccess
  | ProjectsActionFail
  | CreateProject
  | DeleteProject
  | UpdateProject;