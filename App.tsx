import * as React from 'react';
import {NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/Store';
import Routes from './src/routes';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {COLORS,MAINCOLORS} from './src/Utils/Colors';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/Components/Theme';

const MyTheme = {
  dark: true,
  colors: {
    primary: MAINCOLORS.primary,
    background: MAINCOLORS.background,
    card: MAINCOLORS.primary,
    text: MAINCOLORS.black,
    border: MAINCOLORS.black,
    notification: COLORS.grey6,
  },
};
 
export default function App() {  
  
  return (
    <Provider store={Store}>
      <AlertNotificationRoot>
        <ThemeProvider theme={theme}>
          <NavigationContainer theme={MyTheme}>
            <Routes />
          </NavigationContainer>
          </ThemeProvider> 
      </AlertNotificationRoot>
    </Provider>
  );
}
