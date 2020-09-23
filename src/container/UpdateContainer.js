import {connect} from 'react-redux';
import UploadDatabase from '../compoment/UploadDatabase';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import FilePickerManager from 'react-native-file-picker';
import database from '@react-native-firebase/database';

import {
  PATH_IMAGE,
  VALUE_TITLE,
  VALUE_SUBTITLE,
  PATH_AUDIO,
} from '../action/ActionType';
const connectState = (state) => {
  return {
    pathImages: state.reducerState.pathImages,
    valueTitle: state.reducerState.valueTitle,
    valueSubTitle: state.reducerState.valueSubTitle,
    pathAudio: state.reducerState.pathAudio,
    fileName: state.reducerState.fileName,
  };
};
const connectDispatchState = (dispatch) => {
  return {
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
    setOnClickChooseAudio: () => {
      const options = {
        title: 'File Picker',
        chooseFileButtonTitle: 'Choose File...',
      };
      FilePickerManager.showFilePicker(options, async (response) => {
        // console.log('Response = ', response.path);
        if (response.path !== undefined) {
          dispatch({
            type: PATH_AUDIO,
            pathAudio: response.path,
            fileName: response.fileName,
          });
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
        } else {
          alert('Yêu cầu chọn đúng file nhạc !!!');
        }
      });
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
                alert('Update Success !!!');
                check = 0;
              }
            },
          );
        }
      } else {
        alert('Yêu cầu nhập đây đủ thông tin !!!');
      }
    },
  };
};
const UpdateContaner = connect(
  connectState,
  connectDispatchState,
)(UploadDatabase);
export default UpdateContaner;
