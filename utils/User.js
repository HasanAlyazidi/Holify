import { loginUser, logoutUser, isUserLoggedIn, getUserData } from '../actions/user';

export default class User {
  static login(name, email, mobile, token) {
    loginUser({
      name,
      email,
      mobile,
      token,
    });
  }

  static logout() {
    logoutUser();
  }

  static isLoggedIn() {
    return isUserLoggedIn();
  }

  static get data() {
    return getUserData();
  }

  static get id() {
    return getUserData().id;
  }

  static get userName() {
    return getUserData().name;
  }

  static get email() {
    return getUserData().email;
  }

  static get mobile() {
    return getUserData().mobile;
  }

  static get token() {
    return getUserData().token;
  }
}
