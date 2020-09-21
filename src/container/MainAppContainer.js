/* eslint-disable prettier/prettier */
import {connect} from 'react-redux';
import MainApp from '../compoment/MainApp';
import {PLAYING} from '../action/ActionType';
import TrackPlayer from 'react-native-track-player';
import playlistData from '../compoment/Demo/playlist.json';

const connectState = (state) => {
  return {
    name: state.reducerState.name,
    playing: state.reducerState.playing,
  };
};
const handlePlayPause = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    await TrackPlayer.reset();
    await TrackPlayer.add(playlistData);
    await TrackPlayer.play();
  } else {
    const playbackState = await TrackPlayer.getState();
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const conectStateDispatch = (dispatch) => {
  return {
    setOnClickDispatchEvent: () => {
      dispatch({type: 'SET_ON_CLICK'});
    },
    setup: async () => {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
      });
    },
    setEventClickPlaying: async (setPlaying) => {
      handlePlayPause();
      dispatch({type: PLAYING, playing: setPlaying});
    },
    onClickPlayPause: async (setPlaying) => {
      handlePlayPause();
      dispatch({type: PLAYING, playing: setPlaying});
    },
    onPressPrev: async () => {
      try {
        await TrackPlayer.skipToPrevious();
      } catch (_) {}
    },
    onPressNext: async () => {
      try {
        await TrackPlayer.skipToNext();
      } catch (_) {}
    },
    setOnItemClickPlay: async (item) => {
      console.log(item);
      await TrackPlayer.reset();
      await TrackPlayer.add(item);
      await TrackPlayer.play();
      dispatch({type: PLAYING, playing: true});
    },
  };
};
const MainAppContainer = connect(connectState, conectStateDispatch)(MainApp);
export default MainAppContainer;
