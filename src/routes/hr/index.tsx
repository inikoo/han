import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeHr, WorkingPlaces, FormWorkingPlaces, TimeSheets, CreateTimeSheet   } from '../../screens'
import { ROUTES } from "../../constants";
import DetailWorkSpaceNavigation from './DetailWorkSpaceNavigation'

const Stack = createStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName={ROUTES.HR}
    >
      <Stack.Screen name="Human Resource" component={HomeHr} />
      {/*WorkingPlaces */}
      <Stack.Screen name={ROUTES.WORKINGPLACES} component={WorkingPlaces} />
      <Stack.Screen name={ROUTES.WORKINGPLACES + ' Add'} component={FormWorkingPlaces} />
      <Stack.Screen name={ROUTES.WORKINGPLACES + ' Edit'} component={DetailWorkSpaceNavigation} />

      {/*TIMESHEETS */}
      <Stack.Screen name={ROUTES.TIMESHEETS} component={TimeSheets} />
      <Stack.Screen name={ROUTES.TIMESHEETS + ' Add'} component={CreateTimeSheet}/>
    </Stack.Navigator>
  );
}

export default SettingsNavigator;