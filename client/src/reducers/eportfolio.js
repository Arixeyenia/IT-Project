import {
    GET_USER_EPORTFOLIOS,
    EPORTFOLIOS_ERROR,
    GET_EPORTFOLIO_THUMBNAILS,
    CREATE_PORTFOLIO_NAME,
    RESET_CREATEPORTFOLIO_NAME,
    CREATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    DELETE_PORTFOLIO_SETID
  } from '../actions/types';

const initialState = {
    userEPortfolios: [],
    eportfolioThumbnails: [],
    createPortfolioName: '',
    deleteThisPortfolio: null,
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
        case CREATE_PORTFOLIO_NAME:
            return {
                ...state,
                loading: false,
                createPortfolioName: payload,
            }
        case RESET_CREATEPORTFOLIO_NAME:
            return {
                ...state,
                loading: false,
                createPortfolioName: payload,
            }
        case CREATE_PORTFOLIO:
            return {
                ...state,
                loading: false,
                createPortfolioName: state.createPortfolioName,
                eportfolioThumbnails: [],
                userEPortfolios: [],
            }
        case DELETE_PORTFOLIO:
            return {
                ...state,
                loading: false,
                eportfolioThumbnails: [],
                userEPortfolios: [],
                deleteThisPortfolio: null,
            }
        case DELETE_PORTFOLIO_SETID:
            return{
                ...state,
                loading: false,
                deleteThisPortfolio: payload,
            }
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