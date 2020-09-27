/* eslint-disable prettier/prettier */
import React from 'react';
import { Animated, Text, Dimensions } from 'react-native';
const { width: windowWidth } = Dimensions.get('window');
export default function Title({ positionY, miniPos, playingTitle, arraysBloc }) {
	const top = positionY.interpolate({
		inputRange: [-40, miniPos],
		// outputRange: [miniPos / 2 + 160 - (isiPhoneX ? 70 : 0), 30],
		outputRange: [miniPos / 2 + 160 - 0, 30],
	});

	const right = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [0, 120],
	});

	const width = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [windowWidth, windowWidth - 180],
	});

	const paddingHorizontal = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [50, 0],
	});
	return (
		<Animated.View style={styles.animation_view(top, right, width, paddingHorizontal)}>
			<Text numberOfLines={1} style={styles.title}>
				{playingTitle === '' ? arraysBloc.length + ' Bài Nhạc Trẻ Hay Nhất' : playingTitle}
			</Text>
		</Animated.View>
	);
}
const styles = {
	container: {
		flex: 1,
		alignSelf: 'flex-end',
		minWidth: 'auto',
		alignItems: 'center',
		position: 'absolute',
	},
	title: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},

	singer: {
		color: '#fff',
		fontSize: 12,
	},
	animation_view: (top, right, width, paddingHorizontal) => ({
		top,
		right,
		width,
		paddingHorizontal,
		...styles.container,
	}),
};
