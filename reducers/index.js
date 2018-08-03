import { combineReducers } from 'redux';

import welcome from './welcome';
import settings from './settings';
import user from './user';
import points from './points';
import loginRegisterSettings from './loginRegisterSettings';

export default combineReducers({
  welcome,
  settings,
  user,
  points,
  loginRegisterSettings,
});
