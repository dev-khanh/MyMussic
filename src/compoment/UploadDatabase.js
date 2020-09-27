/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
  Modal,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  BackHandler,
} from 'react-native';
const { width, height } = Dimensions.get('window');
export default class UploadDatabase extends PureComponent {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = {
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.props.setLongdding();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
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
      checkLongding,
      arraysBloc,
      createTwoButtonAlert,
      modalVisible,
      dispathModalVisible,
    } = this.props;
    return checkLongding ? (
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
              <View style={styles.marginTopRight}>
                <Button
                  color="red"
                  title="Delete File"
                  onPress={() => dispathModalVisible(true)}
                />
              </View>
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
        {this.hadnlViewModel(
          arraysBloc,
          createTwoButtonAlert,
          modalVisible,
          dispathModalVisible,
        )}
      </View>
    ) : (
        this.handlLogin()
      );
  }
  hadnlViewModel = (
    arraysBloc,
    createTwoButtonAlert,
    modalVisible,
    dispathModalVisible,
  ) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        {arraysBloc.length > 0 ? this.handlModelFlatList(dispathModalVisible, arraysBloc, createTwoButtonAlert, modalVisible)
          : this.handlModelFlatListNull(dispathModalVisible, arraysBloc, createTwoButtonAlert, modalVisible)}
      </Modal>
    );
  };
  handlModelFlatListNull = (dispathModalVisible, arraysBloc, createTwoButtonAlert, modalVisible) => {
    return (
      <TouchableWithoutFeedback onPress={() => dispathModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewNull}>
            <Text style={styles.modalText}>Danh sách của bạn đang trống !!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback >
    );
  }
  handlModelFlatList = (dispathModalVisible, arraysBloc, createTwoButtonAlert, modalVisible) => {
    return (
      <TouchableWithoutFeedback onPress={() => dispathModalVisible(false)}>
        {/* TouchableWithoutFeedback  Dùng để close Model */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: width }}>
              <FlatList
                data={arraysBloc}
                renderItem={(item) =>
                  this.renderItem(
                    item.item,
                    createTwoButtonAlert,
                    modalVisible,
                  )
                }
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  renderItem = (item, createTwoButtonAlert, modalVisible) => {
    return (
      <TouchableOpacity
        onPress={() =>
          createTwoButtonAlert(item.title, item.key, modalVisible)
        }>
        <View style={styles.item}>
          <Image source={{ uri: item.artwork }} style={styles.imagesView} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  handlLogin = () => {
    return (
      <View style={styles.containnerHandleLogin}>
        <ActivityIndicator
          style={[styles.centering, styles.gray]}
          size="large"
          color="white"
        />
      </View>
    );
  };
}
const styles = {
  imagesView: { width: 90, height: 90, marginRight: 10 },
  touchabHighLight: () => ({
    ...styles.openButton,
    backgroundColor: '#2196F3',
  }),
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalViewNull: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalView: {
    width: width,
    height: height * 0.5,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  marginTopRight: {
    marginRight: 10,
  },
  containnerHandleLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
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
  viewMarginTop: { marginTop: 10, flexDirection: 'row' },
  viewTextInputTitle: {
    flex: 1,
    marginTop: 10,
  },

  item: {
    backgroundColor: 'yellow',
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
};
