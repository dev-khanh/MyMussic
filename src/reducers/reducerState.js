/* eslint-disable prettier/prettier */
import {
  PLAYING,
  SET_STATE,
  EMAIL,
  PASS,
  PATH_IMAGE,
  VALUE_TITLE,
  VALUE_SUBTITLE,
  PATH_AUDIO,
} from '../action/ActionType';
let appState = {
  name: 'devk',
  playing: false,
  email: '',
  password: '',
  pathImages: '',
  valueTitle: '',
  valueSubTitle: '',
  pathAudio: '',
  fileName: '',
};
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
    case PATH_IMAGE:
      return {
        ...state,
        pathImages: action.pathImages,
      };
    case PATH_AUDIO:
      return {
        ...state,
        pathAudio: action.pathAudio,
        fileName: action.fileName,
      };
    case VALUE_TITLE:
      return {
        ...state,
        valueTitle: action.valueTitle,
      };
    case VALUE_SUBTITLE:
      return {
        ...state,
        valueSubTitle: action.valueSubTitle,
      };
  }
  return state;
};
export default reducerState;
