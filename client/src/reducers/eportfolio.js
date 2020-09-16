import {
    GET_USER_EPORTFOLIOS,
    EPORTFOLIOS_ERROR,
    GET_EPORTFOLIO_THUMBNAILS
  } from '../actions/types';

const initialState = {
    userEPortfolios: [],
    eportfolioThumbnails: [],
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
                loading: false,
            };
        case GET_EPORTFOLIO_THUMBNAILS:
            return {
                ...state,
                eportfolioThumbnails: state.eportfolioThumbnails.concat(payload),
                loading: false,
            };
        case EPORTFOLIOS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
      default:
        return state;
    }
}