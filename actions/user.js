import store from '../store';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (data) => {
  store.dispatch({ type: LOGIN_USER, data });
};

export const logoutUser = () => {
  store.dispatch({ type: LOGOUT_USER });
};

export const getUserData = () => store.getState().user;

export const isUserLoggedIn = () => store.getState().user.isLoggedIn;
