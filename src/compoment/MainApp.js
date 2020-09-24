/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenHome from './ScreenHome';
import CardViewFlatList from './CardViewFlatList';
export default class MainApp extends PureComponent {
    componentDidMount() {
        this.props.setup();
    }
    render() {
        const {arraysBloc} = this.props;
        return (
            <View style={styles.container}>
                <CardViewFlatList setOnItemClickPlay={(item, index) => this.props.setOnItemClickPlay(item, index)} arraysBloc={arraysBloc}/>
                <ScreenHome playing={this.props.playing} setPlaying={(d) => this.props.setEventClickPlaying(d, arraysBloc)}
                    onClickPlayPause={(d) => this.props.onClickPlayPause(d, arraysBloc)} onPressPrev={this.props.onPressPrev} onPressNext={this.props.onPressNext} />
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
    },
};
