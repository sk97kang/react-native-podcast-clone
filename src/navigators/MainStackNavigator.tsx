import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import PlayerScreen from '../screens/PlayerScreen';
import QueueScreen from '../screens/QueueScreen';
import PodcastDetailsScreen from '../screens/PodcastDetailsScreen';
import EpisodeDetailsScreen from '../screens/EpisodeDetailsScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator mode="modal" screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Tabs" component={MainTabNavigator} />
      <MainStack.Screen name="Player" component={PlayerScreen} />
      <MainStack.Screen name="Queue" component={QueueScreen} />
      <MainStack.Screen
        name="PodcastDetails"
        component={PodcastDetailsScreen}
        options={{headerShown: true, headerTitle: '', headerBackTitle: ''}}
      />
      <MainStack.Screen
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
        options={{headerShown: true, headerTitle: '', headerBackTitle: ''}}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
