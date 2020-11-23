import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/client';
import TrackPlayer, {Capability} from 'react-native-track-player';

import MainStackNavigator from './src/navigators/MainStackNavigator';
import {PlayerContextProvider} from './src/context/PlayerContext';
import {DBProvider} from './src/context/DBContext';

function App() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('player is setup');

        TrackPlayer.updateOptions({
          // Whether the player should stop running when the app is closed on Android
          stopWithApp: false,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.JumpForward,
            Capability.JumpBackward,
          ],
          jumpInterval: 30,
        });

        setIsReady(true);
      });
    })();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);
  return (
    <DBProvider>
      <ApolloProvider client={client}>
        {isReady ? (
          <PlayerContextProvider>
            <NavigationContainer>
              <MainStackNavigator />
            </NavigationContainer>
          </PlayerContextProvider>
        ) : (
          <ActivityIndicator />
        )}
      </ApolloProvider>
    </DBProvider>
  );
}

export default App;
