/* eslint-disable prettier/prettier */
import {PLAYING, SET_STATE, EMAIL, PASS} from '../action/ActionType';
let appState = {name: 'devk', playing: false, email: '', password: ''};
const reducerState = (state = appState, action) => {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        name: action.name,
      };
    case PLAYING:
      return {
        ...state,
        playing: action.playing,
      };
    case EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case PASS:
      return {
        ...state,
        password: action.password,
      };
  }
  return state;
};
export default reducerState;
