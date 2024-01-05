import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faClock } from "../../private/fa/pro-light-svg-icons";
import { WorkingPlacesDetail, TimeSheets } from "../../screens";

const Tab = createMaterialTopTabNavigator();

function TopTabNavigator({ route, navigation }) {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color }) => {
      let icon;
      if (route.name === "WorkingPlacesDetail") {
        icon = <FontAwesomeIcon icon={faEdit} color={color} />;
      } else if (route.name === "TimeSheets") {
        icon = <FontAwesomeIcon icon={faClock} color={color} />;
      }
      return icon;
    },
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.dark,
        indicatorStyle: { backgroundColor: COLORS.primary },
      }}
      screenOptions={screenOptions}
    >
      <Tab.Screen name={"WorkingPlacesDetail"}>
        {(props) => (
          <WorkingPlacesDetail
            {...props}
            route={route}
            navigation={navigation}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name={"TimeSheets"}>
        {(props) => (
          <TimeSheets {...props} route={route} navigation={navigation} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TopTabNavigator;
