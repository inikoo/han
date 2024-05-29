import React from 'react';
import {SafeAreaView, Image, View, TextInput} from 'react-native';
import {Text, Button, Avatar} from '@rneui/base';
import ConnectImage from '../../assets/image/20943993.jpg';
import styles from './style';
import {MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import { Request } from '~/Utils';
import {useDispatch} from 'react-redux';
import Action from '~/Store/Action';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DeviceInfo from 'react-native-device-info';

const WelcomeScreen = () => {
  const [text, onChangeText] = React.useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let devices = {
   brand :  DeviceInfo.getBrand(),
   uuid : DeviceInfo.getDeviceId(),
  }

  const sendQr = async() =>{
    await Request(
      'post',
      'setup-cloking-machine',
      {},
      {qr_code : text, device_name : devices.brand, device_uuid : devices.uuid },
      [],
      onSuccess,
      onFailed,
    );
  }


  const onSuccess = (res) =>{
    dispatch(Action.CreateUserSessionProperties({...res.data, token : res.token }));
  }

  const onFailed = (res) =>{
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: res.response.data.message,
    });
  }

  return (
    <SafeAreaView style={styles.containerView}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={ConnectImage}
            style={styles.connectImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>Clocking Machines Code</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="XXXXXX"
          />
          <Avatar
            onPress={() => navigation.navigate('setupScanner')}
            size={40}
            icon={{name: 'qr-code-scanner', type: 'material'}}
            containerStyle={{
              backgroundColor: MAINCOLORS.primary,
              borderRadius: 10,
            }}
          />
        </View>

        <Button 
          icon={{
            name: 'cast-connected',
            type: 'material',
            size: 19,
            color: 'white',
          }}
        buttonStyle={{...styles.loginButton, marginTop: 10}} onPress={()=>sendQr()}>
          <Text style={{color: '#ffff', fontWeight: 'bold', fontSize : 20}}>Connect</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
