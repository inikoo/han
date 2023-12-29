import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import { registerRootComponent } from 'expo';

import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}

registerRootComponent(App);