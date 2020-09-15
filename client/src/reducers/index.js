import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import eportfolio from './eportfolio';

//combine all reducers created here
export default combineReducers({
  alert,
  auth,
  profile,
  eportfolio,
});
