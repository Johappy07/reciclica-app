import { createAction, props } from "@ngrx/store";

export const recoverPassword = createAction("[Recover Password]");
export const recoverPasswordSuccess = createAction("[Recover Password Success]");
export const recoverPasswordFail = createAction("[Recover Password] fail", props<{error: any}>());


export const login = createAction("[Login]");
export const loginSuccess = createAction("[Login Success]", props<{user: any}>());
export const loginFail = createAction("[Login] fail", props<{error: any}>());
