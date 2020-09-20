/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import MainApp from '../compoment/MainApp';
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
    };
};
const MainAppContainer = connect(connectState, conectStateDispatch)(MainApp);
export default MainAppContainer;
