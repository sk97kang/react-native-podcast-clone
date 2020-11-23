import React, {useEffect, useState} from 'react';
import RNTrackPlayer, {
  Event,
  State as TrackPlayerState,
  Track,
  usePlaybackState,
} from 'react-native-track-player';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (track?: Track) => void;
  pause: () => void;
  seekTo: (amount?: number) => void;
  goTo: (amount: number) => void;
}

export const PlayerContext = React.createContext<PlayerContextType>({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  seekTo: () => null,
  goTo: () => null,
});

export const PlayerContextProvider: React.FC = (props) => {
  const playerState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

  useEffect(() => {
    const listener = RNTrackPlayer.addEventListener(Event.RemoteStop, () => {
      setCurrentTrack(null);
    });

    return () => {
      listener.remove();
    };
  }, []);

  const play = async (track?: Track) => {
    // we want to make sure we stop the current one to play the next one
    await pause();
    if (!track) {
      if (currentTrack) {
        await RNTrackPlayer.play();
      }
      return;
    }

    if (currentTrack && track.id === currentTrack.id) {
      return await RNTrackPlayer.play();
    }

    try {
      const trc = await RNTrackPlayer.getTrack(track.id);
      if (!trc) {
        await RNTrackPlayer.add([track]);
      }
    } catch {
      await RNTrackPlayer.add([track]);
    } finally {
      setCurrentTrack(track);
      await RNTrackPlayer.skip(track.id);
      await RNTrackPlayer.play();
    }
  };

  const pause = async () => {
    await RNTrackPlayer.pause();
  };

  const seekTo = async (amount: number = 30) => {
    const position = await RNTrackPlayer.getPosition();
    await RNTrackPlayer.seekTo(position + amount);
  };

  const goTo = async (amount: number) => {
    await RNTrackPlayer.seekTo(amount);
  };

  const value: PlayerContextType = {
    isPlaying: playerState === TrackPlayerState.Playing,
    isPaused: playerState === TrackPlayerState.Paused,
    isStopped: playerState === TrackPlayerState.Stopped,
    isEmpty: playerState === TrackPlayerState.None,
    currentTrack,
    play,
    pause,
    seekTo,
    goTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => React.useContext(PlayerContext);
