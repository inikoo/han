import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {Icon} from 'react-native-paper';
import Request from '~/utils/request';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {COLORS, ROUTES} from '~/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import Action from '~/store/Action';

NfcManager.start();

function App(p) {
  const navigation = useNavigation();
  const [nfcState, setNfcState] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

 /*  const playSuccessSound = () => {
    const successSound = new Sound('https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/file-not-here.mp3', '', (error) => {
      if (error) {
        console.error('Error loading sound:', error);
      }
    });

    successSound.play((success) => {
      if (!success) {
        console.log('Error playing sound',success);
      }
    });
  }; */



  const sendToServer = async tag => {
    await Request(
      'post',
      'hr-clocking-machines-add',
      {},
      {nfc_tag: tag.id},
      [],
      onSuccess,
      onFailed,
    );
  };

  const checkuser = async res => {
    try {
      const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
      if (value) {
        let data = JSON.parse(value);
        dispatch(
          Action.CreateUserSessionProperties({
            ...data,
            clocking_status: res.data.status,
          }),
        );
      }
    } catch (error) {
      console.error('Error fetching credentials from AsyncStorage:', error);
    }
  };

  const onSuccess = (res) => {
    // Play the success sound
/*     playSuccessSound(); */

    checkuser(res);
    navigation.navigate('Home');
    showMessage({
      message: res.data.clocking_status == 'in' ? 'Welcome to office' : 'Good Bye, see you tomorrow',
      type: 'success',
    });
  };

  const onFailed = res => {
    console.log('error', res);
    if(res.response.data.message){
      showMessage({
        message: 'No working place detected',
        type: 'danger',
      });
    }else{
      showMessage({
        message: 'failed to get nfc Tag',
        type: 'danger',
      });
    }
    
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
          <Icon source={'nfc-search-variant'} size={200} />
        ) : (
          <>
            <Icon source={nfcState ? 'nfc-search-variant' : 'nfc'} size={200} />
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
    color: COLORS.black
  },
});

export default App;
