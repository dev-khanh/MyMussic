/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import { Animated, Easing, View, Text, TouchableOpacity } from 'react-native';
export default class DemoImages extends PureComponent {
    spinValue = new Animated.Value(0);
    state = {
        checkAnimation: false,
    }
    componentDidMount() {
        this.StartImageRotateFunction();
    }
    StartImageRotateFunction() {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start((d) => {
            console.log("start: ", this.state.checkAnimation);
            if (this.state.checkAnimation) {
                d.finished = false;
            } else {
                this.StartImageRotateFunction();
            }
        });
    }
    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        return (
            <View>
                <Animated.Image style={styles.animationImages(spin)} source={require('../images/xxxxxxxxx.jpg')} />
                <TouchableOpacity onPress={() => this.setOnClickStop()}>
                    <Text>sssssssssssssss</Text>
                </TouchableOpacity>
            </View>
        );
    }
    setOnClickStop() {
        this.setState({
            checkAnimation: !this.state.checkAnimation,
        });
        console.log('setOnClickStop: ', this.state.checkAnimation);

        if (!this.state.checkAnimation) {
            this.spinValue.stopAnimation();
            this.spinValue.extractOffset();
        } else {
            this.StartImageRotateFunction();
        }
    }
}
const styles = {
    animationImages: (spin) => ({
        transform: [{ rotate: spin }], borderRadius: 360,
    }),
};
