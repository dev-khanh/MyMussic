/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import MainApp from '../compoment/MainApp';
import { PLAYING, UPLOAD_DURATION, TIME_MUSSIC, PLAYING_TITLE } from '../action/ActionType';
import TrackPlayer from 'react-native-track-player';
import playlistData from '../compoment/Demo/playlist.json';
import { CallEventData } from '../action';

var interval;
const connectState = (state) => {
  return {
    arraysBloc: state.reducerDatabase.arraysBloc,
    playing: state.reducerState.playing,
  };
};
const handlePlayPausessss = async (arraysBloc, dispatch) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    await TrackPlayer.add(arraysBloc);
  }
  const currentDuration = await TrackPlayer.getDuration();
  // console.log(currentDuration);
  dispatch({ type: UPLOAD_DURATION, currentDuration });
  clearInterval(interval);
  interval = setInterval(async () => {
    const current = Math.floor(await TrackPlayer.getPosition());
    // console.log(timeFormat((current * 100) / Math.floor(currentDuration)));
    dispatch({ type: TIME_MUSSIC, timeMussic: (current * 100) / Math.floor(currentDuration), timepercent: current });
    // if (duration && current) {
    //   setTime(current);
    //   setPercent((current * 100) / Math.floor(duration));
    // }
  }, 100);
};
const handlePlayPause = async (arraysBloc) => {
  // console.log(arraysBloc.length);
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    await TrackPlayer.reset();
    await TrackPlayer.add(arraysBloc);
    await TrackPlayer.play();
  } else {
    const playbackState = await TrackPlayer.getState();
    // console.log(playbackState);
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const handleSplice = (item, index) => {
  playlistData.splice(0, 0, item);
  playlistData.splice(index + 1, 1);
  console.log(playlistData);
  return playlistData;
};
const conectStateDispatch = (dispatch) => {
  return {
    setOnClickDispatchEvent: () => {
      dispatch({ type: 'SET_ON_CLICK' });
    },
    setup: async () => {
      dispatch(CallEventData());
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
      // await TrackPlayer.reset();
      // await TrackPlayer.add(arraysBloc);
      // await TrackPlayer.play();
    },
    ListenRender: async (arraysBloc) => {
      handlePlayPausessss(arraysBloc, dispatch);
    },
    setEventClickPlaying: async (setPlaying, arraysBloc) => {
      // console.log(setPlaying);
      // console.log(arraysBloc);
      handlePlayPause(arraysBloc);
      dispatch({ type: PLAYING, playing: setPlaying });
    },
    onClickPlayPause: async (setPlaying, arraysBloc) => {
      handlePlayPause(arraysBloc);
      dispatch({ type: PLAYING, playing: setPlaying });
    },
    onPressPrev: async () => {
      try {
        await TrackPlayer.skipToPrevious();
      } catch (_) { }
    },
    onPressNext: async () => {
      try {
        await TrackPlayer.skipToNext();
      } catch (_) { }
    },
    setOnItemClickPlay: async (item, index) => {
      await TrackPlayer.reset();
      await TrackPlayer.add(item);
      await TrackPlayer.play();
      dispatch({ type: PLAYING, playing: true });
      // console.log(item.title);
      dispatch({ type: PLAYING_TITLE, playingTitle: item.title });
    },
  };
};
const MainAppContainer = connect(connectState, conectStateDispatch)(MainApp);
export default MainAppContainer;
