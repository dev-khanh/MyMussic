/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Dimensions,
  PanResponder,
  View,
  Animated,
  Text,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { timeFormat, polarToCartesian } from '../utils/';
import { Colors } from '../constants';

const { width } = Dimensions.get('window');
const padding = 20;
const r = (width - padding * 2) / 2;
const cx = r + padding;
const cy = padding;
const height = (width + padding * 2) / 2;
export default function Slider({ positionY, miniPos, durationState, timeMussic, timepercent }) {
  const [moveSlider, setMoveSlider] = useState(false);
  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => {
      // start
      setMoveSlider(true);
    },
    onPanResponderRelease: () => {
      // end
      TrackPlayer.seekTo((durationState / 100) * timeMussic);

      setMoveSlider(false);
    },
  });
  const timePerce = (timepercent * 100) / Math.floor(durationState);
  const { x, y } = polarToCartesian(
    ((timePerce > 100 ? 100 : timePerce) * 180) / 100,
    { cy, cx, r },
  );
  return (
    <Animated.View style={styles.animatedView(positionY, miniPos)}>
      <Text numberOfLines={1} style={moveSlider && styles.animatedText()}>
        {timeFormat(timeMussic)}
      </Text>

      <Text numberOfLines={1} style={styles.duration}>
        {timeFormat(durationState === null ? null : Math.floor(durationState))}
      </Text>

      <View>
        <Svg width={'100%'} height={'100%'}>
          <G {..._panResponder.panHandlers}>
            <Path
              fill="none"
              stroke={Colors.gray}
              strokeWidth={5}
              d={`M${padding} ${cy} A ${r} ${r} 0 0 0 ${r * 2 + padding} ${cy}`}
            />

            <Path
              fill="none"
              strokeWidth={5}
              stroke={Colors.primary}
              d={`M${padding} ${cy} A ${r} ${r} 0 0 0 ${isNaN(x) ? 0 : x} ${isNaN(y) ? 0 : y}`}
            />
            <Circle
              cx="0"
              cy="0"
              r={10}
              x={Math.abs(isNaN(x) ? 0 : x)}
              y={Math.abs(isNaN(y) ? 0 : y)}
              fill={Colors.primary}
            />
          </G>

          <Circle
            r={r - 30}
            fill="none"
            strokeWidth="2"
            cx={r + padding}
            cy={padding}
          />
        </Svg>
      </View>
    </Animated.View>
  );
}

const styles = {
  container: {
    position: 'relative',
    top: 220,
    height,
    zIndex: 3,
  },

  current: {
    top: -10,
    left: 0,
    width: padding * 2 + 20,
    position: 'absolute',
    color: '#ddd',
    textAlign: 'left',
    fontSize: 12,
    paddingLeft: 5,
  },

  duration: {
    top: -10,
    right: 0,
    width: padding * 2 + 20,
    position: 'absolute',
    color: '#ddd',
    textAlign: 'right',
    fontSize: 12,
    paddingRight: 5,
  },
  animatedView: (positionY, miniPos) => ({
    opacity: positionY.interpolate({
      inputRange: [0, miniPos / 2, miniPos],
      outputRange: [1, 0, 0],
    }),
    ...styles.container,
  }),
  animatedText: () => ({
    fontSize: 14,
    color: Colors.primary,
    ...styles.current,
  }),
};
