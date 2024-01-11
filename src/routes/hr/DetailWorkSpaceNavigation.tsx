import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS} from '~/constants';
import {WorkingPlacesDetail, TimeSheets} from '~/screens';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigator({route, navigation}) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.dark,
        indicatorStyle: {backgroundColor: COLORS.primary},
      }}>
      <Tab.Screen name='WorkingPlacesDetail'  options={{ tabBarLabel: 'Detail' }} >
        {props => ( <WorkingPlacesDetail {...props} route={route} navigation={navigation} /> )}
      </Tab.Screen>
      <Tab.Screen name='TimeSheets'  options={{ tabBarLabel: 'Clocking Machines' }}>
        {props => ( <TimeSheets {...props} route={route} navigation={navigation} /> )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TopTabNavigator;
