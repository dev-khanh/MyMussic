/* eslint-disable prettier/prettier */
import {all, fork, takeEvery, put, call} from 'redux-saga/effects';
import {
  EVENT_CALL_DB,
  PUT_LIST_MUSIC,
  EVENT_DELETE_DB,
} from '../action/ActionType';
import database from '@react-native-firebase/database';
export default function* rootSaga() {
  yield all([fork(setDataSaga), fork(setDataSagaDelete)]);
}
function* setDataSaga() {
  yield takeEvery(EVENT_CALL_DB, event_set_ON_Click);
}
function* event_set_ON_Click() {
  try {
    var roomRef = database().ref('/playlist/');
    var callDataRespones = yield call(function () {
      return new Promise(function (resolve, reject) {
        roomRef.once('value', function (snap) {
          const addList = [];
          database()
            .ref('/playlist')
            .on('value', (snapshot) => {
              if (snapshot.val() !== null) {
                var key = Object.keys(snapshot.val());
                for (var i = 0; i < key.length; i++) {
                  addList.push(snapshot.val()[key[i]]);
                }
                addList.map((d, index) => {
                  d.key = key[index];
                });
                // console.log(addList);
                resolve(addList);
              }
            });
        });
      });
    });
    // console.log(callDataRespones);
    yield put({type: PUT_LIST_MUSIC, arraysBloc: callDataRespones});
  } catch (e) {
    // yield put({type: FETCH_FAILED, isEditing: false});
  }
}

function* setDataSagaDelete() {
  yield takeEvery(EVENT_DELETE_DB, event_delete_onClick);
}
function* event_delete_onClick(action) {
  try {
    console.log('DEN daty: ', action.sort);
    yield database()
      .ref('/playlist/' + action.sort)
      .remove();
  } catch (e) {}
}
