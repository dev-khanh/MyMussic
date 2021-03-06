/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import { Play, Pause, Skip, Replay, Shuffle } from '../Icons';
class Controller extends PureComponent {
	render() {
		const selectFill = (bool) => {
			return bool ? 'rgb(225, 47, 129)' : 'rgb(255, 255, 255)';
		};

		const onPressShuffle = () => {
			// dispatch(setShuffle(!shuffle));
		};

		const onPressReplay = () => {
			// dispatch(setReplay(!replay));
		};
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={onPressShuffle}>
					<View style={styles.shuffle}>
						{/* <Shuffle fill={selectFill(shuffle)} /> */}
						<Shuffle />
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback onPress={onPressReplay}>
					<View style={styles.replay}>
						{/* <Replay fill={selectFill(replay)} /> */}
						<Replay />
					</View>
				</TouchableWithoutFeedback>

				<TouchableOpacity onPress={this.props.onPressPrev}>
					<View style={styles.prev}>
						<Skip />
					</View>
				</TouchableOpacity>

				<TouchableWithoutFeedback onPress={() => this.props.onClickPlayPause(!this.props.playing)}>
					<View style={styles.playPause}>{this.props.playing ? <Pause /> : <Play />}</View>
				</TouchableWithoutFeedback>

				<TouchableOpacity onPress={this.props.onPressNext}>
					<View style={styles.next}>
						<Skip />
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Controller;

const styles = {
	container: {
		position: 'relative',
		top: 200,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 200,
		zIndex: 4,
		flexDirection: 'row',
	},

	playPause: {
		width: 30,
		marginHorizontal: 40,
	},

	prev: {
		width: 20,
		transform: [{ rotate: '-180deg' }],
	},

	next: {
		width: 20,
	},

	shuffle: {
		position: 'absolute',
		top: 0,
		left: 30,
		width: 25,
		height: 25,
	},

	replay: {
		position: 'absolute',
		top: 0,
		right: 30,
		width: 25,
		height: 25,
	},
};
