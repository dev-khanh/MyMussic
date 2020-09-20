/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import {
	View,
	Animated,
	Dimensions,
	Easing,
	TouchableWithoutFeedback,
	Platform,
	Image,
} from 'react-native';
// import {setUserPlaying} from 'reducers/Player/actions';
// import TrackPlayer from 'react-native-track-player';

import { Colors } from 'constants';
import { Play, Pause } from '../Icons';

// const STATE_READY = Platform.OS === 'ios' ? 'ready' : 6;

const { width } = Dimensions.get('window');
const spinValue = new Animated.Value(0);

const rotate = spinValue.interpolate({
	inputRange: [0, 1],
	outputRange: ['1deg', '360deg'],
});

const sizes = {
	default: width - 100,
	mini: 90,
};

function Record({ positionY, miniPos, playing }) {
	console.log(playing);
	// const [playing, setPlaying] = useState(false);

	//   const dispatch = useDispatch();
	//   const {state, track, playing} = useSelector((state) => state.Player);

	//   const artwork = useMemo(() => (track ? track.artwork : ''), [track]);

	//   useEffect(() => {
	//     switch (state) {
	//       case TrackPlayer.STATE_PLAYING:
	//         Animated.loop(
	//           Animated.sequence([
	//             Animated.timing(spinValue, {
	//               toValue: 1,
	//               duration: 10000,
	//               easing: Easing.linear,
	//             }),
	//           ]),
	//         ).start();
	//         break;

	//       case TrackPlayer.STATE_PAUSED:
	//         spinValue.stopAnimation();
	//         spinValue.extractOffset();
	//         break;

	//       case STATE_READY:
	//         spinValue.flattenOffset();
	//         break;
	//     }
	//   }, [state]);
	//   console.log(state, '   -   ', track, '    -    ', playing);
	const ranges = {
		layout: [sizes.default, sizes.mini],
		tLayout: [width - 140, 70],
		translateY: [Platform.OS === 'ios' ? 100 : 80, 5],
		translateX: [-20, -5],
		miniLayout: [50, 20],
		right: [(width - (width - 60)) / 2, 0],
		radius: [sizes.default / 2, sizes.mini / 2],
	};

	for (const key in ranges) {
		ranges[key] = positionY.interpolate({
			inputRange: [0, miniPos],
			outputRange: ranges[key],
		});
	}

	const borderWidth = positionY.interpolate({
		inputRange: [0, 100, miniPos],
		outputRange: [10, 0, 0],
	});

	const miniControllerOpacity = positionY.interpolate({
		inputRange: [0, miniPos - 100, miniPos],
		outputRange: [0, 0, 1],
	});

	const innerCircle = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [1, 0],
	});
	if (playing) {
		Animated.loop(
			Animated.sequence([
				Animated.timing(spinValue, {
					toValue: 1,
					duration: 10000,
					useNativeDriver: false,
					easing: Easing.linear,
				}),
			]),
		).start();
	} else {
		spinValue.stopAnimation();
		spinValue.extractOffset();
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (positionY._value === miniPos) {
					//   dispatch(setUserPlaying(!playing));
					// setPlaying(!playing);

				}
			}}>
			<Animated.View style={styles.animatedViews(ranges)}>
				<Animated.View style={styles.AnimationView(ranges)}>
					<View>
						<Image
							style={styles.AnimationImages}
							source={require('../images/xxxxxxxxx.jpg')}
						/>
						<Animated.View
							style={styles.AnimationViewChild(innerCircle)}>
							<View
								style={styles.ViewChildAnimaytion}
							/>
						</Animated.View>
					</View>
				</Animated.View>
				<Animated.View style={styles.animatedViewStyles(ranges, borderWidth)} />
				<Animated.View
					style={[styles.miniControl, { opacity: miniControllerOpacity }]}>
					{playing ? <Pause /> : <Play />}
				</Animated.View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

const styles = {
	container: {
		top: 0,
		position: 'absolute',
		borderRadius: sizes.default / 2,
		backgroundColor: 'rgb(26, 30, 34)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
	},

	miniCircle: {
		borderColor: 'rgb(225, 48, 129)',
		backgroundColor: 'rgb(49, 56, 62)',
		position: 'absolute',
		borderRadius: 50,
	},
	miniControl: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		padding: 35,
	},
	//Animation
	AnimationView: (ranges) => ({
		width: ranges.tLayout,
		height: ranges.tLayout,
		transform: [{ rotate }],
		borderRadius: ranges.radius,
		overflow: 'hidden',
		position: 'relative',
	}),
	AnimationImages: {
		width: '100%',
		height: '100%',
	},
	AnimationViewChild: (innerCircle) => ({
		top: 0,
		left: 0,
		padding: 7,
		width: '100%',
		height: '100%',
		opacity: innerCircle,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	ViewChildAnimaytion: {
		opacity: 0.7,
		width: '100%',
		height: '100%',
		borderWidth: 2,
		borderRadius: width,
		borderColor: Colors.primary,
	},
	animatedViews: (ranges) => ({
		...styles.container,
		width: ranges.layout,
		height: ranges.layout,
		right: ranges.right,
		transform: [
			{
				translateY: ranges.translateY,
			},
			{
				translateX: ranges.translateX,
			},
		],
	}),
	animatedViewStyles: (ranges, borderWidth) => ({
		...styles.miniCircle,
		width: ranges.miniLayout,
		height: ranges.miniLayout,
		borderWidth: borderWidth,
	}),
};

export default Record;
