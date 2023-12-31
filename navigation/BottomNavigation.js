import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, ROUTES } from "../constants";
import { Home, Profile, Settings, HR } from "../screens";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import HRNavigator from "./HRNavigator";
import {
  faUserHardHat,
  faHome,
  faUser,
} from "../private/fa/pro-light-svg-icons";
import {
  faUserHardHat as solidfaUserHardHat,
  faHome as solidfaHome,
  faUser as solidFaUser,
} from "../private/fa/pro-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(
  faUserHardHat,
  solidfaUserHardHat,
  solidfaHome,
  faHome,
  solidFaUser,
  faUser
);

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = faHome;
          let iconColor = focused ? COLORS.primary : COLORS.dark;

          if (route.name === ROUTES.HOME_TAB) {
            iconName = !focused ? faHome : solidfaHome;
          } else if (route.name === ROUTES.HR) {
            iconName = !focused ? faUserHardHat : solidfaUserHardHat;
          } else if (route.name === ROUTES.PROFILE_TAB) {
            iconName = !focused ? faUser : solidFaUser;
          }

          return <FontAwesomeIcon icon={iconName} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME_TAB} component={Home} />
      <Tab.Screen name={ROUTES.HR} component={HRNavigator} />
      <Tab.Screen name={ROUTES.PROFILE_TAB} component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
