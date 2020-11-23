import Slider from '@react-native-community/slider';
import React from 'react';
import {useProgress} from 'react-native-track-player';

import styled from 'styled-components/native';
import {theme} from '../../constants/theme';
import {usePlayerContext} from '../../context/PlayerContext';

const buildTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minutesStr}:${secondsStr}`;
  }
  return `${minutesStr}:${secondsStr}`;
};

const ProgressSlider = () => {
  const playerContext = usePlayerContext();

  const {position, duration} = useProgress();

  return (
    <>
      <Container
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(value) => playerContext.goTo(value)}
        minimumTrackTintColor={theme.color.blueLight}
        maximumTrackTintColor={`${theme.color.blueLight}30`}
      />
      <Time>
        <TimeText>{buildTime(position)}</TimeText>
        <TimeText>-{buildTime(duration - position)}</TimeText>
      </Time>
    </>
  );
};

export default ProgressSlider;

const Container = styled(Slider)`
  width: 100%;
  height: 40px;
`;

const Time = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimeText = styled.Text``;
