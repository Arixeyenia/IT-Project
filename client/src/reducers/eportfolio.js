import {
    GET_USER_EPORTFOLIOS,
    EPORTFOLIOS_ERROR
  } from '../actions/types';

const initialState = {
    userEPortfolios: {},
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_USER_EPORTFOLIOS:
            return {
                ...state,
                userEPortfolios: payload,
                loading: false
            };
        case EPORTFOLIOS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                userEPortfolios: {},
            };
      default:
        return state;
    }
}