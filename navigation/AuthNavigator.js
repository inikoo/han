import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, LoginScanner } from "../screens";
import { COLORS, ROUTES } from "../constants";
import DrawerNavigator from "./DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Action from "../store/Action";
import { UpdateCredential } from "../utils/auth";
import { isNull } from 'lodash'

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const value = await AsyncStorage.getItem("@AuthenticationToken:Key");
        if (!value) {
          setUserToken(null);
        } else {
          const data = JSON.parse(value);
          const newData = await UpdateCredential(data.token)
          if(newData.status == "Success" && data.token){
            dispatch(Action.CreateUserSessionProperties(data));
            setUserToken(data.token);
          }
        
        }
      } catch (error) {
        console.error("Error fetching credentials from AsyncStorage:", error);
        setUserToken(null);
      } finally {
        setIsLoading(false); // Set loading state to false after the check
      }
    };

    checkUserToken(); // Call the function to check user token
  }, []);

  // If still loading, you can show a loading indicator or return null
  if (isLoading) {
    return null; // Or return a loading indicator component
  }

  return (
    <Stack.Navigator initialRouteName={userToken && !isNull(userToken) ? ROUTES.HOME : ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.LOGIN_SCANNER}
        component={LoginScanner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.HOME}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
