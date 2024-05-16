import React from 'react';
import {SafeAreaView, Image, View, TextInput} from 'react-native';
import {Text, Button, Avatar} from '@rneui/base';
import ConnectImage from '../../assets/image/20943993.jpg';
import styles from './style';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RemoveCredential} from '~/Utils/auth';
import Action from '~/Store/Action';

const ClockingMachinesScreen = () => {
  const navigation = useNavigation();
  const clockingMachine = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const logOut = () => {
    RemoveCredential();
    dispatch(Action.DestroyUserSessionProperties());
  };

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
        <Text style={styles.title}>You Are Already Connected</Text>

        <View style={styles.containerData}>
          <View style={styles.inputContainer}>
            <Avatar
              size={32}
              icon={{name: 'pencil', type: 'font-awesome'}}
              containerStyle={{
                backgroundColor: MAINCOLORS.primary,
                borderRadius: 10,
              }}
            />
            <View style={{marginLeft: 15}}>
              <Text style={styles.label}>Working Place</Text>
              <Text style={styles.dataDesc}>
                {clockingMachine.workplace_slug}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Avatar
              size={32}
              icon={{name: 'pencil', type: 'font-awesome'}}
              containerStyle={{
                backgroundColor: MAINCOLORS.primary,
                borderRadius: 10,
              }}
            />
            <View style={{marginLeft: 15}}>
              <Text style={styles.label}>slug</Text>
              <Text style={styles.dataDesc}>{clockingMachine.slug}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Avatar
              size={32}
              icon={{name: 'pencil', type: 'font-awesome'}}
              containerStyle={{
                backgroundColor: MAINCOLORS.primary,
                borderRadius: 10,
              }}
            />
            <View style={{marginLeft: 15}}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.dataDesc}>{clockingMachine.type}</Text>
            </View>
          </View>
        </View>

        <Button
          buttonStyle={styles.loginButton}
          onPress={() => navigation.navigate('EnterPin')}>
          <Text style={{color: '#ffff', fontWeight: 'bold'}}>Start Absent</Text>
        </Button>
        <Button
          buttonStyle={{backgroundColor: MAINCOLORS.danger, borderRadius: 10}}
          onPress={() => logOut()}>
          <Text style={{color: '#ffff', fontWeight: 'bold'}}>Disconnect</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ClockingMachinesScreen;
