import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {COLORS, ROUTES} from '~/constants';
import Request from '~/utils/request';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Action from '~/store/Action';
import {showMessage} from 'react-native-flash-message';
import {UpdateCredential} from '~/utils/auth';
import Logo from '../../../asset/logo/Green_minimalist_lizard_logo6-removebg-preview.png';
import {useForm, Controller} from 'react-hook-form';
import {getBrand} from 'react-native-device-info';

const Login = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: object) => {
    await Request(
      'post',
      'login-form',
      {},
      {...data, device_name: getBrand()},
      [],
      onLoginSuccess,
      onLoginFailed,
    );
  };
  const onLoginSuccess = async (res: object) => {
    setToken(res.token);
    const profile = await UpdateCredential(res.token);
    if (profile.status == 'Success') {
      dispatch(
        Action.CreateUserSessionProperties({...profile.data, token: res.token}),
      );
      navigation.navigate(ROUTES.BOTTOMHOME);
    } else {
      showMessage({
        message: 'failed to get user data',
        type: 'danger',
      });
    }
  };

  const onLoginFailed = (res: object) => {
    if (res.response.data)
      showMessage({
        message: res.response.data.message,
        type: 'danger',
      });
    else {
      showMessage({
        message: 'failed to login',
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View style={styles.row}>
            <Image source={Logo} style={styles.logo} />
          </View>

          <Text style={styles.loginContinueTxt}>Login in to continue</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: COLORS.black,
                  },
                ]}
                placeholder="Email"
                placeholderTextColor={COLORS.black}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text>
              {errors.username.message != ''
                ? errors.username.message
                : 'Enter valid value'}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: COLORS.black,
                  },
                ]}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor={COLORS.black}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text>
              {errors.password.message != ''
                ? errors.password.message
                : 'Enter valid value'}
            </Text>
          )}
          <View style={styles.loginBtnWrapper}>
            <Pressable onPress={handleSubmit(onSubmit)} style={styles.loginBtn}>
              <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
                Login
              </Text>
            </Pressable>
          </View>

          <TouchableOpacity>
            <Text style={styles.goToScannerText}>
              <Text onPress={() => navigation.navigate('LoginScanner')}>
                Login use QR code
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: COLORS.primary,
  },
  goToScannerText: {
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    maxHeight: 200,
    width: 200,
    alignSelf: 'center',
  },
});
