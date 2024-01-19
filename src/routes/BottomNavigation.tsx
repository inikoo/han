import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { Home, NFC, Profile } from '~/screens'
import React from "react";
import { COLORS } from "~/constants";

const BottomMenu = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  const ScanButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          paddingTop: 12,
          borderRadius: 35,
          backgroundColor: COLORS.primary,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerStyle: {
          backgroundColor: COLORS.bgColor,
        },
        tabBarStyle: {
          bottom: 10,
          left: 0,
          height: 60,
          right: 0,
          borderRadius: 32,
          paddingBottom: 12,
          marginHorizontal : 10,
          marginTop : 20,
          paddingTop: 12,
          backgroundColor: COLORS.bgColor,
          ...style.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NFC"
        component={NFC}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={"#ffffff"}
              size={32}
            />
          ),
          tabBarLabel: "",
          headerShown: false,
          tabBarButton: (props) => (
            <ScanButton children={props.children} onPress={props.onPress} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: "left",
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-check"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomMenu;