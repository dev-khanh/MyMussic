/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
// import MainAppContainer from './src/container/MainAppContainer';
import {Provider} from 'react-redux';
import store from './src/reducers';
import database from '@react-native-firebase/database';
import MainNavigation from './src/utils/MainNavigation';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
var RNFS = require('react-native-fs');

export default class App extends PureComponent {
  async componentDidMount() {
    console.log('componentDidMount');
    // database()
    //   .ref('users/')
    //   .on('value', (snapshot) => {
    //     console.log('User data: ', snapshot.val());
    //   });
    // database()
    //   .ref('playlist/' + 1111)
    //   .set(
    //     {
    //       url: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui154/YeuLaiTuDau-KhacViet_354qr.mp3?st=9XsGi_AB8ROgsvcOvAXv3w&e=1600789410&t=1600703010488',
    //       title: 'Yêu Lại Từ Đầu',
    //       artist: 'David Chavez',
    //       artwork: 'https://zicxaphotos.com/wp-content/uploads/2019/07/Girl-xinh-cute.jpg',
    //       duration: '143',
    //     },
    //     function (error) {
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Data saved successfully!');
    //       }
    //     },
    //   );
    const reference = storage().ref('xxxx.jpg');

    RNFS.readDir(RNFS.ExternalStorageDirectoryPath)
      .then( async (result) => {
        console.log('GOT RESULT', result);
        // await reference.putFile(result);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          return RNFS.readFile(statResult[1], 'utf8');
        }
        return 'no file';
      })
      .then((contents) => {
        console.log(contents);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}
