/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenHome from './ScreenHome';
import CardViewFlatList from './CardViewFlatList';
export default class MainApp extends PureComponent {
    componentDidMount(){
        this.props.setup();
    }
    render() {
        return (
            <View style={styles.container}>
                <CardViewFlatList setOnItemClickPlay={(item) => this.props.setOnItemClickPlay(item)}/>
                <ScreenHome playing={this.props.playing} setPlaying={(d) => this.props.setEventClickPlaying(d)}
                    onClickPlayPause={(d) => this.props.onClickPlayPause(d)} onPressPrev={this.props.onPressPrev} onPressNext={this.props.onPressNext} />
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
    },
};
