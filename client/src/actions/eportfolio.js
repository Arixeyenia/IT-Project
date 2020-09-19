import { set } from 'mongoose';
import api from '../utils/api';
import { setAlert } from './alert';

import {
    EPORTFOLIOS_ERROR, GET_PORTFOLIO, GET_PAGE
} from './types';

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
};

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
};