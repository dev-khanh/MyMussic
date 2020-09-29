/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import { Dimensions, Animated, Platform } from 'react-native';
import Title from './Title';
import Header from './Header';
import Handle from './Handle';
import Record from './Record';
import Controllers from './Controllers';
import Slider from './Slider';
import { connect } from 'react-redux';

import AndroidStatusBar from './AndroidStatusBar';

import { _panResponder, positionY, miniPos } from './Animation';

const { width, height } = Dimensions.get('window');

class ScreenHome extends PureComponent {
    render() {
        const playing = this.props.playing;
        const durationState = this.props.currentDuration;
        const timeMussic = this.props.timeMussic;
        const timepercent = this.props.timepercent;
        const playingTitle = this.props.playingTitle;
        const arraysBloc = this.props.arraysBloc;
        const animation = {
            miniPos,
            positionY,
            playing,
            durationState,
            timeMussic,
            timepercent,
            playingTitle,
            arraysBloc,
        };
        return (
            <Animated.View style={styles.container}>
                <Header {...animation} />
                <Slider {...animation} />
                <Record {...animation} setPlaying={(d) => this.props.setPlaying(d)} />
                <Title {...animation} />
                <Controllers onClickPlayPause={(d) => this.props.onClickPlayPause(d)} playing={playing} onPressPrev={this.props.onPressPrev} onPressNext={this.props.onPressNext} />
                <Handle {...animation} {..._panResponder.panHandlers} />
                {Platform.OS === 'android' && <AndroidStatusBar {...animation} />}
            </Animated.View>
        );
    }
}

const styles = {
    container: {
        width,
        height,
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 9998,
        backgroundColor: 'rgb(35, 40, 44)',
        transform: [{ translateY: positionY }],
    },
};
const connectState = (state) => {
    return {
        name: state.reducerState.name,
        currentDuration: state.reducerState.currentDuration,
        timeMussic: state.reducerState.timeMussic,
        timepercent: state.reducerState.timepercent,
        playingTitle: state.reducerState.playingTitle,
        arraysBloc: state.reducerDatabase.arraysBloc,
    };
};
export default connect(connectState)(ScreenHome);
