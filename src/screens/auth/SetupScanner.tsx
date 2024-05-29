import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { MAINCOLORS } from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import { Request } from '~/Utils';
import Action from '~/Store/Action';
import DeviceInfo from 'react-native-device-info';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export default function LoginScanner() {
  const [scanned, setScanned] = useState(true);
  const dispatch = useDispatch();

  let devices = {
    brand :  DeviceInfo.getBrand(),
    uuid : DeviceInfo.getDeviceId(),
   }

  const sendQr = async(data) =>{
    await Request(
      'post',
      'setup-cloking-machine',
      {},
      {qr_code : data, device_name : devices.brand, device_uuid : devices.uuid },
      [],
      onSuccessConnect,
      onFailedConnect,
    );
  }


  const onSuccessConnect = (res) =>{
    dispatch(Action.CreateUserSessionProperties({...res.data, token : res.token }));
  }

  const onFailedConnect = (res) =>{
    console.log(res)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: res.response.data.message,
    });
  }

  const onSuccess = e => {
    sendQr(e.data)
  };

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.qrCodeScanner}>   
          <QRCodeScanner
            onRead={onSuccess}
            showMarker={true}
            markerStyle={{
                borderColor : MAINCOLORS.primary
            }}
            bottomContent={
              <View style={styles.topContentContainer}>
                <View style={styles.row}>
                  <Text style={styles.loginDescription}>
                    You can find the barcode from aiku.com
                  </Text>
                </View>
              </View>
            }
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setScanned(true)}>
          <Text style={styles.tryAgainText}>Scan Once More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeScanner: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tryAgainText: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    maxHeight: 100,
    width: 100,
    marginRight: 10, // Add margin for separation
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  topContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginDescription: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
