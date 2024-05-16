import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome, SetupClockingMachines, Dashboard, SetupScanner, TakeImage, EnterPin } from '~/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Action from '~/Store/Action';
import { RemoveCredential} from '~/Utils/auth';
import {useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [userStorage, setUserStorage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);

  const checkUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@AuthenticationToken:Key');
      if (!storedUser) {
        setUserStorage(null);
      } else {
        const data = JSON.parse(storedUser);
        if(!user || Object.keys(user).length == 0)  dispatch(Action.CreateUserSessionProperties({...data }));
        setUserStorage(data);
      }
    } catch (error) {
      setUserStorage(null);
      RemoveCredential();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkUser();
    };
    fetchData();
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
    {!userStorage ? (
      <>
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="setupClockingMachines"
          component={SetupClockingMachines}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="setupScanner"
          component={SetupScanner}
          options={{
            headerShown: false,
          }}
        />
      </>
    ) : (
      <>
       <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="EnterPin"
        component={EnterPin}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="TakeImage"
        component={TakeImage}
        options={{
          headerShown: false,
        }}
      />
      </>
    )}
  </Stack.Navigator>
  
  );
}

export default Routes;
