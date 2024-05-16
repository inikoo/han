import React from 'react';
import { SafeAreaView, Image, View, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/base';
import ConnectImage from '../../assets/image/20945391.jpg';
import styles from './style';
import {useNavigation} from '@react-navigation/native';


const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.containerView}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={ConnectImage} style={styles.image} resizeMode="cover" />
        </View>
        <Text style={styles.title}>Welcome to Aiku Clocking Machines</Text>
        <Text style={styles.description}>Connect this application to Aiku Clocking Machines.</Text>
        <Button buttonStyle={styles.loginButton}   onPress={() => navigation.navigate('setupClockingMachines')}>
          <Text style={{ color : '#ffff', fontWeight : 'bold' }}>Setup Clocking Machines</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
