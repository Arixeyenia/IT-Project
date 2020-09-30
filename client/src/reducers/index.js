import { combineReducers } from 'redux';
import auth from './auth';
import eportfolio from './eportfolio';

//combine all reducers created here
export default combineReducers({
  auth,
  eportfolio,
});
