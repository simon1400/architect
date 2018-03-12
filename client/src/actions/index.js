import axios from 'axios';
import { FETCH_DATA } from './types'
//
// export const fetchUser = () => async dispatch => {
//   const res = await axios.get('/api/current_user')
//   dispatch({ type: FETCH_USER, payload: res.data });
// };

// export const handleToken = (token) => async dispatch => {
//   const res = await axios.post('/api/stripe', token);
//   dispatch({ type: FETCH_USER, payload: res.data});
// }
//
export const submitContent = (content) => async dispatch => {
  const res = await axios.post('/api/project', {content});
  // history.push('/surveys');
  dispatch({ type: FETCH_DATA, payload: res.data});

}
//
//
// export const fetchSurveys = () => async dispatch => {
//   const res = await axios.get('/api/surveys');
//   dispatch({ type: FETCH_SURVEYS, payload: res.data});
// }
