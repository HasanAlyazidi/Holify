import {
  SET_SETTINGS_DEVICE_TOKEN,
  SET_SETTINGS_FIRST_LAUNCH,
  SET_SETTINGS_LANGUAGE,
} from '../actions/settings';

const initialState = {
  deviceToken: '',
  isFirstLaunch: true,
  language: {
    language: null, // example: ar
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS_DEVICE_TOKEN:
      return { ...state, deviceToken: action.token };
    case SET_SETTINGS_FIRST_LAUNCH:
      return { ...state, isFirstLaunch: action.status };
    case SET_SETTINGS_LANGUAGE:
      return {
        ...state,
        language: {
          language: action.language,
        },
      };
    default:
      return state;
  }
};

export default reducer;
