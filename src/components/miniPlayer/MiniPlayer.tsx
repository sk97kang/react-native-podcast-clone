import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';
import {theme} from '../../constants/theme';
import {usePlayerContext} from '../../context/PlayerContext';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Player')}>
      <Container>
        <Player>
          <ImageContainer>
            <Image
              source={{uri: playerContext.currentTrack.artwork as string}}
            />
          </ImageContainer>
          <Title>
            <TitleText numberOfLines={1}>
              {playerContext.currentTrack.title}
            </TitleText>
          </Title>
          <BackwardButtonBox>
            <PlayButton onPress={() => playerContext.seekTo(-30)}>
              <Icon name="rotate-ccw" size={30} />
            </PlayButton>
          </BackwardButtonBox>
          <PlayButtonBox>
            {playerContext.isPaused && (
              <PlayButton onPress={() => playerContext.play()}>
                <Icon name="play" size={30} />
              </PlayButton>
            )}
            {playerContext.isPlaying && (
              <PlayButton onPress={() => playerContext.pause()}>
                <Icon name="pause" size={30} />
              </PlayButton>
            )}
            {!playerContext.isPaused && !playerContext.isPlaying && (
              <PlayButton activeOpacity={1}>
                <ActivityIndicator size="small" color={theme.color.blueLight} />
              </PlayButton>
            )}
          </PlayButtonBox>
          <ForwardButtonBox>
            <PlayButton onPress={() => playerContext.seekTo()}>
              <Icon name="rotate-cw" size={30} />
            </PlayButton>
          </ForwardButtonBox>
        </Player>
      </Container>
    </TouchableOpacity>
  );
};

export default MiniPlayer;

const Container = styled.View`
  height: 75px;
  background: white;
  padding: 0px ${theme.space.sm}px;
  border-top-width: 1px;
  border-top-color: ${theme.color.greyLightest};
`;

const Player = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.View`
  width: 50px;
  height: 50px;
  background: ${theme.color.blueLight};
  border-radius: 10px;
  margin-right: 10px;
`;

const Image = styled.Image`
  flex: 1;
  overflow: hidden;
`;

const Title = styled.View`
  flex: 1;
  margin-right: 20px;
`;

const TitleText = styled.Text``;

const PlayButton = styled.TouchableOpacity``;

const PlayButtonBox = styled.View`
  margin-right: 10px;
`;

const BackwardButtonBox = styled.View`
  margin-right: 10px;
`;

const ForwardButtonBox = styled.View``;
