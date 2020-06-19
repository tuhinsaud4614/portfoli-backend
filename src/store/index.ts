import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import projectReducer from "./project/reducer";
import languageReducer from "./language/reducer";
import platformReducer from "./platform/reducer";
import techniqueReducer from "./technique/reducer";
import { ProjectActions } from "./project/types";

export const rootReducer = combineReducers({
  projects: projectReducer,
  languages: languageReducer,
  platforms: platformReducer,
  techniques: techniqueReducer,
});

export type AppActions = ProjectActions;
export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (window && (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);
