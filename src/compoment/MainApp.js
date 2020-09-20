/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenHome from './ScreenHome';
export default class MainApp extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.setOnClickDispatchEvent()}>
                    <Text>{this.props.name}</Text>
                </TouchableOpacity>
                <ScreenHome playing={this.props.playing} />
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
    },
};
