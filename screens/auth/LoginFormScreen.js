import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS, ROUTES } from "../../constants";
import Request from "../../utils/request";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from "@react-navigation/native";
import { userReducer } from '../../store/Reducers'
import Action  from '../../store/Action'

const Login = (props) => {
  console.log('props',props)
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const dispatch = useDispatch()

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };


  const onSubmit = () => {
    Request(
      "post",
      "login-form",
      {},
      {username : email, password : password, device_name:'android'},
      [],
      onLoginSuccess,
      onLoginFailed,
    );
  }

  const onLoginSuccess=(res)=>{
    setToken(res.token)
    dispatch(Action.CreateUserSessionProperties(res))
    onReadProfile(res.token)
  }
  
  const onLoginFailed=(res)=>{
    console.log('err',res)
  }
const data = useSelector(state => state.userReducer)
  const onReadProfile=(token)=>{
    console.log('data',data)
	/* 	Request(
			"get",
			"profile",
			{ Authorization: "Bearer " + token },
			{},
			[],
			onReadProfileSuccess,
			onReadProfileFailed,
			token
		); */
	}

 const onReadProfileSuccess=(response)=>{
		console.log('profile',response)
	}

const	onReadProfileFailed=(err, token)=>{
    console.log('profile',err)
	}
  



  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View style={styles.row}>
            {/*  <Logo width={55} height={55} style={styles.mr7} /> */}
            <Text style={styles.brandName}>HAN</Text>
          </View>

          <Text style={styles.loginContinueTxt}>Login in to continue</Text>
          <TextInput style={styles.input} placeholder="Email" onChangeText={handleEmailChange}/>
          <TextInput style={styles.input} placeholder="Password" onChangeText={handlePasswordChange} />

          <View style={styles.loginBtnWrapper}>
            <Pressable
              onPress={onSubmit}
            /*   onPress={() => navigation.navigate(ROUTES.LOGIN_SCANNER)} */
              activeOpacity={0.7}
              style={styles.loginBtn}
            >
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Login
              </Text>
            </Pressable>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.LOGIN_SCANNER)}
            style={styles.forgotPassBtn}
          >
            <Text style={styles.forgotPassText}>Login use QR code</Text>
          </TouchableOpacity>
        </View>

        {/*     <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.signupBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    padding: 15,
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: "100%",
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    backgroundColor: COLORS.primary,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "400",
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
  },
  // footer
  footer: {
    position: "absolute",
    bottom: 20,
    textAlign: "center",
    flexDirection: "row",
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: "bold",
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  // utils
  wFull: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
