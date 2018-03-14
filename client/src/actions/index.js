import axios from 'axios';
import { FETCH_DATA } from './types'

export const fetchData = (id, data, files) => async dispatch => {
  let formData = new FormData();
  files.map(file => formData.append('file', file))
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }

  formData.append('title', data.title)
  formData.append('content', data.content)
  formData.append('namesImage', data.namesImage)

  const res = await axios.post('/api/image/'+id, formData);
  dispatch({ type: FETCH_DATA, payload: res.data});
}
