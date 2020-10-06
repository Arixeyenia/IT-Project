import { red } from '@material-ui/core/colors';
import api from '../utils/api';

import {
  GET_USER_EPORTFOLIOS,
  EPORTFOLIOS_ERROR,
  GET_EPORTFOLIO_THUMBNAILS,
  CREATE_PORTFOLIO_NAME,
  RESET_CREATEPORTFOLIO_NAME,
  CREATE_PORTFOLIO,
  GET_PORTFOLIO,
  GET_PAGE,
  DELETE_PORTFOLIO,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  GET_COMMENTS,
  COMMENTS_ERROR,
  POST_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  CREATE_PAGE,
  EDIT_PAGENAME,
  MAKE_MAIN,
  DELETE_PAGE
} from './types';

export const getUserEPortfolios = () => async (dispatch) => {
  try {
    const res = await api.get('/portfolio/user');
    dispatch({
      type: GET_USER_EPORTFOLIOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getEPortfolioThumbnail = (eportfolioID) => async (dispatch) => {
  try {
    const res = await api.get('/portfolio/thumbnail/' + eportfolioID, {
      responseType: 'blob',
    });
    dispatch({
      type: GET_EPORTFOLIO_THUMBNAILS,
      payload: URL.createObjectURL(res.data),
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const creatingPortfolioName = (name) => async (dispatch) => {
  dispatch({
    type: CREATE_PORTFOLIO_NAME,
    payload: name,
  });
};

export const resetCreatingPortfolioName = () => async (dispatch) => {
  dispatch({
    type: RESET_CREATEPORTFOLIO_NAME,
    payload: '',
  });
};

export const createPortfolio = (name) => async (dispatch) => {
  try {
    const res = await api.post('/portfolio', { name: name });
    dispatch({
      type: CREATE_PORTFOLIO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.msg },
    });
  }
};

export const deletePortfolio = (id) => async (dispatch) => {
  try {
    const res = await api.delete('/portfolio/delete/' + id);
    dispatch({
      type: DELETE_PORTFOLIO,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getPortfolio = (eportfolioID) => async (dispatch) => {
  try {
    const res = await api.get('/portfolio/guest/' + eportfolioID);
    dispatch({
      type: GET_PORTFOLIO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getPage = (eportfolioID, pageName) => async (dispatch) => {
  try {
    const link = pageName === undefined ? '' : '/' + pageName;
    const res = await api.get('/page/' + eportfolioID + link);
    dispatch({
      type: GET_PAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const editItem = (newItem) => async (dispatch) => {
  try {
    const res = await api.put('/item', newItem);
    dispatch({
      type: EDIT_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const addItem = (newItem) => async (dispatch) => {
  try {
    const res = await api.post('/item', newItem);
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteItem = (itemID) => async (dispatch) => {
  try {
    const res = await api.delete('/item/' + itemID);
    dispatch({
      type: DELETE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getComments = (itemID) => async (dispatch) => {
  try {
    const res = await api.get('/comment/' + itemID);
    dispatch({
      type: GET_COMMENTS,
      payload: { [itemID]: res.data },
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const postComment = (itemID, text) => async (dispatch) => {
  try {
    const res = await api.post('/comment/' + itemID, { text: text });
    dispatch({
      type: POST_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteComment = (commentID) => async (dispatch) => {
  try {
    const res = await api.delete('/comment/' + commentID);
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const editComment = (commentID, text) => async (dispatch) => {
  try {
    const res = await api.post('/comment/edit/' + commentID, {
      text: text,
    });
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const createPage = (newPage) => async (dispatch) => {
  try {
    const res = await api.post('/page', newPage);
    dispatch({
      type: CREATE_PAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const editPagename = (body) => async (dispatch) => {
  try {
    const res = await api.post('/page/editname', body);
    dispatch({
      type: EDIT_PAGENAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const makeMain = (portfolioID, pagename) => async (dispatch) => {
  try {
    const res = await api.put('/page/makemain', {
      'portfolio': portfolioID,
      'pagename': pagename
    });
    dispatch({
      type: MAKE_MAIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deletePage = (portfolioID, pageURL) => async (dispatch) => {
  try {
    const res = await api.delete('/page/' + portfolioID + '/' + pageURL);
    dispatch({
      type: DELETE_PAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};