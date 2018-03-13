import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import imageReducers from './imageReducers';

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  image: imageReducers
});
