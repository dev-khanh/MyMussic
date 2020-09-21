/* eslint-disable prettier/prettier */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createApplyMiddleware from 'redux-saga';
import reducerState from './reducerState';
import rootSaga from '../saga/rootSaga';
import TrackPlayer from 'react-native-track-player';


const appMiddleware = createApplyMiddleware();

const allReduces = combineReducers({
    reducerState,
});
const store = createStore(allReduces, applyMiddleware(appMiddleware));
appMiddleware.run(rootSaga);
TrackPlayer.registerPlaybackService(() => require('../saga/service'));

export default store;
