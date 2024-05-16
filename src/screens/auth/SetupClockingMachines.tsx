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

const WelcomeScreen = () => {
  const [text, onChangeText] = React.useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const sendQr = async() =>{
    await Request(
      'get',
      'setup-cloking-machine',
      {},
      {},
      [text],
      onSuccess,
      onFailed,
    );
  }


  const onSuccess = (res) =>{
    dispatch(Action.CreateUserSessionProperties({...res.data }));
  }

  const onFailed = (res) =>{
    console.log(res)
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

        <Button buttonStyle={{...styles.loginButton, marginTop: 10}} onPress={()=>sendQr()}>
          <Text style={{color: '#ffff', fontWeight: 'bold'}}>Connect</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
