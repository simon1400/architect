import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  auth: authReducer,
  projects: projectReducer,
  menu: menuReducer
});
