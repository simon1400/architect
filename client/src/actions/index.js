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

export const fetchImage = (files) => async dispatch => {
  let data = new FormData();
  files.map(file => data.append('file', file))
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }

  const res = await axios.post('/api/image', data, config);
  dispatch({ type: FETCH_IMAGE, payload: res.data});
}
