import { LOGIN_USER, LOGOUT_USER } from '../actions/user';

const initialState = {
  name: null,
  email: null,
  mobile: null,
  token: null,
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...initialState,
        ...action.data,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
