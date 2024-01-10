import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Action from '../../store/Action';
import { ROUTES } from '../../constants';
import { UpdateCredential } from  '../../utils/auth'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Request from '../../utils/request';

export default function LoginScanner() {
  const [scanned, setScanned] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBarCodeScanned = async ({ data }) => {
    if (!scanned) {
      setScanned(true);
      try {
         Request(
          'post',
          'login-scanner',
          {},
          { code: data, device_name: 'android' },
          [],
          onLoginSuccess,
          onLoginFailed
        );
      } catch (error) {
        showMessage({
          message: error.message || 'Failed to perform login',
          type: 'danger',
        });
      }
    }
  };

  const onLoginSuccess = async (res) => {
    console.log(UpdateCredential)
    setToken(res.token);
    const profile = await UpdateCredential(res.token);
    if (profile.status == "Success") {
      dispatch(
        Action.CreateUserSessionProperties({ ...profile.data, token: res.token })
      );
      navigation.navigate(ROUTES.HOME);
    } else {
      showMessage({
        message: "failed to get user data",
        type: "danger",
      });
    }
  };

  const onLoginFailed = (res) => {
    console.log('failed',res)
    showMessage({
      message: res.response.data.message,
      type: "danger",
    });
  };

  const onSuccess = (e) => {
    // This method will handle the success of QR code scanning
    console.log('Scanned data:', e.data);
    handleBarCodeScanned(e); // Call your logic here to handle the scanned data
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text>
            Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text>Scan Again</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
