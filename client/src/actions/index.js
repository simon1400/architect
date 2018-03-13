import axios from 'axios';
import { FETCH_DATA, FETCH_IMAGE } from './types'
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
export const fetchImage = (files) => async dispatch => {
  const res = await axios.post('/api/image', files);
  dispatch({ type: FETCH_IMAGE, payload: res.data});
}
