import React from 'react';

import {useDBContext} from '../context/DBContext';

import styled from 'styled-components/native';
import {theme} from '../constants/theme';

const LibraryScreen = () => {
  const dbContext = useDBContext();

  return (
    <Container>
      {dbContext.podcasts.map((podcast) => (
        <PodcastBox key={podcast.name}>
          <Title>
            <TitleText>{podcast.name}</TitleText>
          </Title>
        </PodcastBox>
      ))}
    </Container>
  );
};

export default LibraryScreen;

const Container = styled.View``;

const PodcastBox = styled.View`
  background-color: white;
  padding: ${theme.space.sm}px;
  margin-bottom: ${theme.space.sm}px;
`;

const Title = styled.View``;

const TitleText = styled.Text``;
