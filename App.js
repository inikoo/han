import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { Provider } from "react-redux";
import { Store } from "./store";
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  )
}

registerRootComponent(App);