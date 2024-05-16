import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Request from './request';


export async function WriteCredential(data: object) {
  try {
    await AsyncStorage.setItem(
      '@AuthenticationToken:Key',
      JSON.stringify(data),
    );
  } catch (err) {
    Alert.alert(err.message);
  }
}

export async function RemoveCredential() {
  try {
    await AsyncStorage.removeItem('@AuthenticationToken:Key');
  } catch (err) {
    Alert.alert(err.message);
  }
}

