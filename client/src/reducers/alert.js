import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

//this alert reducer is basically a function
//takes in a state that do with alerts and an action (will be dispatched in action file)

const initialState = [];

//action contains a type (mandatory) and payload (which is data--not mandatory)
export default function (state = initialState, action) {
  //use this way so could use type and payload directly below instead of action.type and action.payload
  const { type, payload } = action;

  //evaluate type and then return new state
  switch (type) {
    case SET_ALERT:
      //return state in array -- copy current alert and add new data(payload)
      return [...state, payload];
    //filter out the payload(data)
    case REMOVE_ALERT:
      //remove alert by id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
