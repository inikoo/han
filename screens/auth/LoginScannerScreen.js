import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Request from "../../utils/request";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Action from "../../store/Action";
import { ROUTES } from "../../constants";
import { UpdateCredential } from "../../utils/auth";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  
  const onLoginSuccess = async (res) => {
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
