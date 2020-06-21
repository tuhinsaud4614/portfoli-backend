import {
  TechniqueActionTypes,
  TechniqueActions,
  TechniqueState,
} from "./types";
import { Technique } from "../../model";

const initialState: TechniqueState = {
  techniques: [],
  isFetching: false,
  isAdding: false,
  error: null,
  typeError: {
    type: null,
    msg: null,
  },
};

export default function reducer(
  state = initialState,
  action: TechniqueActions
): TechniqueState {
  switch (action.type) {
    case TechniqueActionTypes.TECHNIQUES_ACTION_START:
      return { ...state, isFetching: action.isFetching };
    case TechniqueActionTypes.FETCH_TECHNIQUES:
      return {
        ...state,
        techniques: action.payload,
        isFetching: false,
        error: null,
      };
    case TechniqueActionTypes.TECHNIQUES_ACTION_FAIL:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: action.isAdding,
        error: action.error,
      };
    case TechniqueActionTypes.TECHNIQUES_TYPE_ACTION_FAIL:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: action.isAdding,
        typeError: action.error,
      };

    case TechniqueActionTypes.CREATE_TECHNIQUE_START:
      return {
        ...state,
        isAdding: action.isAdding,
      };

    case TechniqueActionTypes.CREATE_TECHNIQUE:
      return {
        ...state,
        techniques: [...state.techniques, action.technique],
        isAdding: false,
        error: null,
        typeError: {
          msg: null,
          type: null,
        },
      };
    case TechniqueActionTypes.DELETE_TECHNIQUE:
      const newTechniques = state.techniques.filter(
        (value: Technique) => value.id !== action.id
      );
      return {
        ...state,
        techniques: newTechniques,
        isFetching: false,
        error: null,
        typeError: {
          msg: null,
          type: null,
        },
      };

    default:
      return state;
  }
}
