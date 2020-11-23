import React from 'react';
import {ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {usePlayerContext} from '../context/PlayerContext';
import {SearchStackRouteParamList} from '../navigators/types';
import {humanDuration} from '../lib/dateTimeHelpers';

import styled from 'styled-components/native';
import {theme} from '../constants/theme';

import HtmlReader from '../components/HtmlReader';

type NavigationParams = RouteProp<SearchStackRouteParamList, 'EpisodeDetails'>;

const EpisodeDetailsScreen = () => {
  const playerContext = usePlayerContext();
  const {episode, podcast} = useRoute<NavigationParams>().params;

  return (
    <Container>
      <ScrollView>
        <Padding>
          <Header>
            <ImageContainer>
              <Image source={{uri: episode.image ?? podcast.thumbnail}} />
            </ImageContainer>
            <Title>
              <TitleText>{episode.title}</TitleText>
            </Title>
            <Dummy />
          </Header>
          <PlayBox>
            <PlayButton
              onPress={() => {
                playerContext.play({
                  title: episode.title,
                  artwork: episode.image ?? podcast.thumbnail,
                  id: episode.linkUrl,
                  url: episode.linkUrl,
                  artist: podcast.artist,
                });
              }}>
              <FeatherIcon
                name="play"
                size={30}
                color={theme.color.blueLighter}
              />
            </PlayButton>
            <PlayInfo>
              <PlayText>Play</PlayText>
              <PlayDurationText>
                {humanDuration(episode.duration)}
              </PlayDurationText>
            </PlayInfo>
          </PlayBox>
          <Seperator />
          <EpisodeNotesBox>
            <EpisodeNotesTitle>Episode Notes</EpisodeNotesTitle>
            <HtmlReader html={episode.description} />
          </EpisodeNotesBox>
        </Padding>
      </ScrollView>
    </Container>
  );
};

export default EpisodeDetailsScreen;

const Container = styled.View`
  background: white;
  flex: 1;
`;

const Padding = styled.View`
  padding: 0px ${theme.space.sm}px;
  margin-top: ${theme.space.sm}px;
  margin-bottom: ${theme.space.sm}px;
`;

const Header = styled.View`
  flex-direction: row;
  margin-bottom: ${theme.space.sm}px;
`;

const Dummy = styled.View`
  width: 50px;
`;

const ImageContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
`;

const Image = styled.Image`
  flex: 1;
`;

const Title = styled.View`
  flex: 1;
`;

const TitleText = styled.Text`
  font-size: ${theme.text.size.sm}px;
  font-weight: ${theme.text.weight.bold};
`;

const PlayBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.space.sm}px;
`;

const PlayButton = styled.TouchableOpacity``;

const PlayInfo = styled.View``;

const PlayText = styled.Text`
  font-size: ${theme.text.size.sm}px;
  font-weight: ${theme.text.weight.bold};
`;

const PlayDurationText = styled.Text`
  font-size: ${theme.text.size.xs}px;
  color: ${theme.color.grey};
`;

const Seperator = styled.View`
  background: ${theme.color.greyLightest};
  height: 1px;
  margin-bottom: ${theme.space.sm}px;
`;

const EpisodeNotesBox = styled.View``;

const EpisodeNotesTitle = styled.Text`
  font-size: ${theme.text.size.xl}px;
  font-weight: ${theme.text.weight.bold};
`;

const EpisodeNotesDescription = styled.Text``;
