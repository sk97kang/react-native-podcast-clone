import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';
import {theme} from '../constants/theme';
import Icon from 'react-native-vector-icons/Feather';

import {usePlayerContext} from '../context/PlayerContext';
import {useNavigation} from '@react-navigation/native';
import ProgressSlider from '../components/player/ProgressSlider';
import {makeHitSlop} from '../constants/metrics';
import Controller from '../components/player/Controller';

const {width} = Dimensions.get('window');

const PlayerScreen = () => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation();

  const track = playerContext.currentTrack;

  if (!track) {
    return null;
  }

  return (
    <SafeArea>
      <Container>
        <ActionButton>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={makeHitSlop(20)}>
            <Icon name="chevron-down" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Queue')}
            hitSlop={makeHitSlop(20)}>
            <Icon name="list" size={30} />
          </TouchableOpacity>
        </ActionButton>

        <ThumbnailContainer>
          <Thumbnail source={{uri: track.artwork as string}} />
        </ThumbnailContainer>
        <Info>
          <Title>{track.title}</Title>
          <Artist>{track.artist}</Artist>
        </Info>
        <SliderBox>
          <ProgressSlider />
        </SliderBox>
        <Controller />
      </Container>
    </SafeArea>
  );
};

export default PlayerScreen;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background: white;
`;

const Container = styled.View`
  flex: 1;
  background: white;
  padding-top: ${theme.space.md}px;
`;

const ThumbnailContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.space.sm}px;
`;

const Thumbnail = styled.Image`
  width: ${width - theme.space.md * 2}px;
  height: ${width - theme.space.md * 2}px;
  border-radius: 10px;
`;

const Info = styled.View`
  align-items: center;
  padding: 0px ${theme.space.md}px;
`;

const Title = styled.Text`
  text-align: center;
  font-weight: ${theme.text.weight.bold};
  margin-bottom: ${theme.space.sm}px;
`;

const Artist = styled.Text`
  color: ${theme.color.grey};
  font-size: ${theme.text.size.sm}px;
  margin-bottom: ${theme.space.sm}px;
`;

const ActionButton = styled.View`
  padding: 0px ${theme.space.md}px;
  margin-bottom: ${theme.space.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SliderBox = styled.View`
  padding: 0px ${theme.space.md}px;
  margin-bottom: ${theme.space.sm}px;
`;
