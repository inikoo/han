import React from 'react';
import {SafeAreaView, Image, View, TextInput} from 'react-native';
import {Text, Button, Avatar} from '@rneui/base';
import ConnectImage from '../../assets/image/20943993.jpg';
import styles from './style';
import {MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const [text, onChangeText] = React.useState();
  const navigation = useNavigation();

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

        <Button buttonStyle={{...styles.loginButton, marginTop: 10}}>
          <Text style={{color: '#ffff', fontWeight: 'bold'}}>Connect</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
