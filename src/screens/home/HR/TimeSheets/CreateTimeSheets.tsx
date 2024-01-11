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
import {ROUTES} from '~/constants';
// Pre-step, call this before any NFC operations
NfcManager.start();

function App(p) {
  const navigation = useNavigation();
  const [nfcState, setNfcState] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.userReducer);
  console.log('props', p);

  const sendToServer = tag => {
    console.log('tag', tag);
    Request(
      'post',
      'hr-time-sheets',
      {},
      {name: data.contact_name, type: 'static-nfc', nfc_tag: tag.id},
      [p.route.params.id],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = res => {
    showMessage({
      message: 'welcome to office',
      type: 'success',
    });
    navigation.navigate(ROUTES.WORKINGPLACES + ' Edit', {id :p.route.params.id });
  };

  const onFailed = res => {
    console.log('error', res);
    showMessage({
      message: 'failed to get user data',
      type: 'danger',
    });
  };
  async function readNdef() {
    try {
      setLoading(true);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('Tag found', tag);
      sendToServer(tag);
    } catch (ex) {
      console.warn('Oops!', ex);
      // Handle error here (e.g., show an error message to the user)
    } finally {
      setLoading(false);
      NfcManager.cancelTechnologyRequest();
    }
  }

  console.log('sss', data);

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
              size={200}></Icon>
            <Text style={styles.scanText}>Scan a Tag</Text>
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
