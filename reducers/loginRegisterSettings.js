import { SET_RETURN_PAGE } from '../actions/loginRegisterSettings';

const initialState = {
  returnPage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RETURN_PAGE:
      return { ...state, returnPage: action.page };
    default:
      return state;
  }
};

export default reducer;
