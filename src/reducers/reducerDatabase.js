/* eslint-disable prettier/prettier */
let appState = {arraysBloc: [], arraysID: []};
import {PUT_LIST_MUSIC} from '../action/ActionType';
export default function reducerDatabase(state = appState, action) {
  switch (action.type) {
    case PUT_LIST_MUSIC:
      return {
        ...state,
        arraysBloc: action.arraysBloc,
      };
  }
  return state;
}
