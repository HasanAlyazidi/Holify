import store from '../store';

export const SET_LANG_SELECTED_INDEX = 'SET_LANG_SELECTED_INDEX';

export const setLangSelectedIndex = (index) => {
  store.dispatch({ type: SET_LANG_SELECTED_INDEX, index });
};

export const getLangSelectedIndex = () => store.getState().welcome.langIndex;
