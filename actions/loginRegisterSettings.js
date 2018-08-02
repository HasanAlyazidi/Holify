import store from '../store';

export const SET_RETURN_PAGE = 'SET_RETURN_PAGE';

export const setReturnPage = (page) => {
  store.dispatch({ type: SET_RETURN_PAGE, page });
};

export const resetReturnPage = () => {
  store.dispatch({ type: SET_RETURN_PAGE, page: null });
};

export const getReturnPage = () => store.getState().loginRegisterSettings.returnPage;
