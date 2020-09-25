import {connect} from 'react-redux';
import {Alert, NativeModules} from 'react-native';
import UploadDatabase from '../compoment/UploadDatabase';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import FilePickerManager from 'react-native-file-picker';
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');

import database from '@react-native-firebase/database';
import {CallEventData, DeleteEventData} from '../action';
import {
  PATH_IMAGE,
  VALUE_TITLE,
  VALUE_SUBTITLE,
  PATH_AUDIO,
  LONGDING,
  MODEL,
} from '../action/ActionType';

const {ChooseFileMudules} = NativeModules;

const connectState = (state) => {
  return {
    pathImages: state.reducerState.pathImages,
    valueTitle: state.reducerState.valueTitle,
    valueSubTitle: state.reducerState.valueSubTitle,
    pathAudio: state.reducerState.pathAudio,
    fileName: state.reducerState.fileName,
    checkLongding: state.reducerState.checkLongding,
    arraysBloc: state.reducerDatabase.arraysBloc,
    modalVisible: state.reducerState.modalVisible,
  };
};
const connectDispatchState = (dispatch) => {
  return {
    setLongdding: () => {
      dispatch(CallEventData());
      dispatch({type: LONGDING, checkLongding: true});
    },
    setOnClickChoseImages: () => {
      ImagePicker.openPicker({
        multiple: false,
      }).then(async (image) => {
        var str = image.path;
        dispatch({type: PATH_IMAGE, pathImages: str});
        // var split = str.split(
        //   'file:///data/user/0/com.mymussic/cache/react-native-image-crop-picker/',
        // );
        // console.log(split[1]);
        // await storage()
        //   .ref('images/' + split[1])
        //   .putFile(image.path);
      });
    },
    setOnClickChooseAudio: async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.audio],
          //There can me more options as well
          // DocumentPicker.types.allFiles
          // DocumentPicker.types.images
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          // DocumentPicker.types.pdf
        });
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        ChooseFileMudules.File(res.uri);
        // var data = await RNFS.readFile(res.uri);
        // console.log(data);
        //Setting the state to show single file attributes
        // this.setState({singleFile: res});
        // content://com.android.providers.downloads.documents/document/msf%3A37
        // const reference = storage().ref('audio/' + 'ssssssss');
        // await reference.putFile('file://com.android.providers.downloads.documents/document/msf%3A37');
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          alert('Canceled from single doc picker');
        } else {
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }

      // const options = {
      //   title: 'File Picker',
      //   chooseFileButtonTitle: 'Choose File...',
      // };
      // let options = {
      //   storageOptions: {
      //     skipBackup: true,
      //     path: 'images',
      //   },
      // };
      // FilePickerManager.showFilePicker(null, async (response) => {
      //   console.log('Response = ', response.path);
      //   if (response.path !== undefined) {
      // dispatch({
      //   type: PATH_AUDIO,
      //   pathAudio: response.path,
      //   fileName: response.fileName,
      // });
      //   const reference = storage().ref('audio/' + response.fileName);
      //   await reference.putFile(response.path);
      //   if (response.didCancel) {
      //     console.log('User cancelled file picker');
      //   } else if (response.error) {
      //     console.log('FilePickerManager Error: ', response.error);
      //   } else {
      //     this.setState({
      //       file: response,
      //     });
      //   }
      //   } else {
      //     Alert.alert('Yêu cầu chọn đúng file nhạc !!!');
      //   }
      // });
    },
    onChangeTextTitle: (text) => {
      dispatch({type: VALUE_TITLE, valueTitle: text});
    },
    onChangeTextSubTitile: (text) => {
      dispatch({type: VALUE_SUBTITLE, valueSubTitle: text});
    },
    setOnclickUpdateFile: async (
      pathImages,
      valueTitle,
      valueSubTitle,
      pathAudio,
      fileName,
    ) => {
      dispatch({type: LONGDING, checkLongding: false});
      if (
        pathImages !== '' &&
        valueTitle !== '' &&
        valueSubTitle !== '' &&
        pathAudio !== ''
      ) {
        var check = 0;
        var split = pathImages.split(
          'file:///data/user/0/com.mymussic/cache/react-native-image-crop-picker/',
        );
        // console.log(split[1]);
        await storage()
          .ref('images/' + split[1])
          .putFile(pathImages)
          .then(() => {
            check++;
          });

        await storage()
          .ref('audio/' + fileName)
          .putFile(pathAudio)
          .then(() => {
            check++;
          });
        if (check === 2) {
          const urlImages = await storage()
            .ref('images/' + split[1])
            .getDownloadURL();
          const urlAudio = await storage()
            .ref('audio/' + fileName)
            .getDownloadURL();
          const newReference = database().ref('/playlist').push();
          //   console.log(newReference.key);
          newReference.set(
            {
              url: urlAudio,
              title: valueTitle,
              artist: valueSubTitle,
              artwork: urlImages,
              duration: '143',
            },
            function (error) {
              if (error) {
                console.log(error);
              } else {
                console.log('Data saved successfully!');
                dispatch({type: PATH_IMAGE, pathImages: ''});
                dispatch({
                  type: PATH_AUDIO,
                  pathAudio: '',
                  fileName: '',
                });
                dispatch({type: VALUE_TITLE, valueTitle: ''});
                dispatch({type: VALUE_SUBTITLE, valueSubTitle: ''});
                dispatch({type: LONGDING, checkLongding: true});
                Alert.alert('Update Success !!!');
                check = 0;
              }
            },
          );
        }
      } else {
        Alert.alert('Yêu cầu nhập đây đủ thông tin !!!');
      }
    },
    createTwoButtonAlert: (title, key, modalVisible) =>
      Alert.alert(
        'Bạn có muốn xóa không ???',
        title,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch({type: MODEL, modalVisible: !modalVisible});
              dispatch(DeleteEventData(key));
            },
          },
        ],
        {cancelable: false},
      ),
    dispathModalVisible: (visible) => {
      dispatch({type: MODEL, modalVisible: visible});
    },
  };
};
const UpdateContaner = connect(
  connectState,
  connectDispatchState,
)(UploadDatabase);
export default UpdateContaner;
