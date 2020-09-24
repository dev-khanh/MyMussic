/* eslint-disable prettier/prettier */
import {
  PLAYING,
  EMAIL,
  PASS,
  PATH_IMAGE,
  VALUE_TITLE,
  VALUE_SUBTITLE,
  PATH_AUDIO,
  LONGDING,
  MODEL,
} from '../action/ActionType';
let appState = {
  playing: false,
  email: '',
  password: '',
  pathImages: '',
  valueTitle: '',
  valueSubTitle: '',
  pathAudio: '',
  fileName: '',
  checkLongding: false,
  modalVisible: false,
};
const reducerState = (state = appState, action) => {
  switch (action.type) {
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
    case LONGDING:
      return {
        ...state,
        checkLongding: action.checkLongding,
      };
    case MODEL:
      return {
        ...state,
        modalVisible: action.modalVisible,
      };
  }
  return state;
};
export default reducerState;
