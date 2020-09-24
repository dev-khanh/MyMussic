/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
  Modal,
  Alert,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default class UploadDatabase extends PureComponent {
  state = {
    modalVisible: false,
  };
  componentDidMount() {
    this.props.setLongdding();
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
    // console.log(modalVisible);
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
          {/* TouchableWithoutFeedback  Dùng để close Model */}
        <TouchableWithoutFeedback onPress={() => dispathModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <TouchableHighlight
                style={styles.touchabHighLight()}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                  });
                }}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight> */}
              <View style={{width: width}}>
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
      </Modal>
    );
  };
  renderItem = (item, createTwoButtonAlert, modalVisible) => {
    return (
      <TouchableOpacity
        onPress={() =>
          createTwoButtonAlert(item.title, item.key, modalVisible)
        }>
        <View style={styles.item}>
          <Image source={{uri: item.artwork}} style={styles.imagesView} />
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
  imagesView: {width: 90, height: 90, marginRight: 10},
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
  viewMarginTop: {marginTop: 10, flexDirection: 'row'},
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
