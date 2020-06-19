import { Language } from "../../model";

// LANGUAGE Action Types
export enum LanguageActionTypes {
  FETCH_LANGUAGES = "FETCH_LANGUAGES",
  LANGUAGES_ACTION_START = "LANGUAGES_ACTION_START",
  LANGUAGES_ACTION_SUCCESS = "LANGUAGES_ACTION_SUCCESS",
  LANGUAGES_ACTION_FAIL = "LANGUAGES_ACTION_FAIL",
  CREATE_LANGUAGE = "CREATE_LANGUAGE",
  DELETE_LANGUAGE = "DELETE_LANGUAGE",
  CREATE_LANGUAGE_START = "CREATE_LANGUAGE_START",
}

// LANGUAGE error types
export enum LanguageErrorTypes {
  FETCH_LANGUAGES_ERROR = "Language fetching failed!",
  LANGUAGE_CREATION_ERROR = "Language creation failed!",
  LANGUAGE_ALREADY_EXIST_ERROR = "Language already exist!",
  LANGUAGE_NOT_EXIST_ERROR = "Language not exist!",
  LANGUAGE_DELETING_ERROR = "Language deleting failed!",
}

// LANGUAGE State
export interface LanguageState {
  languages: Language[];
  isFetching: boolean;
  isAdding: boolean;
  error: LanguageErrorTypes | null;
}

// LANGUAGE Actions
interface LanguageActionStart {
  type: typeof LanguageActionTypes.LANGUAGES_ACTION_START;
  isFetching: boolean;
}

interface FetchLanguages {
  type: typeof LanguageActionTypes.FETCH_LANGUAGES;
  payload: Language[];
}

interface LanguageActionSuccess {
  type: typeof LanguageActionTypes.LANGUAGES_ACTION_SUCCESS;
  isFetching: boolean;
  isAdding: boolean;
  error: null;
}

interface LanguageActionFail {
  type: typeof LanguageActionTypes.LANGUAGES_ACTION_FAIL;
  isFetching: boolean;
  isAdding: boolean;
  error: LanguageErrorTypes;
}

interface CreateLanguageStart {
  type: typeof LanguageActionTypes.CREATE_LANGUAGE_START;
  isAdding: boolean;
}

interface CreateLanguage {
  type: typeof LanguageActionTypes.CREATE_LANGUAGE;
  language: Language;
}

interface DeleteLanguage {
  type: typeof LanguageActionTypes.DELETE_LANGUAGE;
  id: string;
}

export type LanguageActions =
  | LanguageActionStart
  | FetchLanguages
  | LanguageActionSuccess
  | LanguageActionFail
  | CreateLanguageStart
  | CreateLanguage
  | DeleteLanguage;
