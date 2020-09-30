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
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

const initialState = {
  portfolio: {},
  page: {},
  userEPortfolios: [],
  eportfolioThumbnails: [],
  createPortfolioName: '',
  loading: true,
  comments: {},
  error: {},
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
      };
    case RESET_CREATEPORTFOLIO_NAME:
      return {
        ...state,
        loading: false,
        createPortfolioName: payload,
      };
    case CREATE_PORTFOLIO:
      return {
        ...state,
        loading: false,
        createPortfolioName: state.createPortfolioName,
        eportfolioThumbnails: [],
        userEPortfolios: [],
      };
    case DELETE_PORTFOLIO:
      return {
        ...state,
        loading: false,
        eportfolioThumbnails: [],
        userEPortfolios: [],
      };
    case GET_PORTFOLIO:
      return {
        ...state,
        portfolio: payload,
        loading: false,
      };
    case GET_PAGE:
      return {
        ...state,
        page: payload,
        loading: false,
      };
    case EDIT_ITEM:
      return {
        ...state,
        page: {
          ...state.page,
          items: state.page.items.map((item) =>
            item._id === payload._id ? payload : item
          ),
        },
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        page: { ...state.page, items: [...state.page.items, payload] },
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        page: {
          ...state.page,
          items: state.page.items.filter((item) => item._id !== payload._id),
        },
        loading: false,
      };
    case EPORTFOLIOS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: { ...state.comments, ...payload },
        loading: false,
      };
    case COMMENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case POST_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.item]: [payload, ...state.comments[payload.item]],
        },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: { ...payload },
        loading: false,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.item]: state.comments[payload.item].map((comment) =>
            comment._id == payload._id ? payload : comment
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
