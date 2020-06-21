import { PlatformActionTypes, PlatformActions, PlatformState } from "./types";
import { Platform } from "../../model";

const initialState: PlatformState = {
  platforms: [],
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
  action: PlatformActions
): PlatformState {
  switch (action.type) {
    case PlatformActionTypes.PLATFORMS_ACTION_START:
      return { ...state, isFetching: action.isFetching };
    case PlatformActionTypes.FETCH_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
        isFetching: false,
        error: null,
      };

    case PlatformActionTypes.PLATFORMS_ACTION_FAIL:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: action.isAdding,
        error: action.error,
      };

    case PlatformActionTypes.PLATFORMS_TYPE_ACTION_FAIL:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: action.isAdding,
        typeError: action.error,
      };

    case PlatformActionTypes.CREATE_PLATFORM_START:
      return {
        ...state,
        isAdding: action.isAdding,
      };

    case PlatformActionTypes.CREATE_PLATFORM:
      return {
        ...state,
        platforms: [...state.platforms, action.platform],
        isAdding: false,
        error: null,
        typeError: {
          msg: null,
          type: null,
        },
      };
    case PlatformActionTypes.DELETE_PLATFORM:
      const newPlatforms = state.platforms.filter(
        (value: Platform) => value.id !== action.id
      );
      return {
        ...state,
        platforms: newPlatforms,
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
