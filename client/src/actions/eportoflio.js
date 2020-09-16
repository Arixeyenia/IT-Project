import { set } from 'mongoose';
import api from '../utils/api';
import { setAlert } from './alert';

import {
    GET_USER_EPORTFOLIOS,
    EPORTFOLIOS_ERROR,
    GET_EPORTFOLIO_THUMBNAILS
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
            payload: { msg: err.response.statusText, status: err.response.status }
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
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
        dispatch(setAlert("hi"));
    }
};