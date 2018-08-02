import store from '../store';

export const SET_SETTINGS_DEVICE_TOKEN = 'SET_SETTINGS_DEVICE_TOKEN';
export const SET_SETTINGS_FIRST_LAUNCH = 'SET_SETTINGS_FIRST_LAUNCH';

export const SET_SETTINGS_LANGUAGE = 'SET_SETTINGS_LANGUAGE';
export const GET_SETTINGS_LANGUAGE_LOCALE = 'GET_SETTINGS_LANGUAGE_LOCALE';

export const setDeviceToken = (token) => {
  store.dispatch({ type: SET_SETTINGS_DEVICE_TOKEN, token });
};

export const setFirstLaunchStatus = (status) => {
  store.dispatch({ type: SET_SETTINGS_FIRST_LAUNCH, status });
};

export const setLanguage = (language) => {
  store.dispatch({
    type: SET_SETTINGS_LANGUAGE,
    language,
  });
};

export const getDeviceToken = () => store.getState().settings.deviceToken;
export const isFirstLaunch = () => store.getState().settings.isFirstLaunch;

export const getLanguage = () => store.getState().settings.language.language;
