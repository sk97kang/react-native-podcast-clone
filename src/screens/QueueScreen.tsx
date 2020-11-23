import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {makeHitSlop} from '../constants/metrics';
import RNTrackPlayer, {Track} from 'react-native-track-player';

import styled from 'styled-components/native';
import {theme} from '../constants/theme';
import {usePlayerContext} from '../context/PlayerContext';

const QueueScreen = () => {
  const navigation = useNavigation();
  const playerContext = usePlayerContext();

  const [queue, setQueue] = useState<Track[]>([]);

  const getQeueu = async () => {
    const tracks = await RNTrackPlayer.getQueue();
    setQueue(tracks);
  };

  useFocusEffect(
    useCallback(() => {
      getQeueu();
    }, []),
  );

  return (
    <SafeArea>
      <Header>
        <ActionButton>
          <TouchableOpacity
            onPress={navigation.goBack}
            hitSlop={makeHitSlop(20)}>
            <ActionText>Done</ActionText>
          </TouchableOpacity>
        </ActionButton>
        <ActionButton>
          <CenterText>Up Next</CenterText>
        </ActionButton>
        <ActionButton></ActionButton>
      </Header>
      <ScrollView>
        {queue.map((track) => (
          <TouchableOpacity
            key={track.id}
            onPress={async () => {
              await playerContext.play(track);
              navigation.goBack();
            }}>
            <ItemBox>
              <ThumbnailBox>
                {track.artwork && (
                  <Thumbnail source={{uri: track.artwork as string}} />
                )}
              </ThumbnailBox>
              <Info>
                <Title numberOfLines={1}>{track.title}</Title>
                <Artist numberOfLines={2}>{track.artist}</Artist>
              </Info>
            </ItemBox>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeArea>
  );
};

export default QueueScreen;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background: ${theme.color.white};
`;

const Header = styled.View`
  padding: 0px ${theme.space.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.space.lg}px;
`;

const ActionButton = styled.View`
  flex: 1;
`;

const CenterText = styled.Text`
  text-align: center;
  font-weight: ${theme.text.weight.bold};
`;

const ActionText = styled.Text``;

const ItemBox = styled.View`
  height: 90px;
  padding: 0 ${theme.space.md}px;
  flex-direction: row;
`;

const ThumbnailBox = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background: ${theme.color.blue};
  margin-right: 10px;
  overflow: hidden;
`;

const Thumbnail = styled.Image`
  flex: 1;
`;

const Info = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-weight: ${theme.text.weight.bold};
`;

const Artist = styled.Text`
  font-size: ${theme.text.size.sm}px;
  color: ${theme.color.grey};
`;
