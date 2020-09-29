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
        const { onPressNext, onPressPrev, arraysBloc, playing, setOnItemClickPlay, setEventClickPlaying, onClickPlayPause } = this.props;
        this.props.ListenRender(arraysBloc);
        return (
            <View style={styles.container}>
                <CardViewFlatList setOnItemClickPlay={(item, index) => setOnItemClickPlay(item, index)} arraysBloc={arraysBloc} />
                <ScreenHome playing={playing} setPlaying={(d) => setEventClickPlaying(d, arraysBloc)}
                    onClickPlayPause={(d) => onClickPlayPause(d, arraysBloc)} onPressPrev={onPressPrev} onPressNext={onPressNext}
                />
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
    },
};
