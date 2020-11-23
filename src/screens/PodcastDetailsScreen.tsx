import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useQuery} from '@apollo/client';
import feedQuery from '../graphql/query/feedQuery';
import {FeedQuery, FeedQueryVariables} from '../types/graphql';

import {SearchStackRouteParamList} from '../navigators/types';

import {usePlayerContext} from '../context/PlayerContext';
import {useDBContext} from '../context/DBContext';

import styled from 'styled-components/native';
import {theme} from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {getWeekDay, humanDuration} from '../lib/dateTimeHelpers';
import {PodcastModel} from '../models/PodcastModel';

type NavigationParams = RouteProp<SearchStackRouteParamList, 'PodcastDetails'>;
type NavigationProp = StackNavigationProp<
  SearchStackRouteParamList,
  'PodcastDetails'
>;

const PodcastDetailsScreen = () => {
  const playerContext = usePlayerContext();
  const dbContext = useDBContext();
  const navigation = useNavigation<NavigationProp>();

  const {data: podcastData} = useRoute<NavigationParams>().params ?? {};

  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  });

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <>
            <Header>
              <ThumbnailContainer>
                {podcastData.thumbnail && (
                  <Thumbnail source={{uri: podcastData.thumbnail}} />
                )}
              </ThumbnailContainer>
              <Info>
                <Name>{podcastData.podcastName}</Name>
                <Artist>{podcastData.artist}</Artist>
                <TouchableOpacity
                  onPress={() =>
                    dbContext.subToPodcast(
                      new PodcastModel({
                        episodesCount: podcastData.episodesCount,
                        thumbnail: podcastData.thumbnail,
                        name: podcastData.podcastName,
                        artist: podcastData.artist,
                        feedUrl: podcastData.feedUrl,
                      }),
                    )
                  }>
                  <Subscribed>Subscribed</Subscribed>
                </TouchableOpacity>
              </Info>
            </Header>
            <LastEpisod>
              <PlayButton
                onPress={() => {
                  const el = data?.feed[0];
                  if (!el) {
                    return;
                  }

                  playerContext.play({
                    title: el.title,
                    artwork: el.image ?? podcastData.thumbnail,
                    id: el.linkUrl,
                    url: el.linkUrl,
                    artist: podcastData.artist,
                  });
                }}>
                <FeatherIcon
                  name="play"
                  size={30}
                  color={theme.color.blueLighter}
                />
              </PlayButton>
              <PlayTextBox>
                <PlayFatText>Play</PlayFatText>
                <PlayNormarText>{data?.feed[0].title}</PlayNormarText>
              </PlayTextBox>
            </LastEpisod>
            <Episodes>
              <EpisodesText>Episodes</EpisodesText>
            </Episodes>
            {loading && (
              <Loading>
                <ActivityIndicator size="large" color={theme.color.blueLight} />
              </Loading>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <SeparatorContainer>
            <Separator />
          </SeparatorContainer>
        )}
        keyExtractor={(item) => String(item.linkUrl)}
        renderItem={({item}) => (
          <EpisodesContainer>
            <EpisodeDate>
              {getWeekDay(new Date(item.pubDate)).toUpperCase()}
            </EpisodeDate>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EpisodeDetails', {
                  episode: item,
                  podcast: podcastData,
                })
              }>
              <EpisodeTitle>{item.title}</EpisodeTitle>
            </TouchableOpacity>
            <EpisodeSummary numberOfLines={2}>{item.summary}</EpisodeSummary>
            <EpisodeTime>{humanDuration(item.duration)}</EpisodeTime>
          </EpisodesContainer>
        )}
      />
    </Container>
  );
};

export default PodcastDetailsScreen;

const Container = styled.View`
  flex: 1;
  background: white;
`;

const Header = styled.View`
  flex-direction: row;
  padding: 0px ${theme.space.sm}px;
  margin-top: ${theme.space.sm}px;
  margin-bottom: ${theme.space.md}px;
`;

const ThumbnailContainer = styled.View`
  margin-right: 10px;
`;

const Thumbnail = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 10px;
`;

const Info = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-size: ${theme.text.size.lg}px;
  font-weight: ${theme.text.weight.bold};
  margin-bottom: ${theme.space.xs}px;
`;

const Artist = styled.Text`
  font-size: ${theme.text.size.xs}px;
  color: ${theme.color.grey};
  margin-bottom: ${theme.space.xs}px;
`;

const Subscribed = styled.Text`
  font-size: ${theme.text.size.xs}px;
  color: ${theme.color.blueLight};
`;

const LastEpisod = styled.View`
  padding: 0px ${theme.space.sm}px;
  margin-bottom: ${theme.space.md}px;
  flex-direction: row;
  align-items: center;
`;

const PlayButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const PlayTextBox = styled.View`
  flex: 1;
`;

const PlayFatText = styled.Text`
  font-weight: ${theme.text.weight.bold};
`;

const PlayNormarText = styled.Text`
  font-size: ${theme.text.size.sm}px;
`;

const Episodes = styled.View`
  padding: 0px ${theme.space.sm}px;
  margin-bottom: ${theme.space.md}px;
`;

const EpisodesText = styled.Text`
  font-size: ${theme.text.size.lg}px;
  font-weight: ${theme.text.weight.bold};
`;

const EpisodesContainer = styled.View`
  padding: 0px ${theme.space.sm}px;
`;

const EpisodeDate = styled.Text`
  font-size: ${theme.text.size.xs}px;
  color: ${theme.color.grey};
`;

const EpisodeTitle = styled.Text``;

const EpisodeSummary = styled.Text`
  font-size: ${theme.text.size.sm}px;
  color: ${theme.color.grey};
`;

const EpisodeTime = styled.Text`
  font-size: ${theme.text.size.sm}px;
  color: ${theme.color.grey};
`;

const SeparatorContainer = styled.View`
  width: 100%;
  padding: 0px ${theme.space.sm}px;
  margin: ${theme.space.sm}px 0px;
`;

const Separator = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${theme.color.greyLighter};
`;

const Loading = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;
