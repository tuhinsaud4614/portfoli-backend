import { Technique } from "../../model";

// TECHNIQUE Action Types
export enum TechniqueActionTypes {
  FETCH_TECHNIQUES = "FETCH_TECHNIQUES",
  TECHNIQUES_ACTION_START = "TECHNIQUES_ACTION_START",
  TECHNIQUES_ACTION_FAIL = "TECHNIQUES_ACTION_FAIL",
  CREATE_TECHNIQUE = "CREATE_TECHNIQUE",
  DELETE_TECHNIQUE = "DELETE_TECHNIQUE",
  CREATE_TECHNIQUE_START = "CREATE_TECHNIQUE_START",
}

// TECHNIQUE error types
export enum TechniqueErrorTypes {
  FETCH_TECHNIQUES_ERROR = "Technique fetching failed!",
  TECHNIQUE_CREATION_ERROR = "Technique creation failed!",
  TECHNIQUE_ALREADY_EXIST_ERROR = "Technique already exist!",
  TECHNIQUE_NOT_EXIST_ERROR = "Technique not exist!",
  TECHNIQUE_DELETING_ERROR = "Technique deleting failed!",
}

// TECHNIQUE State
export interface TechniqueState {
  techniques: Technique[];
  isFetching: boolean;
  isAdding: boolean;
  error: TechniqueErrorTypes | null;
}

// TECHNIQUE Actions
interface TechniqueActionStart {
  type: typeof TechniqueActionTypes.TECHNIQUES_ACTION_START;
  isFetching: boolean;
}

interface FetchTechniques {
  type: typeof TechniqueActionTypes.FETCH_TECHNIQUES;
  payload: Technique[];
}

interface TechniqueActionFail {
  type: typeof TechniqueActionTypes.TECHNIQUES_ACTION_FAIL;
  isFetching: boolean;
  isAdding: boolean;
  error: TechniqueErrorTypes;
}

interface CreateTechniqueStart {
  type: typeof TechniqueActionTypes.CREATE_TECHNIQUE_START;
  isAdding: boolean;
}

interface CreateTechnique {
  type: typeof TechniqueActionTypes.CREATE_TECHNIQUE;
  technique: Technique;
}

interface DeleteTechnique {
  type: typeof TechniqueActionTypes.DELETE_TECHNIQUE;
  id: string;
}

export type TechniqueActions =
  | TechniqueActionStart
  | FetchTechniques
  | TechniqueActionFail
  | CreateTechniqueStart
  | CreateTechnique
  | DeleteTechnique;
