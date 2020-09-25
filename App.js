/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
// import MainAppContainer from './src/container/MainAppContainer';
import { Provider } from 'react-redux';
import store from './src/reducers';
import database, { firebase } from '@react-native-firebase/database';
import MainNavigation from './src/utils/MainNavigation';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import UpdateContaner from './src/container/UpdateContainer';
var RNFS = require('react-native-fs');

export default class App extends PureComponent {
  async componentDidMount() {
    // console.log('componentDidMount');
    database()
      .ref('/playlist')
      .on('value', (snapshot) => {
        var key = Object.keys(snapshot.val());
        for (var i = 0; i < key.length; i++) {
          console.log('User data: ', JSON.stringify(snapshot.val()[key[i]]));
        }
      });


    // RNFS.readDir(RNFS.DownloadDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //   .then((result) => {
    //     console.log('GOT RESULT', result);

    //     // stat the first file
    //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //   })
    //   .then((statResult) => {
    //     if (statResult[0].isFile()) {
    //       // if we have a file, read it
    //       return RNFS.readFile(statResult[1], 'utf8');
    //     }

    //     return 'no file';
    //   })
    //   .then((contents) => {
    //     // log the file contents
    //     console.log(contents);
    //   })
    //   .catch((err) => {
    //     console.log(err.message, err.code);
    //   });
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}
