/* eslint-disable prettier/prettier */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createApplyMiddleware from 'redux-saga';
import reducerState from './reducerState';
import rootSaga from '../saga/rootSaga';

const appMiddleware = createApplyMiddleware();

const allReduces = combineReducers({
    reducerState,
});
const store = createStore(allReduces, applyMiddleware(appMiddleware));
appMiddleware.run(rootSaga);
export default store;
