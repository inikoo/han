import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Request from "../../utils/request";
import { showMessage, hideMessage } from "react-native-flash-message";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Request(
      "post",
      "login-scanner",
      {},
      { code: data, device_name: "android" },
      [],
      onLoginSuccess,
      onLoginFailed
    );
  };

  
  const onLoginSuccess = (res) => {
   console.log('succses',res)
  };

  const onLoginFailed = (res) => {
    console.log('failed',res)
    showMessage({
      message: res.data.message,
      type: "danger",
    });
  };

  const onReadProfile = (token) => {
    Request(
      "get",
      "profile",
      { Authorization: "Bearer " + token },
      {},
      [],
      (res) => onReadProfileSuccess(res, token),
      onReadProfileFailed
    );
  };

  const onReadProfileSuccess = (response, token) => {
    dispatch(Action.CreateUserSessionProperties({ ...response.data, token: token }));
    navigation.navigate(ROUTES.HOME)
  };

  const onReadProfileFailed = (err, token) => {
    console.log("profile", err);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
