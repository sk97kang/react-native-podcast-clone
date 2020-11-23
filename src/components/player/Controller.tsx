import React from 'react';
import {ActivityIndicator} from 'react-native';

import {usePlayerContext} from '../../context/PlayerContext';

import styled from 'styled-components/native';
import {theme} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Feather';

const Controller = () => {
  const playerContext = usePlayerContext();

  return (
    <Container>
      <BackwardButtonBox>
        <PlayButton onPress={() => playerContext.seekTo(-30)}>
          <Icon name="rotate-ccw" size={40} />
        </PlayButton>
      </BackwardButtonBox>
      <PlayButtonBox>
        {playerContext.isPaused && (
          <PlayButton onPress={() => playerContext.play()}>
            <Icon name="play" size={60} />
          </PlayButton>
        )}
        {playerContext.isPlaying && (
          <PlayButton onPress={() => playerContext.pause()}>
            <Icon name="pause" size={60} />
          </PlayButton>
        )}
        {!playerContext.isPaused && !playerContext.isPlaying && (
          <PlayButton activeOpacity={1}>
            <ActivityIndicator size="large" color={theme.color.blueLight} />
          </PlayButton>
        )}
      </PlayButtonBox>
      <ForwardButtonBox>
        <PlayButton onPress={() => playerContext.seekTo()}>
          <Icon name="rotate-cw" size={40} />
        </PlayButton>
      </ForwardButtonBox>
    </Container>
  );
};

export default Controller;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.TouchableOpacity``;

const PlayButtonBox = styled.View`
  margin: 0px 20px;
`;

const BackwardButtonBox = styled.View``;

const ForwardButtonBox = styled.View``;
