import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Home, WorkingPlaces, TimeSheets, CreateTimeSheetTimeSheets } from '../../screens/home/HR';
import {ROUTES} from '../../constants';

const Stack = createStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }} initialRouteName={ROUTES.HR}>
      <Stack.Screen name="Human Resource" component={Home} />
      <Stack.Screen name={ROUTES.WORKINGPLACES} component={WorkingPlaces} />
      <Stack.Screen name={ROUTES.TIMESHEETS} component={TimeSheets} />
      <Stack.Screen name="Add Time Sheets" component={CreateTimeSheetTimeSheets} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;