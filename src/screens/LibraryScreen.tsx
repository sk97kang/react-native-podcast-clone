import React from 'react';

import {useDBContext} from '../context/DBContext';

import styled from 'styled-components/native';
import {theme} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const dbContext = useDBContext();

  return (
    <Container>
      {dbContext.podcasts.map((podcast) => (
        <Card key={podcast.name}>
          <ImageContainer>
            {podcast.thumbnail && <Image source={{uri: podcast.thumbnail}} />}
          </ImageContainer>
          <Info>
            <Title numberOfLines={1}>{podcast.name}</Title>
            <Subtitle>{podcast.artist}</Subtitle>
            <Episodes
              onPress={() =>
                navigation.navigate('PodcastDetails', {
                  data: {...podcast, podcastName: podcast.name},
                })
              }>
              <EpisodesText>{podcast.episodesCount} episodes</EpisodesText>
            </Episodes>
          </Info>
        </Card>
      ))}
    </Container>
  );
};

export default LibraryScreen;

const Container = styled.ScrollView`
  background: white;
`;

const Card = styled.View`
  height: 90px;
  flex-direction: row;
  align-items: center;
  padding: ${theme.space.sm}px;
`;

const Image = styled.Image`
  flex: 1;
  border-radius: 10px;
`;

const ImageContainer = styled.View`
  height: 70px;
  width: 70px;
  background: ${theme.color.blueLightest};
  border-radius: 10px;
  margin-right: 10px;
`;

const Info = styled.View`
  flex: 1;
  height: 100%;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-weight: ${theme.text.weight.bold};
`;

const Subtitle = styled.Text`
  font-size: ${theme.text.size.xs}px;
  color: ${theme.color.grey};
`;

const Episodes = styled.TouchableOpacity``;

const EpisodesText = styled.Text`
  font-size: ${theme.text.size.xs}px;
  color: ${theme.color.blueLight};
`;
