/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

export default class UploadDatabase extends PureComponent {
  componentDidMount() {
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setOnClickChoseImages()}>
          <Text>ssssssssssssssssssssssssssssssss</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setOnClickChooseAudio()}>
          <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
        </TouchableOpacity>
      </View>
    );
  }
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async setOnClickChooseAudio() {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      // console.log(
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size
      // );
      // console.log(res.name);
      const reference = storage().ref('audio/' + res.name);

      await reference.putFile('file:///sdcard/com.yy.hiyo/audio/soundConfig/' + res.name + '.mp3');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  setOnClickChoseImages() {
    const reference = storage().ref('images/' + this.makeid(5));
    ImagePicker.openPicker({
      multiple: false,
    }).then(async image => {
      console.log(image.path);
      await reference.putFile(image.path);
    });
  }
}

