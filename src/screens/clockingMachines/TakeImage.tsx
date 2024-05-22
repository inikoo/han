import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {MAINCOLORS} from '~/Utils/Colors';
import { Request } from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';


const ExampleApp = (navigation) => {
  const cameraRef = useRef(null);
  const [countdount, onChangeCountdount] = React.useState(true);
  const user = useSelector(state => state.userReducer);
  const navigate = useNavigation();


  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const  setBase64 = 'data:image/jpeg;base64,' + data.base64
  /*     navigate.navigate('Employee') */
      SendPin(setBase64)
    }
  };

  
  const SendPin = async(data) =>{
    await Request(
      'post',
      'clocking-machine-picture',
      {},
      {photo : data},
      [user.id,navigation.route.params.employee.id],
      onSuccess,
      onFailed,
    );
  }

  const onSuccess = (e) =>{
    console.log(e)
     navigate.navigate('Employee',{data : e.data})
  }


  const onFailed = (e)=>{
    console.log(e)
  }

  const onCountDownComplete =() =>{
    onChangeCountdount(false)
    takePicture()
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
      />
      {countdount && (
        <View style={styles.timerContainer}>
          <CountdownCircleTimer
            isPlaying
            duration={3}
            onComplete={onCountDownComplete}
            colors={MAINCOLORS.primary}
            colorsTime={[1, 2, 3]}>
            {({remainingTime}) => (
              <Text style={styles.timerText}>{remainingTime}</Text>
            )}
          </CountdownCircleTimer>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timerContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  captureText: {
    fontSize: 14,
    color: 'black',
  },
});

export default ExampleApp;
