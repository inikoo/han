import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, ROUTES} from '../constants';
import {Home, Profile} from '../screens';
import {useNavigation} from '@react-navigation/native';
import HRNavigator from './hr';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import React from 'react';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarActiveTintColor: COLORS.primary,
      })}>
      <Tab.Screen name={ROUTES.HOME_TAB} component={gestureHandlerRootHOC(Home)} />
      <Tab.Screen name={ROUTES.HR} component={gestureHandlerRootHOC(HRNavigator)} />
      <Tab.Screen name={ROUTES.PROFILE_TAB} component={gestureHandlerRootHOC(Profile)} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
