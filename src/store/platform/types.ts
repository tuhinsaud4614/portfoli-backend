import { Platform } from "../../model";

// PLATFORM Action Types
export enum PlatformActionTypes {
  FETCH_PLATFORMS = "FETCH_PLATFORMS",
  PLATFORMS_ACTION_START = "PLATFORMS_ACTION_START",
  PLATFORMS_ACTION_SUCCESS = "PLATFORMS_ACTION_SUCCESS",
  PLATFORMS_ACTION_FAIL = "PLATFORMS_ACTION_FAIL",
  CREATE_PLATFORM = "CREATE_PLATFORM",
  DELETE_PLATFORM = "DELETE_PLATFORM",
  CREATE_PLATFORM_START = "CREATE_PLATFORM_START",
}

// PLATFORM error types
export enum PlatformErrorTypes {
  FETCH_PLATFORMS_ERROR = "Platform fetching failed!",
  PLATFORM_CREATION_ERROR = "Platform creation failed!",
  PLATFORM_ALREADY_EXIST_ERROR = "Platform already exist!",
  PLATFORM_NOT_EXIST_ERROR = "Platform not exist!",
  PLATFORM_DELETING_ERROR = "Platform deleting failed!",
}

// PLATFORM State
export interface PlatformState {
  platforms: Platform[];
  isFetching: boolean;
  isAdding: boolean;
  error: PlatformErrorTypes | null;
}

// PLATFORM Actions
interface PlatformActionStart {
  type: typeof PlatformActionTypes.PLATFORMS_ACTION_START;
  isFetching: boolean;
}

interface FetchPlatforms {
  type: typeof PlatformActionTypes.FETCH_PLATFORMS;
  payload: Platform[];
}

interface PlatformActionSuccess {
  type: typeof PlatformActionTypes.PLATFORMS_ACTION_SUCCESS;
  isFetching: boolean;
  isAdding: boolean;
  error: null;
}

interface PlatformActionFail {
  type: typeof PlatformActionTypes.PLATFORMS_ACTION_FAIL;
  isFetching: boolean;
  isAdding: boolean;
  error: PlatformErrorTypes;
}

interface CreatePlatformStart {
  type: typeof PlatformActionTypes.CREATE_PLATFORM_START;
  isAdding: boolean;
}

interface CreatePlatform {
  type: typeof PlatformActionTypes.CREATE_PLATFORM;
  platform: Platform;
}

interface DeletePlatform {
  type: typeof PlatformActionTypes.DELETE_PLATFORM;
  id: string;
}

export type PlatformActions =
  | PlatformActionStart
  | FetchPlatforms
  | PlatformActionSuccess
  | PlatformActionFail
  | CreatePlatformStart
  | CreatePlatform
  | DeletePlatform;
