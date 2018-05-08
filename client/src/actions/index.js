import axios from 'axios';
import { FETCH_DATA, MENU_DATA, SOCIAL_DATA, IMAGE_DATA, SETTING_DATA } from './types'

// IMAGE
export const saveImage = (id, images) => async dispatch => {
  let formData = new FormData();
  images.map((file, index) => {
    return formData.append('file', file)
  })

  const res = await axios.post('/api/image/'+id, formData);
  dispatch({ type: IMAGE_DATA, payload: res.data});
}

export const deleteImage = (id, image, uniqID, name) => async dispatch => {
  const res = await axios.put('/api/image/'+id, {image, uniqID, name});
  dispatch({ type: IMAGE_DATA, payload: res.data});
}

// ALL DATA
export const fetchData = (id, data) => async dispatch => {
  const res = await axios.post('/api/project/'+id, data);
  dispatch({ type: FETCH_DATA, payload: res.data});
}

export const getData = () => async dispatch => {
  const res = await axios.get('/api/projects');
  dispatch({ type: FETCH_DATA, payload: res.data});
}


// MENU
export const addMenu = (name, id) => async dispatch => {
  const res = await axios.post('/api/menu', {name, id});
  dispatch({ type: MENU_DATA, payload: res.data});
}

export const getMenu = () => async dispatch => {
  const res = await axios.get('/api/menu');
  dispatch({ type: MENU_DATA, payload: res.data});
}

export const deleteMenu = id => async dispatch => {
  const res = await axios.post('/api/menu/delete', {id});
  dispatch({ type: MENU_DATA, payload: res.data});
}

export const updateMenu = menu => async dispatch => {
  menu.map((item, index) => {
    item.index = index;
  })
  const res = await axios.put('/api/menu', {menu});
  dispatch({type: MENU_DATA, payload: res.data});
}

// ARTICLE
export const deleteArticle = id => async dispatch => {
  const res = await axios.post('/api/article/delete', {id});
  dispatch({ type: FETCH_DATA, payload: res.data});
}

export const updateArticle = (id, body) => async dispatch => {
  const res = await axios.put('/api/article', {id, body});
  dispatch({ type: FETCH_DATA, payload: res.data});
}

export const updateArticleColumn = (id, column) => async dispatch => {
  const res = await axios.put('/api/article/column', {id, column});
  dispatch({ type: FETCH_DATA, payload: res.data});
}

export const updateArticleVisible = (id, visible) => async dispatch => {
  const res = await axios.put('/api/article/visible', {id, visible});
  dispatch({ type: FETCH_DATA, payload: res.data});
}

export const shortArticles = articles => async dispatch => {
  articles.map((item, index) => {
    item.index = index;
  })
  const res = await axios.put('/api/article/sort', {articles});
  dispatch({ type: FETCH_DATA, payload: res.data});
}

// SOCIAL
export const saveSocial = (name, classname, link) => async dispatch => {
  const res = await axios.post('/api/icons', {name, classname, link});
  dispatch({ type: SOCIAL_DATA, payload: res.data});
}


export const getSocial = () => async dispatch => {
  const res = await axios.get('/api/icons');
  dispatch({ type: SOCIAL_DATA, payload: res.data});
}

export const deleteSocial = id => async dispatch => {
  const res = await axios.post('/api/social/delete', {id});
  dispatch({ type: SOCIAL_DATA, payload: res.data});
}

//Settings
export const setSetting = (type, val) => async dispatch => {
  const res = await axios.post('/api/setting/' + type, {val});
  dispatch({ type: SETTING_DATA, payload: res.data});
}

export const getSettings = () => async dispatch => {
  const res = await axios.get('/api/setting');
  dispatch({ type: SETTING_DATA, payload: res.data});
}
