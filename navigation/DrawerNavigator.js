import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constants';
import BottomTabNavigator from './BottomNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import SettingsNavigator from './SettingsNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
     {/*   <Drawer.Screen
        name={ROUTES.SETTINGS_DRAWER}
        component={SettingsNavigator}
        options={{
          title: 'Setting',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="settings" size={18} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
    
  );
}

export default DrawerNavigator;