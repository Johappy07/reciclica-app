import { createAction, createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";
import { Action } from "rxjs/internal/scheduler/Action";

const initialState: LoginState = AppInitialState.login;

const reducers = createReducer(initialState,
  on(recoverPassword, currentState => {
    return {
      ...currentState,
      error: null,
      isRecoveringPassword: true,
      isRecoveredPassword: false
    };
  }),
  on(recoverPasswordSuccess, currentState => {
    return {
      ...currentState,
      error: null,
      isRecoveringPassword: false,
      isRecoveredPassword: true
    };
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveringPassword: false,
      isRecoveredPassword: false
    };
  }),
  on(login, currentState => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true
    };
  }),
  on(loginSuccess, currentState => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false
    };
  }),
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false
    };
  }),
);
export function loginReducer(state : LoginState, action : any) {
  return reducers(state, action);
}
