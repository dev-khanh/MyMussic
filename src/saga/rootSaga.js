/* eslint-disable prettier/prettier */
import { all, fork, takeEvery, put } from 'redux-saga/effects';
export default function* rootSaga() {
    yield all([
        fork(setDataSaga),
    ]);
}
function* setDataSaga() {
    yield takeEvery('SET_ON_CLICK', event_set_ON_Click);
}
function* event_set_ON_Click() {
    try {
        console.log('DEN day');
        // const reponse = yield getApi.getApiBlogUser();
        yield put({ type: 'SET_STATE', name: 'Duong Quoc Khanh' });
    } catch (e) {
        // yield put({type: FETCH_FAILED, isEditing: false});
    }
}
