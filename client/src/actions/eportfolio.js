import { red } from '@material-ui/core/colors';
import api from '../utils/api';
import { createMuiTheme } from '@material-ui/core/styles';

import {
  GET_USER_EPORTFOLIOS,
  GET_SAVED,
  EPORTFOLIOS_ERROR,
  GET_EPORTFOLIO_THUMBNAILS,
  CREATE_PORTFOLIO_NAME,
  RESET_CREATEPORTFOLIO_NAME,
  CREATE_PORTFOLIO,
  GET_PORTFOLIO,
  GET_PORTFOLIO_GUEST,
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
  DELETE_PAGE,
  GET_ERROR,
  ADD_SOCIAL_MEDIA,
  GET_TEMPLATES,
  SET_PRIVACY,
  SHARE_PORTFOLIO,
  SAVE_PORTFOLIO,
  SAVE_THEME,
  GET_THEME
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

export const getSaved = () => async (dispatch) => {
  try {
    const res = await api.get('/user/saved');
    dispatch({
      type: GET_SAVED,
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

export const creatingPortfolioName = (name, privacy) => async (dispatch) => {
  const info = {
    'name': name,
    'privacy': privacy
  }
  dispatch({
    type: CREATE_PORTFOLIO_NAME,
    payload: info,
  });
};

export const resetCreatingPortfolioName = () => async (dispatch) => {
  dispatch({
    type: RESET_CREATEPORTFOLIO_NAME,
    payload: '',
  });
};

export const createPortfolio = (details, currTemplate) => async (dispatch) => {
  try {
    const res = await api.post('/portfolio', { name: details.name, private: details.privacy, emails: details.emails, template : currTemplate });
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
    const res = await api.get('/portfolio/single/' + eportfolioID);
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

export const getPortfolioAsGuest = (eportfolioID) => async (dispatch) => {
  try {
    const res = await api.get('/portfolio/guest/' + eportfolioID);
    dispatch({
      type: GET_PORTFOLIO_GUEST,
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
    const res = await api.get('/page/single/' + eportfolioID + link);
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

export const getPageAsGuest = (eportfolioID, pageName) => async (dispatch) => {
  try {
    const link = pageName === undefined ? '' : '/' + pageName;
    const res = await api.get('/page/guest/' + eportfolioID + link);
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

export const addSocialMedia = (newItem) => async (dispatch) => {
  try {
    const res = await api.put('/portfolio/socialmedia', newItem);
    dispatch({
      type: ADD_SOCIAL_MEDIA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getTemplates = () => async (dispatch) => {
  try {
    const res = await api.get('/portfolio/templates');
    dispatch({
      type: GET_TEMPLATES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};
      
export const savePortfolio = (portfolioID) => async (dispatch) => {
  try {
    const res = await api.put('/user/save', {portfolio: portfolioID});
    dispatch({
      type: SAVE_PORTFOLIO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const setPrivacy = (privacy, portfolioID) => async (dispatch) => {
  try {
    const res = await api.put('/portfolio/edit', {
      portfolio: portfolioID,
      field: 'privacy',
      value: privacy,
    });
    dispatch({
      type: SET_PRIVACY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const sharePortfolio = (email, add, portfolioID) => async (dispatch) => {
  try {
    const res = await api.put('/portfolio/permission', {
      portfolio: portfolioID,
      add: add,
      email: email,
    });
    dispatch({
      type: SHARE_PORTFOLIO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const saveTheme = (newTheme) => async (dispatch) => {
  try {
    const res = await api.put('/portfolio/theme', newTheme);
    dispatch({
      type: SAVE_THEME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EPORTFOLIOS_ERROR,
      payload: { msg: err.message }
    });
  }
}

export const getTheme = (theme, fonts) => (dispatch) => {
  const primaryFont5 = {
    fontFamily: theme.primaryFontFamily,
    fontStyle: theme.primaryFontVariant.search('itallic') === -1 ? 'normal' : 'itallic',
    fontDisplay: 'swap',
    fontWeight: '500',
    src: `local(${theme.primaryFontFamily}),
    url(${fonts.find(font=>font.family===theme.primaryFontFamily).files['500']}) format('ttf')`
  }

  const primaryFont4 = {
      fontFamily: theme.primaryFontFamily,
      fontStyle: theme.primaryFontVariant.search('itallic') === -1 ? 'normal' : 'itallic',
      fontDisplay: 'swap',
      fontWeight: '400',
      src: `local(${theme.primaryFontFamily}),
      local(${theme.primaryFontFamily}-Regular),
      url(${fonts.find(font=>font.family===theme.primaryFontFamily).files['400']}) format('ttf')`
  }

  const secondaryFont2 = {
      fontFamily: theme.secondaryFontFamily,
      fontStyle: theme.secondaryFontVariant.search('itallic') === -1 ? 'normal' : 'itallic',
      fontDisplay: 'swap',
      fontWeight: '200',
      src: `local(${theme.secondaryFontFamily}),
      url(${fonts.find(font=>font.family===theme.secondaryFontFamily).files['200']}) format('ttf')`
  }

  const secondaryFont3 = {
      fontFamily: theme.secondaryFontFamily,
      fontStyle: theme.secondaryFontVariant.search('itallic') === -1 ? 'normal' : 'itallic',
      fontDisplay: 'swap',
      fontWeight: '300',
      src: `local(${theme.secondaryFontFamily}),
      url(${fonts.find(font=>font.family===theme.secondaryFontFamily).files['300']}) format('ttf')`
  }

  const secondaryFont4 = {
      fontFamily: theme.secondaryFontFamily,
      fontStyle: theme.secondaryFontVariant.search('itallic') === -1 ? 'normal' : 'itallic',
      fontDisplay: 'swap',
      fontWeight: '400',
      src: `local(${theme.secondaryFontFamily}),
      local(${theme.secondaryFontFamily}-Regular),
      url(${fonts.find(font=>font.family===theme.secondaryFontFamily).files['400']}) format('ttf')`
  }

  const customTheme = createMuiTheme({
      palette: {
          primary: {
              main: theme.primaryColor
          },
          secondary: {
              main: theme.secondaryColor
          }
      },
      typography: {
          fontFamily: `${theme.primaryFontFamily}, ${theme.secondaryFontFamily}, Roboto, SourceSansPro, Helvetica, Arial`,
          h1: {
              fontFamily: theme.primaryFontFamily,
              fontWeight: 500,
              fontSize: '3rem',
          },
          h3: {
              fontFamily: theme.primaryFontFamily,
              fontWeight: 400,
              fontSize: '2rem',
          },
          body1: {
              fontFamily: theme.secondaryFontFamily,
              fontWeight: 200
          },
          body2: {
              fontFamily: theme.secondaryFontFamily,
              fontWeight: 400
          },
          subtitle1: {
              fontFamily: theme.secondaryFontFamily,
              fontWeight: 300
          },
          button: {
              fontFamily: theme.secondaryFontFamily,
              fontWeight: 300
          }
      },
      overrides: {
          MuiCssBaseline: {
              '@global': {
                  '@font-face': [
                      primaryFont4,
                      primaryFont5,
                      secondaryFont2,
                      secondaryFont3,
                      secondaryFont4
                  ]
              }
          }
      }
  });
  dispatch({
    type: GET_THEME,
    payload: customTheme
  });
}

export const getError = () => async (dispatch) => {
  dispatch({
    type: GET_ERROR
  })
}