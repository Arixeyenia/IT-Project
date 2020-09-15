import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

//initial state --an object
const initialState = {
  //token we got back from server --get token stored in localStorage
  token: localStorage.getItem('token'),
  //set true once successfully login/registered
  isAuthenticated: null,
  //if user authenticated, wanna make sure loading is done-->already made req to backend and got response
  //once got response, then set to false
  loading: true,
  //get user data from backend then will put user data here
  user: null,
};

//function takes initial state , and action that's dispatched
export default function (state = initialState, action) {
  //destructure aciton.type and action.payload to type and action
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    //if register success , we got token back, put token in localstorage
    case REGISTER_SUCCESS:
      //...state mean whatever is in the current state
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    //remove token from localstorage, set things to null or false
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
