import { set } from 'mongoose';
import api from '../utils/api';
import { setAlert } from './alert';

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
} from './types';

export const getUserEPortfolios = () => async dispatch => {
    try {
        const res = await api.get('/portfolio/user');
        dispatch({
            type: GET_USER_EPORTFOLIOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EPORTFOLIOS_ERROR,
            payload: { msg: err.message }
        });
    }
};

export const getEPortfolioThumbnail = (eportfolioID) => async dispatch => {
    try {
        const res = await api.get('/portfolio/thumbnail/'+eportfolioID, {
            responseType: 'blob',
        });
        dispatch({
            type: GET_EPORTFOLIO_THUMBNAILS,
            payload: URL.createObjectURL(res.data),
        });
    } catch (err) {
        dispatch({
            type: EPORTFOLIOS_ERROR,
            payload: { msg: err.message }
        });
    }
};

export const creatingPortfolioName = (name) => async dispatch => {
    dispatch({
        type: CREATE_PORTFOLIO_NAME,
        payload: name
    });
};

export const resetCreatingPortfolioName = () => async dispatch => {
    dispatch({
        type: RESET_CREATEPORTFOLIO_NAME,
        payload: ''
    });
}

export const createPortfolio = (name) => async dispatch => {
    try {
        const res = await api.post('/portfolio', {name: name});
        dispatch({
            type: CREATE_PORTFOLIO
        });
    } catch (err) {
        dispatch({
            type: EPORTFOLIOS_ERROR,
            payload: { msg: err.msg }
        });
    }
}

export const deletePortfolio = (id) => async dispatch => {
    try {
        const res = await api.delete('/portfolio/delete', { data: {id: id}});
        dispatch({
            type: DELETE_PORTFOLIO
        });
    } catch (err) {
        dispatch({
            type: EPORTFOLIOS_ERROR,
            payload: { msg: err.message }
        });
    }
}   


export const getPortfolio = (eportfolioID) => async dispatch => {
    try {
        const res = await api.get('/portfolio/guest/' + eportfolioID);
        dispatch({
            type: GET_PORTFOLIO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EPORTFOLIOS_ERROR,
            payload: { msg: err.message }
        });
    }
}

export const getPage = (eportfolioID, pageName) => async dispatch => {
    try {
        const link = (pageName === undefined) ? '' : '/'  + pageName;
        const res = await api.get('/page/' + eportfolioID + link);
        dispatch({
            type: GET_PAGE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EPORTFOLIOS_ERROR,
            payload: { msg: err.message }
        });
    }
}
