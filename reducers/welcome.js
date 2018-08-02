import { SET_LANG_SELECTED_INDEX } from '../actions/welcome';

const initialState = {
  langIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG_SELECTED_INDEX:
      return { ...state, langIndex: action.index };
    default:
      return state;
  }
};

export default reducer;
