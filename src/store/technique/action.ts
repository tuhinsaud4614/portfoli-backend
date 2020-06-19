import { Dispatch } from "redux";
import axios from "axios";

import {
  TechniqueActionTypes,
  TechniqueActions,
  TechniqueErrorTypes,
} from "./types";
import { AppState } from "..";

import { Technique, TechnologyType } from "../../model";

const convertDataToTechniques = (data: {
  [key: string]: { name: string; technologyId: TechnologyType };
}): Technique[] => {
  const newTechniques: Technique[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      newTechniques.push({
        id: key,
        name: data[key].name,
        technologyId: data[key].technologyId,
      });
    }
  }
  
  return newTechniques;
};

export const techniquesActionStart = (): TechniqueActions => ({
  type: TechniqueActionTypes.TECHNIQUES_ACTION_START,
  isFetching: true,
});

export const techniquesActionSuccess = (): TechniqueActions => ({
  type: TechniqueActionTypes.TECHNIQUES_ACTION_SUCCESS,
  isAdding: false,
  isFetching: false,
  error: null,
});

export const techniquesActionFail = (
  msg: TechniqueErrorTypes
): TechniqueActions => ({
  type: TechniqueActionTypes.TECHNIQUES_ACTION_FAIL,
  isAdding: false,
  isFetching: false,
  error: msg,
});

export const createTechniqueStart = (): TechniqueActions => ({
  type: TechniqueActionTypes.CREATE_TECHNIQUE_START,
  isAdding: true,
});

export const saveTechnique = (lang: Technique): TechniqueActions => ({
  type: TechniqueActionTypes.CREATE_TECHNIQUE,
  technique: lang,
});

export const fetchTechniques = () => {
  return async (dispatch: Dispatch) => {
    dispatch(techniquesActionStart());
    try {
      const response = await axios.get(
        "https://react-portfolio-1a7f5.firebaseio.com/technology/techniques.json"
      );

      const newTechniques = convertDataToTechniques(response.data);
      dispatch({
        type: TechniqueActionTypes.FETCH_TECHNIQUES,
        payload: newTechniques,
      });
      dispatch(techniquesActionSuccess());
    } catch (error) {
      dispatch(
        techniquesActionFail(TechniqueErrorTypes.FETCH_TECHNIQUES_ERROR)
      );
    }
  };
};

export const createTechnique = (value: string, technologyType: TechnologyType) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(createTechniqueStart());
    try {
      const techFindIndex = getState().techniques.techniques.findIndex(
        (l) => l.name.toLowerCase() === value.toLowerCase()
      );
      if (techFindIndex < 0) {
        const response = await axios.post(
          "https://react-portfolio-1a7f5.firebaseio.com/technology/techniques.json",
          JSON.stringify({
            name: value,
            technologyId: technologyType,
          })
        );
        dispatch(
          saveTechnique({
            id: response.data[`name`],
            name: value,
            technologyId: technologyType,
          })
        );
        dispatch(techniquesActionSuccess());
      } else {
        dispatch(
          techniquesActionFail(
            TechniqueErrorTypes.TECHNIQUE_ALREADY_EXIST_ERROR
          )
        );
      }
    } catch (error) {
      dispatch(
        techniquesActionFail(TechniqueErrorTypes.TECHNIQUE_CREATION_ERROR)
      );
    }
  };
};

export const deleteTechnique = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(techniquesActionStart());
    try {
      const response = await axios.delete(
        `https://react-portfolio-1a7f5.firebaseio.com/technology/techniques/${id}.json`
      );
      dispatch({
        type: TechniqueActionTypes.DELETE_TECHNIQUE,
        id: id,
      });
      dispatch(techniquesActionSuccess());
      // if (response.status === 200) {
      // } else {
      //   techniquesActionFail(TechniqueErrorTypes.TECHNIQUE_NOT_EXIST_ERROR);
      // }
    } catch (error) {
      console.log("error", error);

      dispatch(
        techniquesActionFail(TechniqueErrorTypes.TECHNIQUE_DELETING_ERROR)
      );
    }
  };
};
