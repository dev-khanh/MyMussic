/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import MainApp from '../compoment/MainApp';
import { PLAYING } from '../action/ActionType';

const connectState = (state) => {
    return {
        name: state.reducerState.name,
        playing: state.reducerState.playing,
    };
};
const conectStateDispatch = (dispatch) => {
    return {
        setOnClickDispatchEvent: () => {
            dispatch({ type: 'SET_ON_CLICK' });
        },
        setEventClickPlaying: (setPlaying) => {
            dispatch({ type: PLAYING, playing: setPlaying });
        },
        onClickPlayPause: (setPlaying) => {
            dispatch({ type: PLAYING, playing: setPlaying });
        },
    };
};
const MainAppContainer = connect(connectState, conectStateDispatch)(MainApp);
export default MainAppContainer;
