import { Dispatch } from "redux";
import axios from "axios";

import {
  LanguageActionTypes,
  LanguageActions,
  LanguageErrorTypes,
} from "./types";
import { AppState } from "..";

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

export const saveLanguage = (lang: Language): LanguageActions => ({
  type: LanguageActionTypes.CREATE_LANGUAGE,
  language: lang,
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

export const createLanguage = (language: { name: string }) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(createLanguageStart());
    try {
      const langFindIndex = getState().languages.languages.findIndex(
        (l) => l.name.toLowerCase() === language.name.toLowerCase()
      );
      if (langFindIndex < 0) {
        const response = await axios.post(
          "https://react-portfolio-1a7f5.firebaseio.com/languages.json",
          JSON.stringify(language)
        );
        dispatch(
          saveLanguage({ id: response.data[`name`], name: language.name })
        );
        dispatch(languagesActionSuccess());
      } else {
        dispatch(
          languagesActionFail(LanguageErrorTypes.LANGUAGE_ALREADY_EXIST_ERROR)
        );
      }
    } catch (error) {
      dispatch(languagesActionFail(LanguageErrorTypes.LANGUAGE_CREATION_ERROR));
    }
  };
};

export const deleteLanguage = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(languagesActionStart());
    try {
      const response = await axios.delete(
        `https://react-portfolio-1a7f5.firebaseio.com/languages/${id}.json`
      );
      console.log(response);
      dispatch({
        type: LanguageActionTypes.DELETE_LANGUAGE,
        id: id,
      });
      dispatch(languagesActionSuccess());
      // if (response.status === 200) {
      // } else {
      //   languagesActionFail(LanguageErrorTypes.LANGUAGE_NOT_EXIST_ERROR);
      // }
    } catch (error) {
      console.log('error', error);
      
      dispatch(languagesActionFail(LanguageErrorTypes.LANGUAGE_DELETING_ERROR));
    }
  };
};
