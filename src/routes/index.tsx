import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Dashboard} from '~/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Action from '~/Store/Action';
import {UpdateCredential, RemoveCredential} from '~/Utils/auth';

const Stack = createNativeStackNavigator();

function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [userStorage, setUserStorage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);

  const checkUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@AuthenticationToken:Key');
      const organisation = await AsyncStorage.getItem('@organisation:Key');
      const warehouse = await AsyncStorage.getItem('@warehouse:Key');

      if (!storedUser) {
        setUserStorage(null);
      } else {
        const data = JSON.parse(storedUser);
        const profile = await UpdateCredential(data.token);

        if (profile.status === 'Success' && data.token) {
          if (!user.token) {
            dispatch(
              Action.CreateUserSessionProperties({...data, ...profile.data}),
            );
            if (organisation)
              dispatch(
                Action.CreateUserOrganisationProperties(
                  JSON.parse(organisation),
                ),
              );
            if (warehouse)
              dispatch(Action.CreateWarehouseProperties(JSON.parse(warehouse)));
          }
          setUserStorage(data);
        } else {
          setUserStorage(null);
          RemoveCredential();
          dispatch(Action.DestroyUserSessionProperties());
        }
      }
    } catch (error) {
      console.error('Error fetching credentials from AsyncStorage:', error);
      setUserStorage(null);
      RemoveCredential();
      dispatch(Action.DestroyUserSessionProperties());
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
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default Routes;
