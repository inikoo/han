import React from 'react';
import {SafeAreaView, Image, View, TextInput} from 'react-native';
import {Text, Button, Avatar} from '@rneui/base';
import ConnectImage from '../../assets/image/20943993.jpg';
import styles from './style';
import {MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import { Request } from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const WelcomeScreen = () => {
  const [text, onChangeText] = React.useState();
  const navigation = useNavigation();

  const SendPin = async() =>{
    await Request(
      'post',
      'cloking-pin',
      {},
      {pin : text},
      [],
      onSuccess,
      onFailed,
    );
  }

  const onSuccess = (e) =>{
    navigation.navigate('TakeImage')
  }

  const onFailed = (e) =>{
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: e.response.data.message,
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
        <Text style={styles.title}>Enter Your Pin</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="XXXXXX"
          />
        </View>

        <Button buttonStyle={{...styles.loginButton, marginTop: 10}} onPress={()=>SendPin()}>
          <Text style={{color: '#ffff', fontWeight: 'bold'}}>Submit</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
