import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());

  TrackPlayer.addEventListener(
    Event.RemoteJumpForward,
    async ({interval}: {interval: number}) => {
      const position = await TrackPlayer.getPosition();
      await TrackPlayer.seekTo(position + interval);
    },
  );

  TrackPlayer.addEventListener(
    Event.RemoteJumpBackward,
    async ({interval}: {interval: number}) => {
      console.log('hi');
      const position = await TrackPlayer.getPosition();
      await TrackPlayer.seekTo(position - interval);
    },
  );
};
