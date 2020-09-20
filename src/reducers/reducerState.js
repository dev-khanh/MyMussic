/* eslint-disable prettier/prettier */
import { PLAYING, SET_STATE } from '../action/ActionType';
let appState = { name: 'devk', playing: false };
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
    }
    return state;
};
export default reducerState;
