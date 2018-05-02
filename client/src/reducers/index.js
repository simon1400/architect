import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import menuReducer from './menuReducer';
import socialReducer from './socialReducer';
import settingReducer from './settingReducer';

export default combineReducers({
  auth: authReducer,
  articles: articleReducer,
  menu: menuReducer,
  social: socialReducer,
  setting: settingReducer
});
