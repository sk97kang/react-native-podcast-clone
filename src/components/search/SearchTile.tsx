import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {SearchQuery_search} from '../../types/graphql';

import styled from 'styled-components/native';
import {theme} from '../../constants/theme';

interface SearchTile {
  item: SearchQuery_search;
}

const SearchTile = ({item}: SearchTile) => {
  const navigation = useNavigation();

  return (
    <Container>
      <ImageContainer>
        {item.thumbnail && <Image source={{uri: item.thumbnail}} />}
      </ImageContainer>
      <Info>
        <Title numberOfLines={1}>{item.podcastName}</Title>
        <Subtitle>{item.artist}</Subtitle>
        <Episodes
          onPress={() => navigation.navigate('PodcastDetails', {data: item})}>
          <EpisodesText>{item.episodesCount} episodes</EpisodesText>
        </Episodes>
      </Info>
    </Container>
  );
};

export default SearchTile;

const Container = styled.View`
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
