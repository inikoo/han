import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import { Text, Button, Avatar } from '@rneui/base';
import ConnectImage from '../../assets/image/20943993.jpg';
import styles from './style';
import { COLORS, MAINCOLORS } from '~/Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveCredential } from '~/Utils/auth';
import Action from '~/Store/Action';
import { Request } from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const ClockingMachinesScreen = () => {
  const navigation = useNavigation();
  const clockingMachine = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const logOut = async() => {
    await Request(
      'delete',
      'disconnect-clocking-machine',
      {},
      {},
      [],
      onSuccessLogout,
      onFailedLogout,
    );
  };

  const onSuccessLogout =(res)=>{
    RemoveCredential();
    dispatch(Action.DestroyUserSessionProperties());
  }

  const onFailedLogout =(res)=>{
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: res.response.data.message,
    });
  }

  return (
    <SafeAreaView style={styles.containerView}>
      <View style={styles.disconnectButtonContainer}>
        <Button
          buttonStyle={styles.disconnectButton}
          onPress={logOut}
          icon={{
            name: 'log-out',
            type: 'entypo',
            size: 30,
            color: 'white',
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={ConnectImage}
            style={styles.connectImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>You Are Already Connected</Text>

        <View style={styles.containerData}>
          <View>
            <Text style={{ ...styles.title, fontSize: 30, color: COLORS.grey3 }}>
              {clockingMachine.name}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Avatar
              size={32}
              icon={{ name: 'warehouse', type: 'font-awesome-5' }}
              containerStyle={{
                backgroundColor: MAINCOLORS.primary,
                borderRadius: 10,
              }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.label}>Working Place</Text>
              <Text style={styles.dataDesc}>
                {clockingMachine.workplace_slug}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Avatar
              size={32}
              icon={{ name: 'mobile1', type: 'antdesign' }}
              containerStyle={{
                backgroundColor: MAINCOLORS.primary,
                borderRadius: 10,
              }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.dataDesc}>{clockingMachine.type}</Text>
            </View>
          </View>
        </View>

        <Button
          buttonStyle={styles.loginButton}
          onPress={() => navigation.navigate('EnterPin')}
        >
          <Text style={{ color: '#ffff', fontWeight: 'bold' }}>Start Absent</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ClockingMachinesScreen;
