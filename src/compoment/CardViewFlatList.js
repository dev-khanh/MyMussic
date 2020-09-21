/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import DATA from './Demo/playlist.json';
export default class CardViewFlatList extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={(item) => this.renderItem(item.item)}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
  renderItem = (item) => {
    return (
      <View style={styles.containerCardPDFCardList}>
        <View style={styles.cardPDF}>
          <TouchableOpacity onPress={() => this.props.setOnItemClickPlay(item)}>
            <View style={styles.row}>
              <Image
                style={styles.profileImgCardPDF}
                source={{
                  uri: item.artwork,
                }}
              />
              <View>
                <Text style={styles.textCardList(item.id)}>{item.title}</Text>
                <Text style={styles.colorGrayPDFCardList(item.id)}>
                  {item.artist}
                </Text>
                <Text style={styles.colorGrayPDFCardList(item.id)}>
                  {item.duration}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}
const styles = {
  container: {
    height: height * 0.85,
  },
  row: {
    flexDirection: 'row',
  },
  containerCardPDFCardList: {
    width: width * 0.964,
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  cardPDF: {
    height: 140,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    padding: 10,
  },
  profileImgCardPDF: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginRight: 5,
  },
  textCardList: (index) => ({
    fontWeight: 'bold',
    fontSize: index !== 'com.smartbus_qc' ? 24 : 22,
    marginTop: index !== 'com.smartbus_qc' ? 15 : 5,
  }),
  colorGrayPDFCardList: (index) => ({
    color: 'gray',
    marginTop: index !== 'com.smartbus_qc' ? 8 : 0,
    fontSize: index !== 'com.smartbus_qc' ? 22 : 16,
    marginLeft: 2,
  }),
};
