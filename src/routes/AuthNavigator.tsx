import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, LoginScanner, FormProfile} from "~/screens";
import { ROUTES } from "~/constants";
import BottomNavigation from "./BottomNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Action from "~/store/Action";
import { UpdateCredential } from "~/utils/auth";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const checkUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@AuthenticationToken:Key");
      if (!value) {
        setUserToken(null);
      } else {
        const data = JSON.parse(value);
        const newData = await UpdateCredential(data.token)
        if (newData.status === "Success" && data.token) {
          dispatch(Action.CreateUserSessionProperties(data));
          setUserToken(data.token);
        }
      }
    } catch (error) {
      console.error("Error fetching credentials from AsyncStorage:", error);
      setUserToken(null);
    } finally {
      setIsLoading(false);
    }
  };

   useEffect(() => {
    const fetchData = async () => {
      await checkUserToken(); // Call the function to check user token
    };

    fetchData();
  }, []); 
  
  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={userToken ? ROUTES.HOME : ROUTES.LOGIN}>
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
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE + ' Edit'}
        component={FormProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
