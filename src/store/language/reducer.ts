import { LanguageActionTypes, LanguageActions, LanguageState } from "./types";
import { Language } from "../../model";

const initialState: LanguageState = {
  languages: [],
  isFetching: false,
  isAdding: false,
  error: null,
};

export default function reducer(
  state = initialState,
  action: LanguageActions
): LanguageState {
  switch (action.type) {
    case LanguageActionTypes.LANGUAGES_ACTION_START:
      return { ...state, isFetching: action.isFetching };
    case LanguageActionTypes.FETCH_LANGUAGES:
      return {
        ...state,
        languages: action.payload,
      };
    case LanguageActionTypes.LANGUAGES_ACTION_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: action.isAdding,
        error: action.error,
      };
    case LanguageActionTypes.LANGUAGES_ACTION_FAIL:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: action.isAdding,
        error: action.error,
      };

    case LanguageActionTypes.CREATE_LANGUAGE_START:
      return {
        ...state,
        isAdding: action.isAdding,
      };

    case LanguageActionTypes.CREATE_LANGUAGE:
      return {
        ...state,
        languages: [action.language, ...state.languages],
      };
    case LanguageActionTypes.DELETE_LANGUAGE:
      const newLanguages = state.languages.filter(
        (value: Language) => value.id !== action.id
      );
      return { ...state, languages: newLanguages };

    default:
      return state;
  }
}
