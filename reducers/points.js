import { SET_POINTS } from '../actions/points';

const initialState = {
  points: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POINTS:
      return { ...state, points: state.points + action.points };
    default:
      return state;
  }
};

export default reducer;
