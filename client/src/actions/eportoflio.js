import api from '../utils/api';
import {
    GET_USER_EPORTFOLIOS,
    EPORTFOLIOS_ERROR
} from './types';

export const getUserEPortfolios = () => async dispatch => {
    try {
        const res = await api.get('/portfolio/users');
        console.log(res);
        dispatch({
            type: GET_USER_EPORTFOLIOS,
            payload: res.data
        });
    } catch (err) {
        console.log("eportfolios_error")
        dispatch({
            type: EPORTFOLIOS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};