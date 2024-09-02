import { User } from "src/app/model/user/User";  // Menggunakan 'User' dengan huruf kapital sesuai konvensi
import { AppInitialState } from "../AppInitialState";
import { loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess, login, loginFail } from "./login.actions";  // Tambahkan 'login' dan 'loginFail'
import { loginReducer } from "./login.reducers";
import { LoginState } from "./LoginState";

describe('Login store', () => {

  it('recoverPassword', () => {
    const initialState: LoginState = AppInitialState.login;

    const newState = loginReducer(initialState, recoverPassword());
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    });
  });

  it('recoverPasswordSuccess', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, recoverPasswordSuccess());
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    });
  });

  it('recoverPasswordFail', () => {
    const initialState: LoginState = AppInitialState.login;
    const error = 'error';
    const newState = loginReducer(initialState, recoverPasswordFail({ error }));
    expect(newState).toEqual({
      ...initialState,
      error,  // Sesuaikan ekspektasi dengan hasil yang sebenarnya
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    });
  });
  it('login', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, login());
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    });
  });

  it('loginSuccess', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true,
    };
    const user = new User();
    user["id"] = "anyId";
    const newState = loginReducer(initialState, loginSuccess({ user }));  // Sertakan user di dalam action
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false,
    });
  });

  it('loginFail', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true,
    };
    const error = 'error';
    const newState = loginReducer(initialState, loginFail({ error }));
    expect(newState).toEqual({
      ...initialState,
      error,  // Sesuaikan ekspektasi dengan hasil yang sebenarnya
      isLoggedIn: false,
      isLoggingIn: false,
    });
  });
});
