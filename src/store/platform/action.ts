import { Dispatch } from "redux";
import axios from "axios";

import {
  PlatformActionTypes,
  PlatformActions,
  PlatformErrorTypes,
} from "./types";
import { AppState } from "..";
import { Platform, TechnologyType, PlatformWithoutId } from "../../model";
import { responseDataToData } from "../../utility";

export const platformsActionStart = (): PlatformActions => ({
  type: PlatformActionTypes.PLATFORMS_ACTION_START,
  isFetching: true,
});

export const platformsActionFail = (
  msg: PlatformErrorTypes
): PlatformActions => ({
  type: PlatformActionTypes.PLATFORMS_ACTION_FAIL,
  isAdding: false,
  isFetching: false,
  error: msg,
});

export const createPlatformStart = (): PlatformActions => ({
  type: PlatformActionTypes.CREATE_PLATFORM_START,
  isAdding: true,
});

export const savePlatform = (platform: Platform): PlatformActions => ({
  type: PlatformActionTypes.CREATE_PLATFORM,
  platform: platform,
});

export const fetchPlatforms = () => {
  return async (dispatch: Dispatch) => {
    dispatch(platformsActionStart());
    try {
      const response = await axios.get(
        "https://react-portfolio-1a7f5.firebaseio.com/technology/platforms.json"
      );
      const newPlatforms = responseDataToData<PlatformWithoutId>(response.data);
      dispatch({
        type: PlatformActionTypes.FETCH_PLATFORMS,
        payload: newPlatforms,
      });
    } catch (error) {
      dispatch(platformsActionFail(PlatformErrorTypes.FETCH_PLATFORMS_ERROR));
    }
  };
};

export const createPlatform = (value: string, technologyType: TechnologyType) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(createPlatformStart());
    try {
      const langFindIndex = getState().platforms.platforms.findIndex(
        (p) => p.name.toLowerCase() === value.toLowerCase()
      );
      if (langFindIndex < 0) {
        const response = await axios.post(
          "https://react-portfolio-1a7f5.firebaseio.com/technology/platforms.json",
          JSON.stringify({
            technologyId: technologyType,
            name: value,
          })
        );
        dispatch(
          savePlatform({
            id: response.data[`name`],
            name: value,
            technologyId: technologyType,
          })
        );
      } else {
        dispatch(
          platformsActionFail(PlatformErrorTypes.PLATFORM_ALREADY_EXIST_ERROR)
        );
      }
    } catch (error) {
      dispatch(platformsActionFail(PlatformErrorTypes.PLATFORM_CREATION_ERROR));
    }
  };
};

export const deletePlatform = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(platformsActionStart());
    try {
      await axios.delete(
        `https://react-portfolio-1a7f5.firebaseio.com/technology/platforms/${id}.json`
      );
      dispatch({
        type: PlatformActionTypes.DELETE_PLATFORM,
        id: id,
      });
    } catch (error) {
      console.log("error", error);

      dispatch(platformsActionFail(PlatformErrorTypes.PLATFORM_DELETING_ERROR));
    }
  };
};
