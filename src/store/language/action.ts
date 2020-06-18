import { Dispatch } from "redux";
import axios from "axios";

import {
  LanguageActionTypes,
  LanguageActions,
  LanguageErrorTypes,
} from "./types";
import { Language } from "../../model";

const convertDataToLanguages = (data: {
  [key: string]: { name: string };
}): Language[] => {
  const newLanguages: Language[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      newLanguages.push({
        id: key,
        name: data[key].name,
      });
    }
  }
  return newLanguages;
};

export const languagesActionStart = (): LanguageActions => ({
  type: LanguageActionTypes.LANGUAGES_ACTION_START,
  isFetching: true,
});

export const languagesActionSuccess = (): LanguageActions => ({
  type: LanguageActionTypes.LANGUAGES_ACTION_SUCCESS,
  isAdding: false,
  isFetching: false,
  error: null,
});

export const languagesActionFail = (
  msg: LanguageErrorTypes
): LanguageActions => ({
  type: LanguageActionTypes.LANGUAGES_ACTION_FAIL,
  isAdding: false,
  isFetching: false,
  error: msg,
});

export const createLanguageStart = (): LanguageActions => ({
  type: LanguageActionTypes.CREATE_LANGUAGE_START,
  isAdding: true,
});

export const fetchLanguages = () => {
  return async (dispatch: Dispatch) => {
    dispatch(languagesActionStart());
    try {
      const response = await axios.get(
        "https://react-portfolio-1a7f5.firebaseio.com/languages.json"
      );
      const newLanguages = convertDataToLanguages(response.data);
      dispatch({
        type: LanguageActionTypes.FETCH_LANGUAGES,
        payload: newLanguages,
      });
      dispatch(languagesActionSuccess());
    } catch (error) {
      dispatch(languagesActionFail(LanguageErrorTypes.FETCH_LANGUAGES_ERROR));
    }
  };
};

export const createLanguage = (language: Language) => {
  return async (dispatch: Dispatch) => {
    dispatch(createLanguageStart());
    try {
      await axios.post(
        "https://react-portfolio-1a7f5.firebaseio.com/languages.json",
        JSON.stringify({ name: language.name })
      );
      dispatch({
        type: LanguageActionTypes.CREATE_LANGUAGE,
        language: language,
      });

      dispatch(languagesActionSuccess());
    } catch (error) {
      dispatch(languagesActionFail(LanguageErrorTypes.LANGUAGE_CREATION_ERROR));
    }
  };
};

export const deleteLanguage = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(languagesActionStart());
    try {
      await axios.delete(
        `https://react-portfolio-1a7f5.firebaseio.com/languages/${id}.json`
      );
      dispatch({
        type: LanguageActionTypes.DELETE_LANGUAGE,
        id: id,
      });
      dispatch(languagesActionSuccess());
    } catch (error) {
      dispatch(languagesActionFail(LanguageErrorTypes.LANGUAGE_DELETING_ERROR));
    }
  };
};
