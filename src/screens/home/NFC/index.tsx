import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Icon } from 'react-native-paper';
import Request from '~/utils/request';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { ROUTES } from '~/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Action from '~/store/Action';
import Sound from 'react-native-sound';
import Voice from '../../../../asset/sound/ttsmaker-file-2024-1-19-13-30-31.mp3';

NfcManager.start();

function App(p) {
  const navigation = useNavigation();
  const [nfcState, setNfcState] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const sound = new Sound(Voice);

  const sendToServer = async (tag) => {
    await Request(
      'post',
      'hr-clocking-machines-add',
      {},
      { nfc_tag: 'tIw127x29NH9' },
      [],
      onSuccess,
      onFailed
    );
  };

  const checkuser = async (res) => {
    try {
      const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
      if (value) {
        let data = JSON.parse(value);
        dispatch(
          Action.CreateUserSessionProperties({
            ...data,
            clocking_status: res.data.status,
          })
        );
      }
    } catch (error) {
      console.error('Error fetching credentials from AsyncStorage:', error);
    }
  };

  const onSuccess = (res) => {
    checkuser(res);
    playSound();
    /* navigation.navigate('Home'); */
    showMessage({
      message: 'welcome to office',
      type: 'success',
    });
  };

  const onFailed = (res) => {
    console.log('error', res);
    showMessage({
      message: 'failed to get user data',
      type: 'danger',
    });
  };

  const playSound = () => {
    sound.play();
  };

  async function readNdef() {
    try {
      setLoading(true);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      await sendToServer(tag);
    } catch (ex) {
      console.warn('Error during NFC reading:', ex);
    } finally {
      setLoading(false);
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Icon
              source={nfcState ? 'nfc-search-variant' : 'nfc'}
              size={200}
            />
            <Text style={styles.scanText}>Click to start</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default App;
