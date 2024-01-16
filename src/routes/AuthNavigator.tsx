import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Login,
  LoginScanner,
  FormProfile,
  Home,
  Profile,
  HomeHr,
  WorkingPlaces,
  WokingPlacesClockingMachines,
  FormWorkingPlaces,
  WorkingPlacesDetail,
  WokingPlacesCreateClockingMachine,
  CreateClockingMachines,
  ClockingMachines
} from '~/screens';
import {ROUTES} from '~/constants';
import BottomNavigation from './BottomNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import Action from '~/store/Action';
import {UpdateCredential} from '~/utils/auth';
import {Icon} from 'react-native-paper';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [finalRoutes, setFinalRoutes] = useState([]);
  const dispatch = useDispatch();

  const checkuser = async () => {
    try {
      const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
      if (!value) {
        setUserToken(null);
      } else {
        const data = JSON.parse(value);
        const newData = await UpdateCredential(data.token);
        if (newData.status === 'Success' && data.token) {
          dispatch(Action.CreateUserSessionProperties(data));
          setUserToken(data);
        }
      }
    } catch (error) {
      console.error('Error fetching credentials from AsyncStorage:', error);
      setUserToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const routes = [
    {
      name: ROUTES.LOGIN,
      component: Login,
      option: {headerShown: false},
    },
    {
      name: ROUTES.LOGIN_SCANNER,
      component: LoginScanner,
      option: {headerShown: false},
    },
    //user
    {
      name: ROUTES.HOME,
      component: Home,
      option: {headerShown: false},
    },
    {
      name: ROUTES.PROFILE,
      component: Profile,
      option: {headerShown: false},
    },
    {
      name: ROUTES.PROFILE + 'edit',
      component: FormProfile,
      option: {headerShown: false},
    },
    //hr
    {
      name: ROUTES.HR,
      component: HomeHr,
      option: {headerShown: false},
      permissions: ['hr', 'hr.view'],
    },
    //working places
    {
      name: ROUTES.WORKING_PLACES,
      component: WorkingPlaces,
      option: {headerShown: true},
      permissions: ['hr', 'hr.view'],
    },
    {
      name: ROUTES.WORKING_PLACES + 'detail',
      component: WorkingPlacesDetail,
      option: {headerShown: true},
      permissions: ['hr', 'hr.view'],
    },
    {
      name: ROUTES.WORKING_PLACES + 'add',
      component: FormWorkingPlaces,
      option: {headerShown: true},
      permissions: ['hr', 'hr.edit'],
    },
    {
      name: ROUTES.WORKING_PLACES + 'edit',
      component: FormWorkingPlaces,
      option: {headerShown: true},
      permissions: ['hr', 'hr.edit'],
    },
    //WORKING_PLACES_CLOCKING_MACHINE
    {
      name: ROUTES.WORKING_PLACES_CLOCKING_MACHINE,
      component: WokingPlacesClockingMachines,
      option: {headerShown: true},
      permissions: ['hr', 'hr.view'],
    },
    {
      name: ROUTES.WORKING_PLACES_CLOCKING_MACHINE + 'add',
      component: WokingPlacesCreateClockingMachine,
      option: {headerShown: true},
      permissions: ['hr', 'hr.edit'],
    },
    //CLOCKING_MACHINE
    {
      name: ROUTES.CLOCKING_MACHINE,
      component: ClockingMachines,
      option: {headerShown: true},
      permissions: ['hr', 'hr.view'],
    },
    {
      name: ROUTES.CLOCKING_MACHINE + 'add',
      component: CreateClockingMachines,
      option: {headerShown: true},
      permissions: ['hr', 'hr.edit'],
    },
  ];

  const BottomNavigatorRoutes = [
    {
      name: ROUTES.BOTTOMHOME,
      option: {headerShown: false},
      components: [
        {
          name: ROUTES.HOME,
          component: Home,
          option: {
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Icon source="home" color={color} size={26} />
            ),
          },
        },
        {
          name: ROUTES.HR,
          component: HomeHr,
          permissions: ['hr', 'hr.view'],
          option: {
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Icon source="human-male-board-poll" color={color} size={26} />
            ),
          },
        },
        {
          name: ROUTES.PROFILE,
          component: Profile,
          option: {
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Icon source="account" color={color} size={26} />
            ),
          },
        },
      ],
    },
    {
      name: ROUTES.WORKING_PLACES + ' Detail',
      option: {headerShown: false},
      components: [
        {
          name: ROUTES.WORKING_PLACES + 'detail',
          permissions: ['hr', 'hr.view'],
          component: WorkingPlacesDetail,
          option: {
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Icon source="google-maps" color={color} size={26} />
            ),
          },
        },
        {
          name: ROUTES.HR,
          component: WokingPlacesClockingMachines,
          permissions: ['hr', 'hr.view'],
          option: {
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Icon source="timer" color={color} size={26} />
            ),
          },
        },
      ],
    },
  ];

  const checkPermissions = async (routes: Array) => {
    const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
    const final = [];
    if (value) {
      const user = JSON.parse(value);
      for (const route of routes) {
        if (route.permissions) {
          if (route.permissions.some(item => user.permissions.includes(item)))
            final.push(route);
        } else final.push(route);
      }
    } else final = routes;
    setFinalRoutes(final);
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkuser();
      checkPermissions(routes);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={userToken ? ROUTES.BOTTOMHOME : ROUTES.LOGIN}>
      {finalRoutes.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{...item.option}}
        />
      ))}
      {BottomNavigatorRoutes.map((item, index) => (
        <Stack.Screen key={index} name={item.name} options={item.option}>
          {props => <BottomNavigation {...props} extraData={{...item}} />}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
