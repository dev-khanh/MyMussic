/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Button,
} from 'react-native';
const {width} = Dimensions.get('window');
export default class UploadDatabase extends PureComponent {
  render() {
    const {
      fileName,
      pathAudio,
      pathImages,
      valueTitle,
      valueSubTitle,
      setOnClickChoseImages,
      setOnClickChooseAudio,
      onChangeTextTitle,
      onChangeTextSubTitile,
      setOnclickUpdateFile,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={() => setOnClickChoseImages()}>
            <Image
              source={{
                uri:
                  pathImages === ''
                    ? 'https://static.thenounproject.com/png/1213473-200.png'
                    : pathImages,
              }}
              style={styles.imagesStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOnClickChooseAudio()}>
            <Image
              source={{
                uri:
                  pathAudio === ''
                    ? 'https://cdn.onlinewebfonts.com/svg/img_400302.png'
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/600px-Light_green_check.svg.png',
              }}
              style={styles.imagesStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewTextInputTitle}>
          <TextInput
            placeholder="Title ..."
            style={styles.textInput}
            onChangeText={(text) => onChangeTextTitle(text)}
            value={valueTitle}
          />
          <TextInput
            placeholder="Sub Title ..."
            style={styles.textInput}
            onChangeText={(text) => onChangeTextSubTitile(text)}
            value={valueSubTitle}
          />
          <View style={styles.viewContainerPress}>
            <View style={styles.viewMarginTop}>
              <Button
                title="Update File"
                onPress={() =>
                  setOnclickUpdateFile(
                    pathImages,
                    valueTitle,
                    valueSubTitle,
                    pathAudio,
                    fileName,
                  )
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    padding: 20,
    flex: 1,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  imagesStyle: {
    width: width * 0.4,
    height: 170,
  },
  viewContainerPress: {
    width: width * 0.9,
    alignItems: 'flex-end',
  },
  viewMarginTop: {marginTop: 10},
  viewTextInputTitle: {
    flex: 1,
    marginTop: 10,
  },
};
