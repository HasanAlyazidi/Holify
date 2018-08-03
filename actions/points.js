import store from '../store';

export const SET_POINTS = 'SET_POINTS';

export const setPoints = (points = 5) => {
  store.dispatch({ type: SET_POINTS, points });
};
