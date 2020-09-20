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
        const animation = {
            miniPos,
            positionY,
            playing,
        };
        return (
            <Animated.View style={styles.container}>
                <Header {...animation} />
                <Slider {...animation} />
                <Record {...animation} />
                <Title {...animation} />
                <Controllers />
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
    };
};
export default connect(connectState)(ScreenHome);
